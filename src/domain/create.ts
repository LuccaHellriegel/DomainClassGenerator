import {Modifier, ClassField, JavaParam, ClassModel} from "./domain";

const partialImmutableField = () => ({
  modifiers: [Modifier.PRIVATE, Modifier.FINAL],
  annotations: [] as string[],
});

export const immutableField = (
  partialField: Partial<ClassField> & JavaParam
): ClassField => {
  return {...partialImmutableField(), ...partialField};
};

export const modifyModel = (delta: Partial<ClassModel>, model: ClassModel) => ({
  ...model,
  ...delta,
});

export const defaultModel = (): ClassModel => ({
  name: "",
  annotations: [],
  fields: [],
  methods: [],
});

//TODO: make templates kinda?
// switch between "Safe @Data" and "Value Object"
//TODO: make the default next field on + configurable
