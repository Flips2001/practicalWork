import {z} from "zod";

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
    unitId: number;
    unitType?: string;
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

const positionSchema = z.object({
	x: z.number(),
	y: z.number(),
});

const sizeSchema = z.object({
	width: z.number(),
	height: z.number(),
});

const mapSchema = z.object({
	name: z.string(),
	image: z.string(),
	size: sizeSchema,
});

const actionSchema = z.object({
	action: z.string(),
	unitId: z.number(),
	unitType: z.optional(z.string()),
	position: positionSchema,
});

const actionsSchema = z.object({
	title: z.string(),
	actions: z.array(actionSchema),
});

const replaySchema = z.object({
	name: z.string(),
	map: mapSchema,
	actionsByType: z.array(actionsSchema),
});

export {replaySchema};





