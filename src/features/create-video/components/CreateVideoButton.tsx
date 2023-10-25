"use client";

import { useRef, useState } from "react";
import { useCreateNewVideo } from "../services/useCreateNewVideo";
import cx from "classnames";

export function CreateVideoButton() {
  const { createNewVideo } = useCreateNewVideo();
  const [videoTitle, setVideoTitle] = useState<string>("");
  const [videoDescription, setVideoDescription] = useState<string>("");
  const [step, setStep] = useState<number>(0);
  const modalRef = useRef(null);
  function handleOnClick() {
    createNewVideo({ title: videoTitle, description: videoDescription });
    setVideoTitle("");
    (modalRef.current! as HTMLDialogElement).close();
  }

  function openModal() {
    (modalRef.current! as HTMLDialogElement).showModal();
  }

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setVideoTitle(e.target.value);
  }

  function handleOnChangeDescription(e: React.ChangeEvent<HTMLInputElement>) {
    setVideoDescription(e.target.value);
  }

  return (
    <>
      <button className="btn btn-primary" onClick={openModal}>
        Create new video
      </button>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <ul className="steps my-10">
            <li
              data-content={step === 0 ? "●" : "✓"}
              className={cx("step", step >= 0 && "step-primary")}
            >
              Title
            </li>
            <li
              data-content={step === 1 ? "●" : ""}
              className={cx("step", step === 1 && "step-primary")}
            >
              Description
            </li>
          </ul>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          {step === 0 && (
            <>
              <h3 className="font-bold text-lg mb-5">Give the video a title</h3>
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
                  onClick={() => setStep(1)}
                >
                  Continue
                </button>
              </div>
            </>
          )}
          {step === 1 && (
            <>
              <h3 className="font-bold text-lg mb-5">
                Give the video a description
              </h3>
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered input-primary w-full"
                  value={videoDescription}
                  onChange={handleOnChangeDescription}
                />
                <button
                  className="btn btn-primary"
                  disabled={!videoDescription}
                  onClick={handleOnClick}
                >
                  Create video
                </button>
              </div>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
