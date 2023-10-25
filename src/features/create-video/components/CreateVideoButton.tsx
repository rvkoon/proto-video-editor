"use client";

import { useCreateNewVideo } from "../services/useCreateNewVideo";

export function CreateVideoButton() {
  const { createNewVideo } = useCreateNewVideo();
  function handleOnClick() {
    createNewVideo();
  }

  return (
    <button onClick={handleOnClick} className="btn btn-primary">
      Create new video
    </button>
  );
}
