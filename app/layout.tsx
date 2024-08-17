"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import logo from "@/public/logo.png";
import Image from "next/image";
import PlayerStateProvider from "./_contexts/PlayerContext";
import SignalRStateProvider from "./_contexts/SignalRContext";
import GameStateProvider from "./_contexts/GameContext";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentDate = new Date();

  return (
    <html lang="es-SV">
      <body className={inter.className}>
        <header>
          <Image src={logo} height={200} width={200} alt="" />
          <h1>Tic-Tac-Toe SignalR</h1>
          <p>
            Es un juego que utiliza Next.js, SignalR y ASP.NET Core para
            conectar jugadores en tiempo real.
          </p>
        </header>
        <SignalRStateProvider>
          <GameStateProvider>
            <PlayerStateProvider>{children}</PlayerStateProvider>
          </GameStateProvider>
        </SignalRStateProvider>
        <footer>Tic-Tac-Toe SignalR &copy;{currentDate.getFullYear()}</footer>
      </body>
    </html>
  );
}
