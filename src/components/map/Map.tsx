import React from "react";
import {Maps} from "../../maps/Maps";
import {Replay} from "../../data/Replay";

interface MapProps {
	replay: Replay
}


export const Map: React.FunctionComponent<MapProps> = ({replay}) => {
	return <div>
		<img src={Maps[replay.map.name]} alt={"map"}/>
	</div>;
};
