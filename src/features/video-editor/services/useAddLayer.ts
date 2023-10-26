import { useCallback } from "react";
import { useVideoEditorContext } from "../context";
import { VideoLayerType } from "../types";
import { v4 as uuidv4 } from "uuid";
import { DEFAULT_VIDEO_LAYER } from "../constants";

export function useAddLayer() {
  const { videoState, setVideoState } = useVideoEditorContext();
  const addLayer = useCallback(
    (type: VideoLayerType) => {
      if (videoState) {
        const uuid = uuidv4();
        const { currentFrame, frames } = videoState.settings;
        const newLayer = {
          ...DEFAULT_VIDEO_LAYER,
          id: uuid,
          type,
          start: currentFrame,
          end: frames,
        };

        const newVideoState = {
          ...videoState,
          layers: [...videoState.layers, newLayer],
        };

        setVideoState(newVideoState);

        localStorage.setItem(
          `video-${videoState.settings.id}`,
          JSON.stringify(newVideoState)
        );
      }
    },
    [videoState, setVideoState]
  );
  return { addLayer };
}
