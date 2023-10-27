"use client";
import cx from "classnames";
import { useRef, useState } from "react";
import { LAYER_TYPES } from "../constants";
import { useVideoEditorContext } from "../context";
import { VideoLayerType } from "../types";
import { ImageUploader } from "@/features/image-uploader/components/ImageUploader";
import { Stepper } from "@/features/video-editor/components/Stepper";

interface AddLayerButtonProps {
  classes?: {
    button?: string;
  };
}

export function AddLayerButton({ classes = {} }: AddLayerButtonProps = {}) {
  const modalRef = useRef(null);
  const { addLayer, setLayerSource } = useVideoEditorContext();
  const [step, setStep] = useState<number>(0);
  const [newLayerId, setNewLayerId] = useState<string>("");

  function openModal() {
    (modalRef.current! as HTMLDialogElement).showModal();
  }

  function handleSelectType(type: VideoLayerType) {
    const id = addLayer(type);
    setStep(1);
    setNewLayerId(id);
  }

  function handleOnUploadCallback(url: string) {
    setLayerSource(newLayerId, url);
    (modalRef.current! as HTMLDialogElement).close();
  }

  return (
    <>
      <button
        className={cx("btn btn-ghost", classes.button)}
        onClick={openModal}
      >
        Add new layer
      </button>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            <div className="flex justify-center">
              <Stepper step={step} />
            </div>
            {step === 0 && (
              <>
                <h3 className="font-bold text-lg mb-5">Choose a layer type</h3>
                <div className="flex flex-col gap-2">
                  {(LAYER_TYPES as VideoLayerType[]).map(
                    (type: VideoLayerType) => (
                      <button
                        key={type}
                        className="btn btn-primary mb-2"
                        onClick={() => {
                          handleSelectType(type);
                        }}
                      >
                        {type}
                      </button>
                    )
                  )}
                </div>
              </>
            )}
            {step === 1 && <ImageUploader callback={handleOnUploadCallback} />}
          </form>
        </div>
      </dialog>
    </>
  );
}
