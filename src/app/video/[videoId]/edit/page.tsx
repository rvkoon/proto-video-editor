"use client";
import { CanvasEditor } from "@/features/video-editor/components/CanvasEditor";
import { useVideoEditorContext } from "@/features/video-editor/context";
import Link from "next/link";

export default function EditVideo() {
  const { videoState, isLoadingVideo } = useVideoEditorContext();

  if (isLoadingVideo) {
    return <span className="loading loading-ring loading-lg"></span>;
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
    <div className="flex gap-5">
      <div className="flex-1 flex justify-center p-5 border rounded-xl">
        <CanvasEditor />
      </div>
      <div className="flex-1 p-5 border rounded-xl">
        <p className="text-[56px] font-black">{videoState.settings.title}</p>
        <p>{videoState.settings.description}</p>
      </div>
    </div>
  );
}
