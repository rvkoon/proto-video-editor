"use client";
import { useVideoEditorContext } from "@/features/video-editor/context";

export default function EditVideo() {
  const { videoState, isLoadingVideo } = useVideoEditorContext();

  if (isLoadingVideo) {
    return <span className="loading loading-ring loading-lg"></span>;
  }

  return <div>{videoState!.settings.id}</div>;
}
