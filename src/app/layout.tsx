import { Inter, Montserrat, Noto_Sans_JP, Playfair_Display, Poppins, Roboto_Mono } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const RootLayout = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <html lang="ja" className={`${montserrat.variable} ${playfair.variable} ${notoSansJP.variable} ${inter.variable} ${robotoMono.variable} ${poppins.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
