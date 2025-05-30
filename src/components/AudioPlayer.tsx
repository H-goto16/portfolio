import { useEffect, useRef, useState } from "react";

const AUDIO_PATH = "/audio/Rameses B - There For You [NCS Release].mp3";
const MUSIC_CREDIT = {
	artist: "Rameses B",
	title: "There For You",
	link: "https://ncs.io/ThereForYou",
};

const AudioPlayer = () => {
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [isPlaying, setIsPlaying] = useState(true);

	useEffect(() => {
		audioRef.current = new Audio(AUDIO_PATH);
		audioRef.current.loop = true;
		audioRef.current.volume = 0.5;

		const playAudio = async () => {
			try {
				if (audioRef.current) {
					await audioRef.current.play();
				}
			} catch (error) {
				console.log(
					"Auto-play was prevented. Please interact with the page first.",
				);
				setIsPlaying(false);
			}
		};

		playAudio();

		return () => {
			if (audioRef.current) {
				audioRef.current.pause();
				audioRef.current = null;
			}
		};
	}, []);

	const togglePlay = async () => {
		if (!audioRef.current) return;

		try {
			if (isPlaying) {
				audioRef.current.pause();
			} else {
				await audioRef.current.play();
			}
			setIsPlaying(!isPlaying);
		} catch (error) {
			console.log("Playback was prevented. Please try again.");
		}
	};

	return (
		<div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
			<a
				href={MUSIC_CREDIT.link}
				target="_blank"
				rel="noopener noreferrer"
				className="text-xs text-white/70 hover:text-white transition-colors"
			>
				Music: {MUSIC_CREDIT.title} by {MUSIC_CREDIT.artist} [NCS Release]
			</a>
			<button
				type="button"
				onClick={togglePlay}
				className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors text-white"
				aria-label={isPlaying ? "Mute" : "Unmute"}
			>
				{isPlaying ? "Sound: ON" : "Sound: OFF"}
			</button>
		</div>
	);
};

export default AudioPlayer;
