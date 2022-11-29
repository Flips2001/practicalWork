import React, {useState} from "react";
import "./App.css";

function App() {

	const [files, setFiles] = useState<any | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files != null && e.target.files.length > 0) {
			const file = e.target.files[0];
			const fileReader = new FileReader();
			fileReader.onloadend = () => {
				const content = fileReader.result;
				if (typeof content === "string") {
					setFiles(JSON.parse(content))
				}
			};
			fileReader.readAsText(file);
		}
	}

	console.log(files)


	return (
		<div className="App">
			<header className="App-header">
				<input
					type="file"
					accept=".json"
					onChange={handleChange}
				/>
			</header>
		</div>
	);
}

export default App;
