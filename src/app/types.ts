import { VideoState } from "@/features/video-editor/types";

export type AppContext = {
  videos: VideoState[];
  setVideos: (videos: VideoState[]) => void;
  isLoadingVideos: boolean;
};
