export type replay = {
	name: string
	map: map
	players: player[]
	actionsByType: actions[]
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

export type position = {
	x: number;
	y: number;
}

type player = {
	id: number;
	name: string;
	startLocation: number;
}

type map = {
	name: string,
	size: size
}

type size = {
	width: number;
	height: number;
}






