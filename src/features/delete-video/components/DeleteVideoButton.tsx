import { Trash2 } from "react-feather";
import { useDeleteVideo } from "../services/use-delete-video";

interface DeleteVideoButtonProps {
  videoId: string;
}

export function DeleteVideoButton({ videoId }: DeleteVideoButtonProps) {
  const { deleteVideo } = useDeleteVideo();

  function handleOnClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    e.preventDefault();
    deleteVideo(videoId);
  }

  return (
    <button
      className="btn btn-square !bg-white border border-error hover:border-error hover:border-2"
      onClick={handleOnClick}
    >
      <Trash2 className="text-error" />
    </button>
  );
}
