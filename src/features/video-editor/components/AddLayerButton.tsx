"use client";
import cx from "classnames";
import { useRef } from "react";
import { LAYER_TYPES } from "../constants";
import { useVideoEditorContext } from "../context";
import { VideoLayerType } from "../types";

interface AddLayerButtonProps {
  classes?: {
    button?: string;
  };
}

export function AddLayerButton({ classes = {} }: AddLayerButtonProps = {}) {
  const modalRef = useRef(null);
  const { addLayer } = useVideoEditorContext();

  function openModal() {
    (modalRef.current! as HTMLDialogElement).showModal();
  }

  function handleAddLayer(type: VideoLayerType) {
    addLayer(type);
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
            <h3 className="font-bold text-lg mb-5">Choos a layer type</h3>
            {(LAYER_TYPES as VideoLayerType[]).map((type: VideoLayerType) => (
              <button
                key={type}
                className="btn btn-primary mb-2"
                onClick={() => {
                  handleAddLayer(type);
                }}
              >
                {type}
              </button>
            ))}
          </form>
        </div>
      </dialog>
    </>
  );
}
