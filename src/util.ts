export function enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
	return Object.values(obj).filter((k) => Number.isNaN(+k)) as K[];
}
