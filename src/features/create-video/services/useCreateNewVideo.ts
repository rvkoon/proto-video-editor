import { DEFAULT_VIDEO_STATE } from "../constants";
import { VideoState } from "../../video-editor/types";
import { v4 as uuidv4 } from "uuid";
import { LocalStorageService } from "@/services/localstorage";
import { useAppContext } from "@/app/context";

export function useCreateNewVideo() {
  const { videos, setVideos } = useAppContext();

  function createNewVideo({
    title,
    description,
  }: {
    title: string;
    description: string;
  }): VideoState {
    const videoId = uuidv4();
    const video = {
      ...DEFAULT_VIDEO_STATE,
      settings: {
        ...DEFAULT_VIDEO_STATE.settings,
        id: videoId,
        title,
        description,
      },
    } as VideoState;

    LocalStorageService.set(`video-${videoId}`, video);
    setVideos([...videos, video]);

    return video;
  }

  return {
    createNewVideo,
  };
}
