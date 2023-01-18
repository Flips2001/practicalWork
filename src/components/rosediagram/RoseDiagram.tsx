import React from "react";
import {Chart} from "./windrosecomponent/Windrose";
import {DBSCAN} from "density-clustering";


/*const data = {
	chartData: [
		{
			angle: "Top",
			"deaths": 0.6,
		},
		{
			angle: "Left",
			"deaths": 0.6,
		},
		{
			angle: "Bot",
			"deaths": 0.5,
		},
		{
			angle: "Right",
			"deaths": 0.9,
		},

	],
	columns: ["angle", "deaths"],
};*/

export interface RoseDiagramProps {
	size?: number
}

export const RoseDiagram: React.FunctionComponent<RoseDiagramProps> = ({size}) => {

	const dataset = [
		[0, 0], [6, 0], [-1, 0], [0, 1], [0, -1],
		[45, 45], [45.1, 45.2], [45.1, 45.3], [45.8, 45.5], [45.2, 45.3],
		[50, 50], [56, 50], [50, 52], [50, 55], [50, 51]
	];

	const dbscan = new DBSCAN();
	// console.log(dbscan);
	const clusters = dbscan.run(dataset, 6, 2);

	// console.log("clusters", clusters);

	const data = clusters.map((cluster, i) => {
		return {
			angle: `Cluster ${i}`,
			"deaths": cluster.length / dataset.length,
		};
	});

	// console.log("data", data);

	return (
		<div>
			<Chart
				/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
				// @ts-ignore
				chartData={data}
				columns={["angle", "deaths"]}
				height={size}
				width={size}
				responsive
				legendGap={10}
				hideLabel
				hideLegend
			/>
		</div>
	);
};
