import { FC, useState } from "react";
import { defaultImmutableField, defaultJavaParam, defaultMethod } from "../domain/create";
import { JavaParam, MethodSignature, Modifier } from "../domain/domain";
import { methodSignatureToStr } from "../domain/generate";
import { useClassModel } from "./ClassModelContext";

const ClassModelMethod: FC<{
	method: MethodSignature;
}> = ({ method }) => {
	const { state, dispatch } = useClassModel();

	return (
		<div
			onClick={() =>
				dispatch({
					type: "methods",
					payload: state.methods.filter((f) => JSON.stringify(f) !== JSON.stringify(method)),
				})
			}
		>
			{methodSignatureToStr(method) + " (-)"}
		</div>
	);
};

const InputParam: FC<{
	input: JavaParam;
	methodState: MethodSignature;
	setMethodState: (methodState: MethodSignature) => void;
}> = ({ input, methodState, setMethodState }) => {
	return (
		<div style={{ backgroundColor: "grey", padding: "2px" }}>
			<button
				onClick={() =>
					setMethodState({
						...methodState,
						inputs: methodState.inputs.filter((i) => i !== input),
					})
				}
			>
				-
			</button>
			<input
				value={input.type}
				onChange={(event) =>
					setMethodState({
						...methodState,
						inputs: methodState.inputs.map((i) => (i === input ? { ...i, type: event.target.value } : i)),
					})
				}
			/>
			<input
				value={input.name}
				onChange={(event) =>
					setMethodState({
						...methodState,
						inputs: methodState.inputs.map((i) => (i === input ? { ...i, name: event.target.value } : i)),
					})
				}
			/>
		</div>
	);
};

const AddClassModelMethod: FC = () => {
	const { state, dispatch } = useClassModel();
	const [methodState, setMethodState] = useState(defaultMethod());
	return (
		<div style={{ display: "flex", flexDirection: "row", gap: "4px" }}>
			<button onClick={() => dispatch({ type: "methods", payload: [...state.methods, methodState] })}>+</button>
			<select
				onChange={(event) =>
					setMethodState({
						...methodState,
						modifiers: [
							//@ts-ignore
							event.target.value === "-" ? "" : Modifier[event.target.value],
						],
					})
				}
			>
				{Object.entries(Modifier).map((modifier) => (
					<option value={modifier[0]}>{modifier[1]}</option>
				))}
				<option>-</option>
			</select>
			<input
				value={methodState.output}
				onChange={(event) => setMethodState({ ...methodState, output: event.target.value })}
			/>
			<input
				value={methodState.name}
				onChange={(event) => setMethodState({ ...methodState, name: event.target.value })}
			/>
			<button onClick={() => setMethodState({ ...methodState, inputs: [...methodState.inputs, defaultJavaParam()] })}>
				+
			</button>
			{methodState.inputs.map((input) => (
				<InputParam input={input} methodState={methodState} setMethodState={setMethodState} />
			))}
		</div>
	);
};

export const ClassModelMethods: FC = () => {
	const { state } = useClassModel();

	return (
		<div>
			<AddClassModelMethod />
			{state.methods.map((method) => (
				<ClassModelMethod method={method} />
			))}
		</div>
	);
};
