import React from "react";
import {action, replay} from "../../data/Replay";
import {PlotClusters} from "../point/point";
import * as sc from "./Map.sc";

interface MapProps {
	replay: replay
	actions?: action[]
	cluster?: boolean
	showRose?: boolean
	showScatterData?: boolean
}


export const Map: React.FunctionComponent<MapProps> = ({replay, actions, cluster, showRose, showScatterData}) => {
	const img = new Image();
	img.src = replay.map.image;

	const newActions = actions?.reduce((acc: action[], action) => {
		const newAction = {
			...action,
			position: {
				x: action.position.x / replay.map.size.width * img.width,
				y: action.position.y / replay.map.size.height * img.height,
			}
		};

		return [...acc, newAction];
	}, []);

	return (
		<sc.Root>
			{newActions &&
          <PlotClusters actions={newActions} cluster={cluster} showRose={showRose} showScatterData={showScatterData}/>}
			<img src={replay.map.image} alt={"map"}/>
		</sc.Root>
	);
};
