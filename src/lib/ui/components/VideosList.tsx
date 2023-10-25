"use client";
import { useAppContext } from "@/app/context";
import Link from "next/link";

export function VideosList() {
  const { isLoadingVideos, videos } = useAppContext();
  return (
    <div className="min-h-[30vh] border border-primary/20 rounded-xl p-4">
      {isLoadingVideos && (
        <span className="loading loading-ring loading-lg"></span>
      )}
      {!isLoadingVideos &&
        videos.length &&
        videos.map((video, index) => (
          <Link key={index} href={`/video/${video.settings.id}/edit`}>
            {video.settings.id}
          </Link>
        ))}
    </div>
  );
}
