"use client";

import { useAppContext } from "@/app/context";
import { DeleteVideoButton } from "@/features/delete-video/components/DeleteVideoButton";
import { VideoState } from "@/features/video-editor/types";
import Image from "next/image";
import { useState } from "react";

interface VideoThumbProps {
  video: VideoState;
}

export function VideoThumb({ video }: VideoThumbProps) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="card w-auto bg-base-100 shadow-md hover:scale-105 hover:shadow-xl hover:z-50 transition-all relative"
    >
      {isHovering && (
        <div className="absolute right-[10px] top-[10px]">
          <DeleteVideoButton videoId={video.settings.id} />
        </div>
      )}

      <figure className="px-10 pt-10">
        <Image
          src="/bg.jpg"
          alt="Shoes"
          width={300}
          height={200}
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{video.settings.title}</h2>
        <p>{video.settings.description}</p>
      </div>
    </div>
  );
}
