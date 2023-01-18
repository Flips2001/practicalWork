import React from "react";

interface SelectorProps {
	onSelect: (checked: boolean) => void
	title?: string
	disabled?: boolean
}

export const Checkbox: React.FunctionComponent<SelectorProps> = ({onSelect, title, disabled}) => {

	const [checked, setChecked] = React.useState(false);

	const handleChange = () => {
		onSelect(!checked);
		setChecked(!checked);
	};

	return (
		<div>
			<label>
				<input
					disabled={disabled}
					type="checkbox"
					checked={checked}
					onChange={handleChange}
				/>
				{title}
			</label>
		</div>
	);
};
