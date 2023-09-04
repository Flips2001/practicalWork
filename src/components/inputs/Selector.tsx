import React from "react";
import Select from "react-select";
import {actions} from "../../data/Replay";

interface SelectorProps {
    onSelect: (value: { value: number; label: string; } | null) => void
    data?: actions[]
}

export const Selector: React.FunctionComponent<SelectorProps> = ({onSelect, data}) => {

	const options = data?.map((data, index) => {
		return {value: index, label: data.title};
	});

	return (
		<div>
			<Select
				options={options}
				onChange={onSelect}
			/>
		</div>
	);
};
