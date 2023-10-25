export type VideoSettings = {
  id: string;
  title: string;
  description?: string;
  frames: number;
  size: {
    width: number;
    height: number;
  };
  currentFrame: number;
};

export type VideoLayer = {
  id: string;
  type: string;
  source: string;
  frames: number;
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
  start: number;
  end: number;
};

export type VideoState = {
  settings: VideoSettings;
  layers: VideoLayer[];
};

export type VideoEditorContextType = {
  videoState: VideoState | null;
  setVideoState: React.Dispatch<React.SetStateAction<VideoState | null>>;
  isLoadingVideo: boolean;
};
