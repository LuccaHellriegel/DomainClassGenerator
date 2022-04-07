import { FC } from "react";
import { ClassModelAnnotations } from "./ClassModelAnnotations";
import { useClassModel } from "./ClassModelContext";
import { ClassModelFields } from "./ClassModelFields";
import { ClassModelMethods } from "./ClassModelMethods";

const ClassModelName: FC = () => {
	const { state, dispatch } = useClassModel();

	return (
		<div>
			Name:
			<input
				type="text"
				onChange={(event) => dispatch({ type: "name", payload: event.target.value })}
				value={state.name}
			/>
		</div>
	);
};

export const ClassModelInput: FC = () => {
	return (
		<div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
			<ClassModelName />
			<ClassModelAnnotations />
			<ClassModelFields />
			<ClassModelMethods />
		</div>
	);
};
