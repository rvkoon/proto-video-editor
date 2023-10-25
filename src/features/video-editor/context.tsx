"use client";

import { createContext, useContext, useState } from "react";
import { VideoEditorContextType, VideoState } from "./types";

const VideoEditorContext = createContext<VideoEditorContextType>({
  videoState: null,
  setVideoState: () => {},
});

export function useVideoEditorContext() {
  return useContext(VideoEditorContext);
}

interface VideoEditorContextProviderProps {
  children: React.ReactNode;
}

export function VideoEditorProvider({
  children,
}: VideoEditorContextProviderProps) {
  const [videoState, setVideoState] = useState<VideoState | null>(null);

  return (
    <VideoEditorContext.Provider value={{ videoState, setVideoState }}>
      {children}
    </VideoEditorContext.Provider>
  );
}
