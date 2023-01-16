import React from "react";
import {Maps} from "../../maps/Maps";
import {action, replay} from "../../data/Replay";
import {Point} from "../point/point";
import * as sc from "./Map.sc";

interface MapProps {
	replay: replay
	action?: action[]
}


export const Map: React.FunctionComponent<MapProps> = ({replay, action}) => {
	const img = new Image();
	img.src = Maps[replay.map.name];
	const size = {height: img.height, width: img.width};

	return (
		<sc.Root>
			{action && <Point action={action} replay={replay} size={size}/>}
			<img src={Maps[replay.map.name]} alt={"map"}/>
		</sc.Root>
	);
};
