import React, {useState} from "react";
import "./App.css";
import {Map} from "./components/map/Map";
import {actionValues, Selector} from "./components/selector/Selector";
import {validateOrReject} from "class-validator";
import {replay} from "./data/Replay";

function App() {

	const [replay, setReplay] = useState<replay | null>(null);
	const [selectedAction, setSelectedAction] = useState<actionValues | undefined>(undefined);

	async function validateOrRejectExample(input: any) {
		try {
			await validateOrReject(input);
			setReplay(input);
		} catch (errors) {
			console.log("Caught promise rejection (validation failed). Errors: ", errors);
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files != null && e.target.files.length > 0) {
			const file = e.target.files[0];
			const fileReader = new FileReader();
			fileReader.onloadend = () => {
				const content = fileReader.result;
				if (typeof content === "string") {
					const newData = JSON.parse(content);
					validateOrRejectExample(newData);
				}
			};
			fileReader.readAsText(file);
		}
	};

	const filterActions = (value: { value: string, label: string } | null) => {
		if (value && replay) {
			setSelectedAction(value.value as actionValues);
		}
	};

	return (
		<div className="App">
			<header className="App-header">
				<input
					type="file"
					accept=".json"
					onChange={handleChange}
				/>
				<Selector onSelect={filterActions}/>
				{replay && <Map replay={replay} action={selectedAction}/>}
			</header>
		</div>
	);
}

export default App;
