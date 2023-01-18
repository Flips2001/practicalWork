import React from "react";
import * as sc from "./point.sc";
import {position} from "../../data/Replay";
import {size} from "./point";

interface CreatClusterProps {
	cluster: position[]
	color?: string
	mapSize: size
	trueSize: size
}

export const CreatCluster: React.FunctionComponent<CreatClusterProps> = ({cluster, mapSize, trueSize, color}) => {
	
	return (
		<div>
			{cluster.map((point) => {
				const position = {
					x: point.x / mapSize.width * trueSize.width,
					y: point.y / mapSize.height * trueSize.height
				};
				return (
					<sc.Point position={position} color={color}/>
				);
			})}
		</div>
	);
};

