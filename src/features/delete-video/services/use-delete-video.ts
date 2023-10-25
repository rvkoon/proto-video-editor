import { useAppContext } from "@/app/context";
import { VideoState } from "@/features/video-editor/types";
import { LocalStorageService } from "@/services/localstorage";

export function useDeleteVideo() {
  const { setVideos, videos } = useAppContext();

  function deleteVideo(videoId: string) {
    LocalStorageService.remove(`video-${videoId}`);
    setVideos(
      videos.filter((video: VideoState) => video.settings.id !== videoId)
    );
  }

  return {
    deleteVideo,
  };
}
