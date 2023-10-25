import { useEffect, useRef, useState } from "react";
import { Play, Pause, Rewind } from "react-feather";
import { useVideoEditorContext } from "../context";

export function PlayerBar() {
  const { videoState, setVideoState, isLoadingVideo } = useVideoEditorContext();
  const [max, setMax] = useState<number>(0);
  const currentFrameLocalRef = useRef<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [displayTime, setDisplayTime] = useState<string>("0:0");
  const [isEnded, setIsEnded] = useState<boolean>(false);
  const fps = 24;
  let rafTimeOut = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!videoState) return;

    setMax(videoState.settings.frames);
  }, []);

  useEffect(() => {
    const currentFrame = videoState?.settings.currentFrame || 0;
    const seconds = Math.floor(currentFrame / fps);
    setDisplayTime(`${seconds}:${currentFrame % fps}`);
  }, [videoState?.settings.currentFrame]);

  function _setCurrentFrame(frame: number) {
    if (!videoState) return;

    const nextVideoState = {
      ...videoState,
      settings: {
        ...videoState.settings,
        currentFrame: frame,
      },
    };
    currentFrameLocalRef.current = frame;
    setVideoState(nextVideoState);
    if (frame >= max) {
      setIsEnded(true);
    } else {
      setIsEnded(false);
    }
  }

  function handleSetCurrentFrame(e: React.ChangeEvent<HTMLInputElement>) {
    _setCurrentFrame(parseInt(e.target.value));
  }

  function play() {
    setIsPlaying(true);
    if (currentFrameLocalRef.current < max) {
      _raf();
    }
  }

  function pause() {
    setIsPlaying(false);
    if (rafTimeOut.current) {
      clearTimeout(rafTimeOut.current);
    }
  }

  function rewind() {
    _setCurrentFrame(0);
    setIsEnded(false);
    setIsPlaying(false);
  }

  function _raf() {
    if (!videoState) return;
    const nextFrame = currentFrameLocalRef.current + 1;
    _setCurrentFrame(nextFrame);

    if (nextFrame < max) {
      rafTimeOut.current = setTimeout(() => {
        requestAnimationFrame(_raf);
      }, 1000 / fps);
    } else {
      setIsEnded(true);
    }
  }

  if (isLoadingVideo)
    return <span className="loading loading-ring loading-lg"></span>;

  if (!videoState) return <div>Video not found</div>;

  return (
    <div className="flex items-center gap-4">
      <input
        type="range"
        min={0}
        max={max}
        value={currentFrameLocalRef.current}
        className="range range-primary transition-all"
        onChange={handleSetCurrentFrame}
      />
      {isPlaying && !isEnded && (
        <button className="btn btn-square" onClick={pause}>
          <Pause />
        </button>
      )}
      {!isPlaying && !isEnded && (
        <button className="btn btn-square" onClick={play}>
          <Play />
        </button>
      )}
      {isEnded && (
        <button className="btn btn-square" onClick={rewind}>
          <Rewind />
        </button>
      )}
      <div className="w-24 flex justify-center items-center border rounded-lg h-full">
        {displayTime}
      </div>
    </div>
  );
}
