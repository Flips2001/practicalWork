import React from "react";
import {Maps} from "../../maps/Maps";
import {action, replay} from "../../data/Replay";
import {PlotClusters} from "../point/point";
import * as sc from "./Map.sc";

interface MapProps {
	replay: replay
	actions?: action[]
	cluster?: boolean
}


export const Map: React.FunctionComponent<MapProps> = ({replay, actions, cluster}) => {
	const img = new Image();
	img.src = Maps[replay.map.name];
	const size = {height: img.height, width: img.width};

	return (
		<sc.Root>
			{actions && <PlotClusters actions={actions} mapSize={replay.map.size} size={size} cluster={cluster}/>}
			<img src={Maps[replay.map.name]} alt={"map"}/>
		</sc.Root>
	);
};
