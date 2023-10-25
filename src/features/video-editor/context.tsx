"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { VideoEditorContextType, VideoState } from "./types";
import { LocalStorageService } from "@/services/localstorage";

const VideoEditorContext = createContext<VideoEditorContextType>({
  videoState: null,
  setVideoState: () => {},
  isLoadingVideo: false,
});

export function useVideoEditorContext() {
  return useContext(VideoEditorContext);
}

interface VideoEditorContextProviderProps {
  children: React.ReactNode;
  videoId: string;
}

export function VideoEditorProvider({
  children,
  videoId,
}: VideoEditorContextProviderProps) {
  const [videoState, setVideoState] = useState<VideoState | null>(null);
  const [isLoadingVideo, setIsLoadingVideo] = useState<boolean>(true);

  useEffect(() => {
    const video = LocalStorageService.get(`video-${videoId}`);
    setVideoState(video);
    setIsLoadingVideo(false);
  }, []);

  return (
    <VideoEditorContext.Provider
      value={{ videoState, setVideoState, isLoadingVideo }}
    >
      {children}
    </VideoEditorContext.Provider>
  );
}
