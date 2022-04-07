export enum Modifier {
  PRIVATE = "private",
  PUBLIC = "public",
  STATIC = "static",
  FINAL = "final",
}

interface JavaParam {
  type: string;
  name: string;
}

interface ClassField extends JavaParam {
  comment?: string;
  modifiers: Modifier[];
  annotations: string[];
}

const partialImmutableField = () => ({
  modifiers: [Modifier.PRIVATE, Modifier.FINAL],
  annotations: [] as string[],
});

export const immutableField = (
  partialField: Partial<ClassField> & JavaParam
): ClassField => {
  return {...partialImmutableField(), ...partialField};
};

interface MethodSignature {
  name: string;
  comment?: string;
  modifiers: Modifier[];
  output: string;
  inputs: JavaParam[];
}

interface ClassModel {
  name: string;
  comment?: string;
  annotations: string[];
  fields: ClassField[];
  methods: MethodSignature[];
}

export const modifyModel = (delta: Partial<ClassModel>, model: ClassModel) => ({
  ...model,
  ...delta,
});

const formatStep = "  ";
const formatStep2 = formatStep.repeat(2);

const commentToStr = (comment?: string) =>
  comment ? "//" + comment + "\n" : "";

const annotationToStr = (annotation: string) => "@" + annotation;
const annotationsToStr = (annotations: string[]) =>
  annotations.map((a) => annotationToStr(a) + "\n");

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
