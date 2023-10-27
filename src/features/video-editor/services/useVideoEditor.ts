import { LocalStorageService } from "@/services/localstorage";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { DEFAULT_VIDEO_LAYER } from "../constants";
import { VideoLayer, VideoLayerType, VideoState } from "../types";

export function useVideoEditor(videoId: string) {
  const [videoState, setVideoState] = useState<VideoState | null>(null);
  const [isLoadingVideo, setIsLoadingVideo] = useState<boolean>(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const video = LocalStorageService.get(`video-${videoId}`);
    setVideoState(video);
    setIsLoadingVideo(false);
  }, []);

  useEffect(() => {
    if (!videoState) return;
    drawCanvas();
  }, [videoState?.settings.currentFrame]);

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

    return uuid;
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

  function setLayerSource(layerId: string, source: string) {
    if (!videoState) return;

    const nextVideoState = {
      ...videoState,
      layers: videoState.layers.map((layer) => {
        if (layer.id === layerId) {
          return {
            ...layer,
            source,
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

    const nextVideoState = {
      ...videoState,
      layers: newLayers,
    };

    setVideoState(nextVideoState);
    _updateStorage(nextVideoState);
  }

  function drawCanvas() {
    if (!canvasRef.current || !videoState) return;
    const {
      settings: {
        size: { width, height },
        currentFrame,
      },
      layers,
    } = videoState;
    const ctx = canvasRef.current.getContext("2d")!;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, width, height);

    const currentLayers = layers.filter(
      (layer) => currentFrame >= layer.start && currentFrame <= layer.end
    );

    currentLayers.forEach((layer) => {
      const {
        position: { x, y },
        size: { width, height },
        source,
      } = layer;
      const img = new Image();
      img.onload = function () {
        ctx.drawImage(img, x, y, width, height); // Or at whatever offset you like
      };
      img.src = source;
    });
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
    setLayerSource,
  };
}
