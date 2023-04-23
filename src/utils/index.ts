import { nanoid } from "nanoid";

export const getId = () => nanoid(10);

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
