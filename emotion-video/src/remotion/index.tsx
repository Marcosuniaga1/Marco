import { Composition, registerRoot } from "remotion";
import { EmotionGraphicVideo } from "../components/EmotionGraphicVideo";
import React from "react";

const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="EmotionGraphicVideo"
      component={EmotionGraphicVideo}
      durationInFrames={900}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};

registerRoot(RemotionRoot);
