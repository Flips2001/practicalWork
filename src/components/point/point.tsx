import React from "react";
import {action, replay} from "../../data/Replay";
import {CreatedPoint} from "./createdPoint";

interface PointProps {
	action: action[];
	replay: replay;
	size: {
		width: number,
		height: number
	}
}

export const Point: React.FunctionComponent<PointProps> = ({action, replay, size}) => {
	if (true) {
		return <CreatedPoint actions={action} size={replay.map.size} trueSize={size}/>;
	} else {
		return <></>;
	}

};
