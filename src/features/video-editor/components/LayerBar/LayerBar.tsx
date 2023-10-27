"use client";
import { useEffect, useState } from "react";
//@ts-ignore
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import "./LayerBar.css";
import cx from "classnames";
import { VideoLayer } from "../../types";
import { useVideoEditorContext } from "../../context";
import { Trash2 } from "react-feather";

interface LayerBarProps {
  layer: VideoLayer;
}

export function LayerBar({ layer }: LayerBarProps) {
  const { setSelectedLayer, setLayerStartEnd, deleteLayer } =
    useVideoEditorContext();

  const [value, setValue] = useState<[number, number]>([
    layer.start,
    layer.end,
  ]);
  const [startDisplayTime, setStartDisplayTime] = useState<string>("0:0");
  const [endDisplayTime, setEndDisplayTime] = useState<string>("0:0");

  useEffect(() => {
    const seconds = Math.floor(value[0] / 24);
    setStartDisplayTime(`${seconds}:${value[0] % 24}`);

    const seconds2 = Math.floor(value[1] / 24);
    setEndDisplayTime(`${seconds2}:${value[1] % 24}`);
  }, [value]);

  function handleChangeValue([start, end]: [number, number]) {
    setValue([start, end]);
    setLayerStartEnd(layer.id, [start, end]);
  }

  function handleDeleteLayer() {
    deleteLayer(layer.id);
  }

  return (
    <div
      className={cx("h-[50px] flex items-center gap-4")}
      // onClick={() => setSelectedLayer(layer.id)}
    >
      <RangeSlider
        min={0}
        max={48}
        onInput={handleChangeValue}
        value={value}
        id="customSlider"
      />
      <div className="w-80 flex gap-4">
        <div className="flex-1 flex justify-center items-center border rounded-lg">
          {startDisplayTime}
        </div>
        <div className="flex-1 flex justify-center items-center border rounded-lg">
          {endDisplayTime}
        </div>
        <button
          className="btn btn-square !bg-white border border-error hover:border-error hover:border-2"
          onClick={handleDeleteLayer}
        >
          <Trash2 className="text-error" />
        </button>
      </div>
    </div>
  );
}
