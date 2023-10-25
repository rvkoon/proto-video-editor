import { DEFAULT_VIDEO_STATE } from "../constants";
import { VideoState } from "../../video-editor/types";
import { v4 as uuidv4 } from "uuid";
import { LocalStorageService } from "@/services/localstorage";

export function createNewVideo(): VideoState {
  const videoId = uuidv4();
  const video = {
    ...DEFAULT_VIDEO_STATE,
    settings: { ...DEFAULT_VIDEO_STATE.settings, id: videoId },
  } as VideoState;

  LocalStorageService.set(`video-${videoId}`, video);

  return video;
}
