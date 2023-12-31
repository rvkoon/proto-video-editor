"use client";
import { AddLayerButton } from "@/features/video-editor/components/AddLayerButton";
import { CanvasEditor } from "@/features/video-editor/components/CanvasEditor";
import { LayerBar } from "@/features/video-editor/components/LayerBar/LayerBar";
import { PlayerBar } from "@/features/video-editor/components/PlayerBar";
import { useVideoEditorContext } from "@/features/video-editor/context";
import Link from "next/link";
import { useEffect } from "react";
import { Home } from "react-feather";

export default function EditVideo() {
  const { videoState, isLoadingVideo } = useVideoEditorContext();

  useEffect(() => {
    console.log(videoState);
  }, [videoState]);

  if (isLoadingVideo) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="loading loading-ring loading-lg"></div>
      </div>
    );
  }

  if (!videoState) {
    return (
      <div className="flex flex-col gap-4 justify-center items-center mt-24">
        <div>Video not found</div>
        <Link href="/" className="btn btn-primary">
          Back Home
        </Link>
      </div>
    );
  }

  return (
    <div className="p-5">
      <div className="flex justify-between p-5 border-2 rounded-xl mb-5">
        <p className="text-primary font-bold">VideoEditor</p>
        <Link href="/" className="hover:scale-105">
          <Home />
        </Link>
      </div>
      <div className="flex gap-5">
        <div className="flex-2 flex justify-center p-5">
          <CanvasEditor />
        </div>
        <div className="flex-1 p-5 border-2 rounded-xl">
          <p className="text-[56px] font-black">{videoState.settings.title}</p>
          <p>{videoState.settings.description}</p>
          <div className="my-5">
            <PlayerBar style="inline" />
          </div>
          <div className="divider"></div>
          <div className="my-5 flex flex-col gap-2">
            {videoState.layers.length > 0 ? (
              videoState.layers.map((layer) => (
                <LayerBar key={layer.id} layer={layer} />
              ))
            ) : (
              <p>No video layers</p>
            )}
          </div>
          <div className="divider"></div>
          <AddLayerButton classes={{ button: "w-full mt-2" }} />
        </div>
      </div>
    </div>
  );
}
