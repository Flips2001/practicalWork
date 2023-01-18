import React, {useState} from "react";
import "./App.css";
import {Map} from "./components/map/Map";
import {Selector} from "./components/inputs/Selector";
import {validateOrReject} from "class-validator";
import {action, replay} from "./data/Replay";
import {Checkbox} from "./components/inputs/Checkbox";

function App() {

	const [replay, setReplay] = useState<replay | null>(null);
	const [selectedAction, setSelectedAction] = useState<action[] | undefined>(undefined);

	const [cluster, setCluster] = React.useState(false);
	const [showRose, setShowRose] = React.useState(false);
	const [showScatterData, setShowScatterData] = React.useState(false);

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
				<Checkbox onSelect={setCluster} title={"Use DBSCAN to cluster data"}/>
				<Checkbox onSelect={setShowRose} title={"Show clustered data as rose diagram"} disabled={!cluster}/>
				<Checkbox onSelect={setShowScatterData} title={"Show clustered data"} disabled={!showRose}/>
				{replay && <Map replay={replay} actions={selectedAction} cluster={cluster} showRose={showRose}
					showScatterData={showScatterData}/>}
			</header>
		</div>
	);
}

export default App;
