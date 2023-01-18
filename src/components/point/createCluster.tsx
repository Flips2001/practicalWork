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

export const CreatCluster: React.FunctionComponent<CreatClusterProps> = ({cluster, color}) => {

	return (
		<div>
			{cluster.map((point) => {
				return (
					<sc.Point position={point} color={color}/>
				);
			})}
		</div>
	);
};

