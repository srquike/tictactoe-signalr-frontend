import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import logo from "@/public/logo.png";
import Image from "next/image";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tic-Tac-Toe SignalR",
  description: "Tic-Tac-Toe SignalR un juego en tiempo real.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-SV">
      <body className={inter.className}>
        <header>
          <Image src={logo} height={200} width={200} alt="" />
          <h1>Tic-Tac-Toe SignalR</h1>
          <p>Es un juego que utiliza React + Next.js, SignalR y ASP.NET Core para conectar jugadores en tiempo real.</p>
        </header>
        {children}
        <footer>Tic-Tac-Toe SignalR &copy; 2023</footer>
      </body>
    </html>
  );
}
