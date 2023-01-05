import React from "react";
import * as sc from "./point.sc";
import {created} from "../../data/Replay";

interface CreatedPointPorps {
	actions: created[]
	size: {
		width: number,
		height: number
	}
	trueSize: {
		width: number,
		height: number
	}
}

export const CreatedPoint: React.FunctionComponent<CreatedPointPorps> = ({actions, size, trueSize}) => {

	return (
		<div>
			{actions.map((action) => {
				const position = {
					x: action.position.x / size.width * trueSize.width,
					y: action.position.y / size.height * trueSize.height
				};
				return (
					<sc.Point position={position}/>
				);
			})}
		</div>
	);
};

