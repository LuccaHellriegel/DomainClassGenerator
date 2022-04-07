import {FC} from "react";
import {ClassField} from "../domain/domain";
import {useClassModel} from "./ClassModelContext";

const ClassModelField: FC<{
  field: ClassField;
}> = ({field}) => {
  const {state, dispatch} = useClassModel();

  return (
    <div
      onClick={() =>
        dispatch({
          type: "fields",
          payload: state.fields.filter((f) => f !== field),
        })
      }
    >
      {field}
    </div>
  );
};

export const ClassModelFields: FC = () => {
  const {state} = useClassModel();

  return (
    <div>
      {state.fields.map((field) => (
        <ClassModelField field={field} />
      ))}
    </div>
  );
};
