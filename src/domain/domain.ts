export enum Modifier {
	PRIVATE = "private",
	PUBLIC = "public",
	STATIC = "static",
	FINAL = "final",
}
export interface JavaParam {
	type: string;
	name: string;
}

export interface ClassField extends JavaParam {
	comment?: string;
	modifiers: Modifier[];
	annotations: string[];
}
export interface MethodSignature {
	name: string;
	//TODO: add optional TODO: string that will be appended to the array
	comment?: string;
	modifiers: Modifier[];
	output: string;
	inputs: JavaParam[];
}

//TODO: optionally add todo = test needed for each method
//better add test class at the bottom and then we dont need to copy it if we dont want
export interface ClassModel {
	name: string;
	//TODO: make this an array, so I can add multiple / multi line comments
	comment?: string;
	//TODO: add todo string array
	annotations: string[];
	fields: ClassField[];
	methods: MethodSignature[];
}
