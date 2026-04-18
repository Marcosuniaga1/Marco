"use client";

import { Player } from "@remotion/player";
import { EmotionGraphicVideo } from "../components/EmotionGraphicVideo";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#08080F",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        padding: 32,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          color: "#FFD700",
          fontFamily: '"Arial Black", Impact, sans-serif',
          fontSize: 24,
          letterSpacing: 4,
          margin: 0,
          textAlign: "center",
        }}
      >
        EMOTION GRAPHIC VIDEO
      </h1>

      <Player
        component={EmotionGraphicVideo}
        durationInFrames={900}
        fps={30}
        compositionWidth={1080}
        compositionHeight={1920}
        style={{
          width: 360,
          height: 640,
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 0 60px #9B59FF66",
        }}
        controls
        loop
      />

      <p style={{ color: "#555", fontSize: 13, margin: 0 }}>
        1080×1920 · 30 fps · 30 segundos
      </p>
    </div>
  );
}
