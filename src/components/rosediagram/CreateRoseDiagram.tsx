import React from "react";
import * as sc from "./CreateRoseDiagram.sc";
import {position} from "../../data/Replay";
import {RoseDiagram} from "./RoseDiagram";
import {CreatCluster} from "../point/createCluster";


interface CreatRoseDiagramProps {
	cluster: position[]
	showScatterData?: boolean
	color?: string;
}

export const CreatRoseDiagram: React.FunctionComponent<CreatRoseDiagramProps> = ({cluster, showScatterData, color}) => {

	const calcCenter = (data: position[]) => {

		const center = data.reduce((acc, point) => {
			acc.x += point.x;
			acc.y += point.y;
			return acc;
		}, {x: 0, y: 0});

		center.x /= data.length;
		center.y /= data.length;

		return center;
	};

	const separateByRadialPosition = (data: position[], center: position, numBulks: number) => {
		const bulks: position[][] = Array.from({length: numBulks}, () => []);
		data.forEach(point => {
			const dx = point.x - center.x;
			const dy = point.y - center.y;
			const angle = Math.atan2(dy, dx);
			const bulkIndex = Math.floor((angle + Math.PI) / (2 * Math.PI) * numBulks);
			bulks[bulkIndex].push(point);
		});
		return bulks;
	};

	const colors = ["red", "orange", "yellow", "green", "blue", "purple", "pink", "maroon", "olive", "navy", "teal", "gold", "lavender", "crimson"];

	const center = calcCenter(cluster);
	const bulks = separateByRadialPosition(cluster, center, 6).reverse();

	const data = bulks.map((bulk, index) => {
		return {
			angle: index.toString(),
			"percentOfItems": (bulk.length / cluster.length) * 2
		};
	});

	return (
		<>
			{showScatterData && bulks.map((cluster, index) => {
				return <CreatCluster cluster={cluster} color={colors[index]} key={index}/>;
			})}
			<sc.Root position={center}>
				<RoseDiagram data={data} size={300} color={color}/>
			</sc.Root>
		</>
	);
};

