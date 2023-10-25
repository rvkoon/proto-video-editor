"use client";

import { useRef, useState } from "react";
import { useCreateNewVideo } from "../services/useCreateNewVideo";

export function CreateVideoButton() {
  const { createNewVideo } = useCreateNewVideo();
  const [videoTitle, setVideoTitle] = useState<string>("");
  const modalRef = useRef(null);
  function handleOnClick() {
    createNewVideo({ title: videoTitle, description: "" });
    setVideoTitle("");
    (modalRef.current! as HTMLDialogElement).close();
  }

  function openModal() {
    (modalRef.current! as HTMLDialogElement).showModal();
  }

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setVideoTitle(e.target.value);
  }

  return (
    <>
      <button className="btn btn-primary" onClick={openModal}>
        Create new video
      </button>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Give the video a title</h3>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-primary w-full"
              value={videoTitle}
              onChange={handleOnChange}
            />
            <button
              className="btn btn-primary"
              disabled={!videoTitle}
              onClick={handleOnClick}
            >
              Create video
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
