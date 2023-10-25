interface VideoLayoutProps {
  children: React.ReactNode;
  params: {
    videoId: string;
  };
}

export function VideoLayout({
  children,
  params: { videoId },
}: VideoLayoutProps) {
  return <div>{children}</div>;
}
