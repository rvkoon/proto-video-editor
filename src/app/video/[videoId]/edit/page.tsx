"use client";
import { useVideoEditorContext } from "@/features/video-editor/context";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

  return <div>{videoState?.settings.id}</div>;
}
