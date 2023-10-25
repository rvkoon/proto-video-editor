"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { AppContext } from "./types";
import { LocalStorageService } from "@/services/localstorage";
import { VideoState } from "@/features/video-editor/types";

const AppContext = createContext<AppContext>({
  videos: [],
  setVideos: () => [],
  isLoadingVideos: false,
});

export function useAppContext() {
  return useContext(AppContext);
}

interface AppContextProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppContextProviderProps) {
  const [videos, setVideos] = useState<VideoState[]>([]);
  const [isLoadingVideos, setIsLoadingVideos] = useState<boolean>(true);

  useEffect(() => {
    const videos = LocalStorageService.getAllWithPrefix("video");
    console.log({ storageVideos: videos });
    setVideos(videos);
    setIsLoadingVideos(false);
  }, []);

  return (
    <AppContext.Provider value={{ videos, setVideos, isLoadingVideos }}>
      {children}
    </AppContext.Provider>
  );
}
