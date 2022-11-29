import React, {useState} from "react";
import "./App.css";
import {Replay} from "./data/Replay";
import {Map} from "./components/map/Map";

function App() {

	const [replay, setReplay] = useState<Replay | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files != null && e.target.files.length > 0) {
			const file = e.target.files[0];
			const fileReader = new FileReader();
			fileReader.onloadend = () => {
				const content = fileReader.result;
				if (typeof content === "string") {
					setReplay(JSON.parse(content));
				}
			};
			fileReader.readAsText(file);
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
				{replay && <Map replay={replay}/>}
			</header>
		</div>
	);
}

export default App;
