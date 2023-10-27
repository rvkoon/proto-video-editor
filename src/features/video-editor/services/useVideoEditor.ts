import { LocalStorageService } from "@/services/localstorage";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { DEFAULT_VIDEO_LAYER } from "../constants";
import { VideoLayerType, VideoState } from "../types";

export function useVideoEditor(videoId: string) {
  const [videoState, setVideoState] = useState<VideoState | null>(null);
  const [isLoadingVideo, setIsLoadingVideo] = useState<boolean>(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const video = LocalStorageService.get(`video-${videoId}`);
    setVideoState(video);
    setIsLoadingVideo(false);
  }, []);

  function _updateStorage(nextVideoState: VideoState) {
    LocalStorageService.set(`video-${videoId}`, nextVideoState);
  }

  function setSelectedLayer(layerId: string) {
    if (!videoState) return;
    const nextVideoState = {
      ...videoState,
      settings: {
        ...videoState.settings,
        selectedLayerId: layerId,
      },
    };

    setVideoState(nextVideoState);
    _updateStorage(nextVideoState);
  }

  function addLayer(type: VideoLayerType) {
    if (!videoState) return;
    const uuid = uuidv4();
    const { currentFrame, frames } = videoState.settings;
    const newLayer = {
      ...DEFAULT_VIDEO_LAYER,
      id: uuid,
      type,
      start: currentFrame,
      end: frames,
    };

    const nextVideoState = {
      ...videoState,
      layers: [...videoState.layers, newLayer],
    };

    setVideoState(nextVideoState);
    _updateStorage(nextVideoState);
  }

  function setLayerStartEnd(layerId: string, [start, end]: [number, number]) {
    if (!videoState) return;

    const nextVideoState = {
      ...videoState,
      layers: videoState.layers.map((layer) => {
        if (layer.id === layerId) {
          return {
            ...layer,
            start,
            end,
          };
        }
        return layer;
      }),
    };

    setVideoState(nextVideoState);
    _updateStorage(nextVideoState);
  }

  function deleteLayer(layerId: string) {
    if (!videoState) return;

    const newLayers = videoState.layers.filter((layer) => layer.id !== layerId);
    console.log(newLayers);

    const nextVideoState = {
      ...videoState,
      layers: newLayers,
    };

    console.log(nextVideoState);

    setVideoState(nextVideoState);
    _updateStorage(nextVideoState);
  }

  return {
    videoState,
    setVideoState,
    isLoadingVideo,
    setSelectedLayer,
    addLayer,
    setLayerStartEnd,
    deleteLayer,
    canvasRef,
  };
}
