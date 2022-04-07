import {expect, test} from "vitest";
import {classModelToStr, immutableField, Modifier} from "./model";

test("test", () => {
  const result = classModelToStr({
    name: "Test",
    annotations: ["Data"],
    fields: [immutableField({name: "testField", type: "String"})],
    methods: [
      {
        name: "useTestField",
        modifiers: [Modifier.STATIC, Modifier.PUBLIC],
        inputs: [
          {name: "firstInput", type: "String"},
          {name: "secondInput", type: "Boolean"},
        ],
        output: "String",
      },
    ],
  });

  expect(result).toEqual(`
@Data
public class Test {
    private final String testField;

    static public String useTestField(String firstInput, Boolean secondInput) {
    //TODO
    return null;
  }

}
`);
});
