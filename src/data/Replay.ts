export type replay = {
	name: string
	map: map
	players: player[]
	possibleActions: string[]
	actions: actions
}

export type actions = {
	created: created[],
	destroyed: destroyed[],
	morphs: morph[]
	attacks: IsAttacked[]
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
	numOfStartPositions: number
	name: string,
	size: size
}


type position = {
	x: number;
	y: number;
}

export type created = {
	unitId: string;
	unitType: string;
	position: position;
}

export type destroyed = {
	unitId: string;
	unitType: string;
	position: position;
}

export type morph = {
	unitId: string;
	unitType: string;
	position: position;
}

export type IsAttacked = {
	unitId: string;
	attackType: string
	position: position;
}
