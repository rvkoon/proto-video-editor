"use client";
import { useAppContext } from "@/app/context";
import Link from "next/link";
import { VideoThumb } from "./VideoThumb";

export function VideosList() {
  const { isLoadingVideos, videos } = useAppContext();
  return (
    <div className="w-full min-h-[30vh] border border-primary/20 rounded-xl p-4">
      {isLoadingVideos && (
        <div className="w-full min-h-[30vh] flex justify-center items-center">
          <div className="loading loading-ring loading-lg"></div>
        </div>
      )}
      {!isLoadingVideos && videos.length === 0 && <p>No videos for now</p>}
      {!isLoadingVideos && videos.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {videos.map((video, index) => (
            <Link key={index} href={`/video/${video.settings.id}/edit`}>
              <VideoThumb video={video} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
