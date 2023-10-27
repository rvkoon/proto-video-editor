import cx from "classnames";

interface StepperProps {
  step: number;
}

export function Stepper({ step }: StepperProps) {
  return (
    <ul className="steps my-10">
      <li
        data-content={step === 0 ? "●" : "✓"}
        className={cx("step", step >= 0 && "step-primary")}
      >
        Type
      </li>
      <li
        data-content={step === 1 ? "●" : ""}
        className={cx("step", step === 1 && "step-primary")}
      >
        Source
      </li>
    </ul>
  );
}
