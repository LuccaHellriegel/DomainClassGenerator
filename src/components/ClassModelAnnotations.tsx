import {FC} from "react";
import {annotationToStr} from "../domain/generate";
import {useClassModel} from "./ClassModelContext";

const ClassModelAnnotation: FC<{annotation: string}> = ({annotation}) => {
  const {state, dispatch} = useClassModel();

  return (
    <div
      onClick={() =>
        dispatch({
          type: "annotations",
          payload: state.annotations.filter((a) => a !== annotation),
        })
      }
    >
      {annotationToStr(annotation) + " (-)"}
    </div>
  );
};

const BaseAnnotations = ["Data", "Value", "AllArgsConstructor"];

const AnnotationButton: FC<{annotation: string}> = ({annotation}) => {
  const {state, dispatch} = useClassModel();
  return (
    <button
      onClick={() =>
        dispatch({
          type: "annotations",
          payload: [...state.annotations, annotation],
        })
      }
    >
      {"+ " + annotationToStr(annotation)}
    </button>
  );
};

const AnnotationButtons: FC = () => {
  return (
    <div>
      {BaseAnnotations.map((annotation) => (
        <AnnotationButton annotation={annotation} />
      ))}
    </div>
  );
};

export const ClassModelAnnotations: FC = () => {
  const {state, dispatch} = useClassModel();

  return (
    <div>
      <AnnotationButtons />
      {state.annotations.map((annotation) => (
        <ClassModelAnnotation annotation={annotation} />
      ))}
    </div>
  );
};
