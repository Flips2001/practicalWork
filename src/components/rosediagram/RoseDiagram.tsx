import React from "react";
import {Chart} from "./windrosecomponent/Windrose";


export interface RoseDiagramProps {
	size?: number
}

export const RoseDiagram: React.FunctionComponent<RoseDiagramProps> = ({size}) => {

	const data = {
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
	};

	return (
		<div>
			<Chart
				/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
				// @ts-ignore
				chartData={data.chartData}
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
