"use client";

import { createNewVideo } from "../services/createNewVideo";

export function CreateVideoButton() {
  function handleOnClick() {
    createNewVideo();
  }

  return (
    <button onClick={handleOnClick} className="btn btn-primary">
      Create new video
    </button>
  );
}
