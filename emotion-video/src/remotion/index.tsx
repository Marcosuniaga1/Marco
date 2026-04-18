import { Composition, registerRoot } from "remotion";
import { EmotionGraphicVideo } from "../components/EmotionGraphicVideo";
import { AffiliateVideo } from "../components/AffiliateVideo";
import React from "react";

const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="EmotionGraphicVideo"
        component={EmotionGraphicVideo}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="AffiliateVideo"
        component={AffiliateVideo}
        durationInFrames={1350}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};

registerRoot(RemotionRoot);
