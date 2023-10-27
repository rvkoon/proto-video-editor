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
  fps: number;
  isPlaying: boolean;
  isEnded: boolean;
  selectedLayerId: string | null;
};

export type VideoLayer = {
  id: string;
  type: VideoLayerType;
  source: any;
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
  canvasRef: React.RefObject<HTMLCanvasElement> | null;
  setSelectedLayer: (layerId: string) => void;
  addLayer: (type: VideoLayerType) => string;
  setLayerStartEnd: (layerId: string, startEnd: [number, number]) => void;
  deleteLayer: (layerId: string) => void;
  setLayerSource: (layerId: string, source: any) => void;
};

export enum VideoLayerType {
  OBJECT = "object",
}
