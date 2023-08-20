import React from "react";
import {Chart} from "./windrosecomponent/Windrose";

type chartData = {
	angle: string,
	"percentOfItems": number
}

export interface RoseDiagramProps {
	size?: number
	data: chartData[]
}

export const RoseDiagram: React.FunctionComponent<RoseDiagramProps> = ({size, data}) => {

	return (
		<div>
			<Chart
				/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
				// @ts-ignore
				chartData={data}
				columns={["angle", "percentOfItems"]}
				height={size}
				width={size}
				responsive
				legendGap={10}
				hideLabel
				hideLegend
				hideCircles
			/>
		</div>
	);
};
