import React from "react";
import {action} from "../../data/Replay";
import {CreatCluster} from "./createCluster";
import {DBSCAN} from "density-clustering";
import {CreatRoseDiagram} from "../rosediagram/CreateRoseDiagram";

export type size = {
	width: number,
	height: number
}

interface PointProps {
	actions: action[];
	mapSize: size
	size: size;
	cluster?: boolean
}

export const PlotClusters: React.FunctionComponent<PointProps> = ({mapSize, actions, size, cluster,}) => {

	const colors = ["red", "orange", "yellow", "green", "blue", "purple", "pink", "maroon", "olive", "navy", "teal", "gold", "lavender", "crimson"];

	const data = actions?.map((action) => {
		return [action.position.x, action.position.y];
	});

	const dbscan = new DBSCAN();
	const clusters = dbscan.run(data, 50, 5);

	const clusterData = clusters.map((cluster) => {
		return cluster.map((index) => {
			return actions[index].position;
		});
	});

	const notClusteredData = actions?.map((aciton) => {
		return aciton.position;
	});


	if (cluster) {
		return (
			<div>
				{clusterData.map((cluster, index) => {
					return (<><CreatRoseDiagram cluster={cluster} mapSize={mapSize} trueSize={size}/>
						<CreatCluster cluster={cluster} mapSize={mapSize} trueSize={size} color={colors[index]}/></>);

				})}
			</div>
		);
	}

	return <CreatCluster cluster={notClusteredData} mapSize={mapSize} trueSize={size}/>;

};
