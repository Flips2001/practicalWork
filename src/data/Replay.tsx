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

export type Replay = {
	name: string
	map: map
	players: player[]

}
