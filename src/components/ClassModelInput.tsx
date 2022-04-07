import {FC} from "react";
import {ClassModelAnnotations} from "./ClassModelAnnotations";
import {useClassModel} from "./ClassModelContext";
import {ClassModelFields} from "./ClassModelFields";

const ClassModelName: FC = () => {
  const {state, dispatch} = useClassModel();

  return (
    <div>
      Name:
      <input
        type="text"
        onChange={(event) =>
          dispatch({type: "name", payload: event.target.value})
        }
        value={state.name}
      />
    </div>
  );
};

export const ClassModelInput: FC = () => {
  return (
    <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
      <ClassModelName />
      <ClassModelAnnotations />
      <ClassModelFields />
    </div>
  );
};
