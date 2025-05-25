"use client";
import HeaderLinks from "@/components/ui/HeaderLinks";
import { Stars, Text3D } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { type Mesh, type ShaderMaterial, Vector3 } from "three";

const rainbowShader = {
	uniforms: {
		time: { value: 0 },
		baseColor: { value: new THREE.Color(0x555555) },
	},
	vertexShader: `
		varying vec3 vPosition;
		varying vec3 vNormal;
		varying vec2 vUv;

		void main() {
			vPosition = position;
			vNormal = normalize(normalMatrix * normal);
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
		}
	`,
	fragmentShader: `
		uniform float time;
		uniform vec3 baseColor;
		varying vec3 vPosition;
		varying vec3 vNormal;
		varying vec2 vUv;

		vec3 rainbow(float t) {
			vec3 c = 0.5 + 0.5 * cos(6.28318 * (t * vec3(1.0, 0.8, 0.6) + vec3(0.0, 0.2, 0.4)));
			return c;
		}

		void main() {
			float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 3.0);
			float rainbowT = vPosition.x * 0.1 + vPosition.y * 0.1 + time * 0.2;
			vec3 rainbowColor = rainbow(rainbowT);

			vec3 finalColor = mix(baseColor, rainbowColor, fresnel);
			float edgeGlow = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
			finalColor += rainbow(rainbowT + 0.5) * edgeGlow * 0.5;

			gl_FragColor = vec4(finalColor, 1.0);
		}
	`,
};

const PortfolioText = () => {
	const textRef = useRef<Mesh>(null);
	const shaderRef = useRef<ShaderMaterial>(null);
	const initialY = useRef(0);
	const { viewport } = useThree();

	useEffect(() => {
		if (textRef.current) {
			// Calculate the center offset of the text
			const textGeometry = textRef.current.geometry;
			textGeometry.computeBoundingBox();
			const boundingBox = textGeometry.boundingBox;
			if (boundingBox) {
				const center = new THREE.Vector3();
				boundingBox.getCenter(center);
				textRef.current.position.x = -center.x;
				textRef.current.position.y = -center.y;
				initialY.current = textRef.current.position.y;
			}
		}
	}, []);

	useFrame(({ clock }) => {
		const time = clock.getElapsedTime();

		if (textRef.current) {
			const currentX = textRef.current.position.x;
			textRef.current.position.y =
				initialY.current + Math.sin(time * 0.5) * 0.5;
			textRef.current.rotation.x = Math.sin(time * 0.3) * 0.05;
			textRef.current.rotation.y = Math.sin(time * 0.4) * 0.15;
			textRef.current.rotation.z = Math.sin(time * 0.2) * 0.05;
			textRef.current.position.x = currentX;
		}

		if (shaderRef.current) {
			shaderRef.current.uniforms.time.value = time;
		}
	});

	// Responsive text size calculation
	const textSize = Math.min(viewport.width * 0.15, 10);

	return (
		<Text3D
			ref={textRef}
			font="/fonts/helvetiker_regular.typeface.json"
			size={textSize}
			height={textSize * 0.08}
			curveSegments={32}
			bevelEnabled
			bevelThickness={textSize * 0.03}
			bevelSize={textSize * 0.004}
			bevelOffset={0}
			bevelSegments={10}
		>
			Portfolio
			<shaderMaterial
				ref={shaderRef}
				{...rainbowShader}
				transparent
				side={THREE.DoubleSide}
			/>
		</Text3D>
	);
};

