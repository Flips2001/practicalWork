import React, {useState} from "react";
import "./App.css";
import {Map} from "./components/map/Map";
import {Selector} from "./components/inputs/Selector";
import {
	action,
	replay,
	replaySchema
} from "./data/Replay";
import {Checkbox} from "./components/inputs/Checkbox";
import * as sc from "./App.sc";

function App() {

	const [replay, setReplay] = useState<replay | null>(null);
	const [selectedAction, setSelectedAction] = useState<action[] | undefined>(undefined);

	const [cluster, setCluster] = React.useState(false);
	const [showRose, setShowRose] = React.useState(false);
	const [showScatterData, setShowScatterData] = React.useState(false);

	function validateOrRejectExample(input: unknown) {
		const validationResult = replaySchema.safeParse(input);
		if (!validationResult.success) {
			console.error("Validation failed:", validationResult.error);
			return false;
		} else {
			setReplay(validationResult.data);
			return true;
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
					if (!validateOrRejectExample(newData)) {
						alert("File is not a valid replay file");
						e.target.value = "";
					}
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
			<sc.TitleContainer>
				<sc.Title>
					Data-visualiser
				</sc.Title>
			</sc.TitleContainer>
			<sc.Root>
				<sc.InputSideBar>
					<Selector onSelect={filterActions} data={replay?.actionsByType}/>
					<Checkbox onSelect={setCluster} title={"Use DBSCAN to cluster data"}/>
					<Checkbox onSelect={setShowRose} title={"Show clustered data as rose diagram"} disabled={!cluster}/>
					<Checkbox onSelect={setShowScatterData} title={"Show clustered data"} disabled={!showRose}/>
				</sc.InputSideBar>
				<sc.MapContainer><input
					type="file"
					accept=".json"
					onChange={handleChange}
				/>
				{replay && <Map replay={replay} actions={selectedAction} cluster={cluster} showRose={showRose}
					showScatterData={showScatterData}/>}
				</sc.MapContainer>
			</sc.Root>

		</div>
	);
}

export default App;
