export type Replay = {
	name: string
	map: map
	players: player[]

	actions: {
		created: created[],
		destroyed: destroyed[],
		discovered: discovered[]
		changedOwnership: changedOwnership[]
		morph: morph[]
	}
}

type player = {
	id: number
	name: string
	startLocation: number
}

type map = {
	numOfStartPositions: number
	name: string,
	size: {
		length: number,
		height: number,
	}
}


type position = {
	x: number,
	y: number
}

type created = {
	frameNumber: number,
	playerId: string
	unitId: string,
	unitType: string,
	position: position,
	cdrHash: string,
	regionHash: string
}

type destroyed = {
	unitId: string,
	unitType: string,
	position: position,
}

type discovered = {
	unitId: string,
	unitType: string,
}

type changedOwnership = {
	unitId: string,
}

type morph = {
	unitId: string,
	unitType: string,
	position: position,
}