const CameraController = () => {
	const { camera, mouse } = useThree();
	const targetPosition = useRef(new Vector3(0, 0, 40));
	const targetZoom = useRef(1000);
	const isLeftClickRef = useRef(false);
	const isRightClickRef = useRef(false);
	const touchStartRef = useRef<{
		x: number;
		y: number;
		distance?: number;
	} | null>(null);
	const sphericalTarget = useRef(new THREE.Spherical(200, Math.PI / 2, 0));
	const sphericalCurrent = useRef(new THREE.Spherical(200, Math.PI / 2, 0));
	const isInitialAnimation = useRef(true);
	const initialAnimationStartTime = useRef(0);

	useFrame(({ clock }) => {
		if (isInitialAnimation.current) {
			if (initialAnimationStartTime.current === 0) {
				initialAnimationStartTime.current = clock.getElapsedTime();
			}

			const animationTime =
				clock.getElapsedTime() - initialAnimationStartTime.current;
			const animationDuration = 1;

			if (animationTime < animationDuration) {
				const progress = animationTime / animationDuration;
				const easeProgress = 1 - (1 - progress) ** 3;

				targetZoom.current = 200 - 160 * easeProgress;
				sphericalTarget.current.theta = progress * Math.PI * 2;
			} else {
				isInitialAnimation.current = false;
				targetZoom.current = 40;
			}
		}

		if (!isInitialAnimation.current) {
			if (isLeftClickRef.current) {
				targetZoom.current = Math.max(20, targetZoom.current - 2);
			}
			if (isRightClickRef.current) {
				targetZoom.current = Math.min(500, targetZoom.current + 2);
			}

			sphericalTarget.current.phi = Math.PI / 2 + mouse.y * 0.5;
			sphericalTarget.current.theta += mouse.x * 0.01;
		}

		sphericalTarget.current.radius = targetZoom.current;

		sphericalCurrent.current.radius = THREE.MathUtils.lerp(
			sphericalCurrent.current.radius,
			sphericalTarget.current.radius,
			isInitialAnimation.current ? 0.05 : 0.02,
		);
		sphericalCurrent.current.phi = THREE.MathUtils.lerp(
			sphericalCurrent.current.phi,
			sphericalTarget.current.phi,
			0.02,
		);
		sphericalCurrent.current.theta = THREE.MathUtils.lerp(
			sphericalCurrent.current.theta,
			sphericalTarget.current.theta,
			0.02,
		);

		const newPosition = new THREE.Vector3().setFromSpherical(
			sphericalCurrent.current,
		);
		camera.position.copy(newPosition);
		camera.lookAt(0, 0, 0);
	});

	useEffect(() => {
		const handleMouseDown = (event: MouseEvent) => {
			if (!isInitialAnimation.current) {
				if (event.button === 0) {
					isLeftClickRef.current = true;
				} else if (event.button === 2) {
					isRightClickRef.current = true;
				}
			}
		};

		const handleMouseUp = (event: MouseEvent) => {
			if (event.button === 0) {
				isLeftClickRef.current = false;
			} else if (event.button === 2) {
				isRightClickRef.current = false;
			}
		};

		const handleTouchStart = (event: TouchEvent) => {
			if (!isInitialAnimation.current) {
				if (event.touches.length === 1) {
					const touch = event.touches[0];
					touchStartRef.current = {
						x: touch.clientX,
						y: touch.clientY,
					};
				} else if (event.touches.length === 2) {
					const dx = event.touches[0].clientX - event.touches[1].clientX;
					const dy = event.touches[0].clientY - event.touches[1].clientY;
					touchStartRef.current = {
						x: (event.touches[0].clientX + event.touches[1].clientX) / 2,
						y: (event.touches[0].clientY + event.touches[1].clientY) / 2,
						distance: Math.sqrt(dx * dx + dy * dy),
					};
				}
			}
		};

		const handleTouchMove = (event: TouchEvent) => {
			if (!isInitialAnimation.current && touchStartRef.current) {
				event.preventDefault();

				if (event.touches.length === 1 && touchStartRef.current) {
					const touch = event.touches[0];
					const deltaX = (touch.clientX - touchStartRef.current.x) * 0.01;
					const deltaY = (touch.clientY - touchStartRef.current.y) * 0.01;

					sphericalTarget.current.theta -= deltaX;
					sphericalTarget.current.phi = Math.max(
						0.1,
						Math.min(Math.PI - 0.1, sphericalTarget.current.phi + deltaY),
					);

					touchStartRef.current = {
						x: touch.clientX,
						y: touch.clientY,
					};
				} else if (
					event.touches.length === 2 &&
					touchStartRef.current.distance !== undefined
				) {
					const dx = event.touches[0].clientX - event.touches[1].clientX;
					const dy = event.touches[0].clientY - event.touches[1].clientY;
					const distance = Math.sqrt(dx * dx + dy * dy);
					const deltaDistance = distance - touchStartRef.current.distance;

					targetZoom.current = Math.max(
						20,
						Math.min(500, targetZoom.current - deltaDistance * 0.1),
					);

					touchStartRef.current = {
						x: (event.touches[0].clientX + event.touches[1].clientX) / 2,
						y: (event.touches[0].clientY + event.touches[1].clientY) / 2,
						distance,
					};
				}
			}
		};

		const handleTouchEnd = () => {
			touchStartRef.current = null;
		};

		window.addEventListener("mousedown", handleMouseDown);
		window.addEventListener("mouseup", handleMouseUp);
		window.addEventListener("touchstart", handleTouchStart);
		window.addEventListener("touchmove", handleTouchMove, { passive: false });
		window.addEventListener("touchend", handleTouchEnd);

		return () => {
			window.removeEventListener("mousedown", handleMouseDown);
			window.removeEventListener("mouseup", handleMouseUp);
			window.removeEventListener("touchstart", handleTouchStart);
			window.removeEventListener("touchmove", handleTouchMove);
			window.removeEventListener("touchend", handleTouchEnd);
		};
	}, []);

	return null;
};

const Scene = () => {
	return (
		<>
			<Stars
				radius={1}
				depth={100}
				count={100000}
				factor={6}
				saturation={0}
				fade
				speed={1}
			/>
			<ambientLight intensity={0.15} />
			<spotLight
				position={[0, 0, 0]}
				angle={0.3}
				penumbra={1}
				intensity={5}
				color="#ffffff"
				distance={1}
			/>
			<pointLight position={[5, 5, 5]} intensity={2} color="#ff3366" />
			<pointLight position={[-5, -2, 3]} intensity={2} color="#33ffff" />
			<pointLight position={[0, 0, -5]} intensity={1.5} color="#ffff33" />
			<pointLight position={[0, 5, 10]} intensity={2} color="#ffffff" />
			<PortfolioText />
			<CameraController />
		</>
	);
};

const Home = () => {
	return (
		<div
			style={{
				width: "100vw",
				height: "100vh",
				backgroundColor: "#000",
			}}
			onContextMenu={(e) => e.preventDefault()}
		>
			<HeaderLinks />
			<Canvas camera={{ position: [0, 0, 40], far: 2000 }}>
				<Scene />
			</Canvas>
		</div>
	);
};

export default Home;
