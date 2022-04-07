import { FC, useState } from "react";
import { defaultImmutableField } from "../domain/create";
import { ClassField, Modifier } from "../domain/domain";
import { classFieldToStr } from "../domain/generate";
import { enumKeys } from "../util";
import { useClassModel } from "./ClassModelContext";

const ClassModelField: FC<{
	field: ClassField;
}> = ({ field }) => {
	const { state, dispatch } = useClassModel();

	return (
		<div
			onClick={() =>
				dispatch({
					type: "fields",
					payload: state.fields.filter((f) => f !== field),
				})
			}
		>
			{classFieldToStr(field) + " (-)"}
		</div>
	);
};

const AddClassModelField: FC = () => {
	const { state, dispatch } = useClassModel();
	const [fieldState, setFieldState] = useState(defaultImmutableField());
	return (
		<div style={{ display: "flex", flexDirection: "row", gap: "4px" }}>
			<button onClick={() => dispatch({ type: "fields", payload: [...state.fields, fieldState] })}>+</button>
			<select
				onChange={(event) =>
					setFieldState({
						...fieldState,
						modifiers: [
							//@ts-ignore
							event.target.value === "-" ? "" : Modifier[event.target.value],
							fieldState.modifiers[1],
						],
					})
				}
			>
				{Object.entries(Modifier).map((modifier) => (
					<option value={modifier[0]}>{modifier[1]}</option>
				))}
				<option>-</option>
			</select>
			<select
				onChange={(event) =>
					setFieldState({
						...fieldState,
						modifiers: [
							fieldState.modifiers[0],
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
			<input value={fieldState.type} onChange={(event) => setFieldState({ ...fieldState, type: event.target.value })} />
			<input value={fieldState.name} onChange={(event) => setFieldState({ ...fieldState, name: event.target.value })} />
		</div>
	);
};

export const ClassModelFields: FC = () => {
	const { state } = useClassModel();

	return (
		<div>
			<AddClassModelField />
			{state.fields.map((field) => (
				<ClassModelField field={field} />
			))}
		</div>
	);
};
