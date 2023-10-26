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
        const newLayer = {
          ...DEFAULT_VIDEO_LAYER,
          id: uuid,
          type,
        };

        setVideoState((prevState) => {
          if (prevState) {
            return {
              ...prevState,
              layers: [...prevState.layers, newLayer],
            };
          }
          return prevState;
        });
      }
    },
    [videoState, setVideoState]
  );
  return { addLayer };
}
