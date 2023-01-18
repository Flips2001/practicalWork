import React from "react";
import * as sc from "./CreateRoseDiagram.sc";
import {position} from "../../data/Replay";
import {size} from "../point/point";


interface CreatRoseDiagramProps {
	cluster: position[]
	mapSize: size
	trueSize: size
}

export const CreatRoseDiagram: React.FunctionComponent<CreatRoseDiagramProps> = ({cluster, mapSize, trueSize}) => {

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

	const center = calcCenter(cluster);

	return (
		<div>
			<></>
			<sc.Point position={center} color={"pink"}/>
		</div>
	);
};

