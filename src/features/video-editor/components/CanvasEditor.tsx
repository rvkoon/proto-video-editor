import { useEffect, useRef } from "react";
import { useVideoEditorContext } from "../context";

export function CanvasEditor() {
  const { videoState } = useVideoEditorContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!videoState) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    const { width, height } = videoState.settings.size;

    canvas.width = width;
    canvas.height = height;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, width, height);
    };

    render();
  }, []);

  return <canvas ref={canvasRef}></canvas>;
}
