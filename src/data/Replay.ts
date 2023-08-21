export type replay = {
	name: string
	map: map
	actionsByType: actions[]
}

export type actions = {
	title: string;
	actions: action[];
}

export type action = {
	action: string;
	unitId: string;
	unitType: string;
	position: position;
}

export type position = {
	x: number;
	y: number;
}

type map = {
	name: string,
	image: string,
	size: size
}

type size = {
	width: number;
	height: number;
}






