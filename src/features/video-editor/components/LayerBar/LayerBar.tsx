"use client";
import { useEffect, useState } from "react";
//@ts-ignore
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import "./LayerBar.css";
import cx from "classnames";

interface LayerBarProps {
  isSelected?: boolean;
  sourceImg?: string;
}

export function LayerBar({ isSelected = false, sourceImg }: LayerBarProps) {
  const [value, setValue] = useState([0, 48]);
  const [startDisplayTime, setStartDisplayTime] = useState<string>("0:0");
  const [endDisplayTime, setEndDisplayTime] = useState<string>("0:0");

  useEffect(() => {
    const seconds = Math.floor(value[0] / 24);
    setStartDisplayTime(`${seconds}:${value[0] % 24}`);

    const seconds2 = Math.floor(value[1] / 24);
    setEndDisplayTime(`${seconds2}:${value[1] % 24}`);
  }, [value]);

  return (
    <div className={cx("h-[50px] flex items-center gap-4")}>
      <RangeSlider
        min={0}
        max={48}
        onInput={setValue}
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
      </div>
    </div>
  );
}
