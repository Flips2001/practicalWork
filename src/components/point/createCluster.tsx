import React from "react";
import * as sc from "./point.sc";
import {position} from "../../data/Replay";

interface CreatClusterProps {
	cluster: position[]
	color?: string
}

export const CreatCluster: React.FunctionComponent<CreatClusterProps> = ({cluster, color}) => {

	return (
		<div>
			{cluster.map((point) => {
				return (
					<sc.Point position={point} color={color} key={point.x / point.y}/>
				);
			})}
		</div>
	);
};

