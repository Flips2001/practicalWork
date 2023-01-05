import React from "react";
import Select from "react-select";

export type actionValues = "created" | "destroyed" | "morphs" | "attacks"

interface SelectorProps {
	onSelect: (value: { value: string, label: string } | null) => void
}

export const Selector: React.FunctionComponent<SelectorProps> = ({onSelect}) => {

	const options = [
		{value: "created", label: "Created units"},
		{value: "destroyed", label: "Destroyed units"},
		{value: "morphs", label: "Morphs"},
		{value: "attacks", label: "Attacks"},
	];

	return (
		<div>
			<Select
				options={options}
				onChange={onSelect}
			/>
		</div>
	);
};
