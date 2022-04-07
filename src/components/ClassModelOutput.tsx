import {FC} from "react";
import {classModelToStr} from "../domain/generate";
import {useClassModel} from "./ClassModelContext";

export const ClassModelOutput: FC = () => {
  const {state} = useClassModel();
  return <div style={{whiteSpace: "pre-line"}}>{classModelToStr(state)}</div>;
};
