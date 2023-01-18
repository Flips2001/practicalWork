import React from "react";

interface SelectorProps {
	onSelect: (checked: boolean) => void
	title?: string
}

export const Checkbox: React.FunctionComponent<SelectorProps> = ({onSelect, title}) => {

	const [checked, setChecked] = React.useState(false);

	const handleChange = () => {
		onSelect(!checked);
		setChecked(!checked);
	};

	return (
		<div>
			<label>
				<input
					type="checkbox"
					checked={checked}
					onChange={handleChange}
				/>
				{title}
			</label>
		</div>
	);
};
