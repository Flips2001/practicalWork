import React from "react";
import {actionValues} from "../selector/Selector";
import {replay} from "../../data/Replay";
import {CreatedPoint} from "./createdPoint";

interface PointProps {
	action: actionValues
	replay: replay;
	size: {
		width: number,
		height: number
	}
}

export const Point: React.FunctionComponent<PointProps> = ({action, replay, size}) => {
	if (action !== "attacks") {
		return <CreatedPoint actions={replay.actions[action]} size={replay.map.size} trueSize={size}/>;
	} else {
		return <></>;
	}

};
