import { VideoState } from "../video-editor/types";

export const DEFAULT_VIDEO_STATE: VideoState = {
  settings: {
    id: "",
    title: "",
    description: "",
    frames: 48,
    size: {
      width: 1080,
      height: 1920,
    },
    currentFrame: 0,
  },
  layers: [],
};
