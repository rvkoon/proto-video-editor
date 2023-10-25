"use client";
import { VideoEditorProvider } from "@/features/video-editor/context";

interface VideoLayoutProps {
  children: React.ReactNode;
  params: {
    videoId: string;
  };
}

export default function VideoLayout({
  children,
  params: { videoId },
}: VideoLayoutProps) {
  return (
    <VideoEditorProvider videoId={videoId}>{children}</VideoEditorProvider>
  );
}
