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
	cluster?: boolean
	showRose?: boolean
	showScatterData?: boolean
}

export const PlotClusters: React.FunctionComponent<PointProps> = ({actions, cluster, showRose, showScatterData}) => {

	const colors = ["red", "orange", "yellow", "green", "blue", "purple", "pink", "maroon", "olive", "navy", "teal", "gold", "lavender", "crimson"];

	const data = actions?.map((action) => {
		return [action.position.x, action.position.y];
	});

	const dbscan = new DBSCAN();
	const clusters = dbscan.run(data, 50, 6);

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
					if (showRose)
						return <CreatRoseDiagram cluster={cluster} showScatterData={showScatterData}/>;
					else
						return <CreatCluster cluster={cluster} color={colors[index % colors.length]}/>;
				})}
			</div>
		);
	}
	return <CreatCluster cluster={notClusteredData}/>;
};
