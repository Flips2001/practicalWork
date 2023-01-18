export type replay = {
	name: string
	map: map
	players: player[]
	actionsByType: actions[]
}

type player = {
	id: number;
	name: string;
	startLocation: number;
}

type size = {
	width: number;
	height: number;
}

type map = {
	name: string,
	size: size
}


export type position = {
	x: number;
	y: number;
}

export type actions = {
	title: string;
	actions: action[];
}


export type action = {
	unitId: string;
	type: string;
	position: position;
}
