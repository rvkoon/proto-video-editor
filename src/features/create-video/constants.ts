import { VideoState } from "../video-editor/types";

export const DEFAULT_VIDEO_STATE: VideoState = {
  settings: {
    id: "",
    title: "",
    description: "",
    frames: 48,
    size: {
      width: 270,
      height: 480,
    },
    currentFrame: 0,
  },
  layers: [],
};
