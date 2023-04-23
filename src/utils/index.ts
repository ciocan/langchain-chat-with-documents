import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("1234567890abcdef", 10);

export const getId = () => nanoid(10);

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
