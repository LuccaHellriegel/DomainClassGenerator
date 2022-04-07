import {
  Modifier,
  ClassField,
  JavaParam,
  ClassModel,
  MethodSignature,
} from "./domain";

const formatStep = "  ";
const formatStep2 = formatStep.repeat(2);

const commentToStr = (comment?: string) =>
  comment ? "//" + comment + "\n" : "";

export const annotationToStr = (annotation: string) => "@" + annotation;
const annotationsToStr = (annotations: string[]) =>
  annotations.map((a) => annotationToStr(a) + "\n").join("");

const paramToStr = (param: JavaParam) => param.type + " " + param.name;

const modifiersToStr = (modifiers: Modifier[]) => modifiers.join(" ");

const classFieldToStr = (field: ClassField) =>
  commentToStr(field.comment) +
  formatStep2 +
  annotationsToStr(field.annotations) +
  modifiersToStr(field.modifiers) +
  " " +
  paramToStr(field) +
  ";";

const methodSignatureToStr = (sig: MethodSignature) =>
  commentToStr(sig.comment) +
  formatStep2 +
  modifiersToStr(sig.modifiers) +
  " " +
  sig.output +
  " " +
  sig.name +
  "(" +
  sig.inputs.map(paramToStr).join(", ") +
  ") {\n    //TODO\n    return null;\n  }";

export const classModelToStr = (model: ClassModel): string => {
  const head =
    commentToStr(model.comment) +
    annotationsToStr(model.annotations) +
    "public class " +
    model.name +
    " {\n";
  const fields = model.fields.map(classFieldToStr).join("\n") + "\n\n";
  const methods = model.methods.map(methodSignatureToStr).join("\n") + "\n\n";
  const end = "}\n";

  return (
    "\n" +
    head +
    (fields !== "\n\n" ? fields : "") +
    (methods !== "\n\n" ? methods : "") +
    end
  );
};
