"use client";

import { createContext, useContext } from "react";
import { useVideoEditor } from "./services/useVideoEditor";
import { VideoEditorContextType } from "./types";

const VideoEditorContext = createContext<VideoEditorContextType>({
  videoState: null,
  setVideoState: () => {},
  isLoadingVideo: false,
  setSelectedLayer: () => {},
  addLayer: () => {},
  setLayerStartEnd: () => {},
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
  const editor = useVideoEditor(videoId);

  return (
    <VideoEditorContext.Provider value={editor}>
      {children}
    </VideoEditorContext.Provider>
  );
}
