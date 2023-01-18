import React, {useState} from "react";
import "./App.css";
import {Map} from "./components/map/Map";
import {Selector} from "./components/inputs/Selector";
import {validateOrReject} from "class-validator";
import {action, replay} from "./data/Replay";
import {RoseDiagram} from "./components/rosediagram/RoseDiagram";
import {Checkbox} from "./components/inputs/Checkbox";

function App() {

	const [replay, setReplay] = useState<replay | null>(null);
	const [selectedAction, setSelectedAction] = useState<action[] | undefined>(undefined);
	const [checked, setChecked] = React.useState(false);

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

	const filterActions = (value: { value: number, label: string } | null) => {
		if (value && replay) {
			setSelectedAction(replay.actionsByType[value.value].actions);
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
				<Selector onSelect={filterActions} data={replay?.actionsByType}/>
				<Checkbox onSelect={(checked) => setChecked(checked)} title={"Use DBSCAN to cluster data"}/>
				{replay && <Map replay={replay} actions={selectedAction} cluster={checked}/>}
				<RoseDiagram size={300}/>
			</header>
		</div>
	);
}

export default App;
