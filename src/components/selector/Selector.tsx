import React from "react";
import {Maps} from "../../maps/Maps";
import {Replay} from "../../data/Replay";

interface SelectorProps {
	replay: Replay
}

export const Selector: React.FunctionComponent<SelectorProps> = ({replay}) => {
	return <div>
		<img src={Maps[replay.map.name]} alt={"map"}/>
	</div>;
};
