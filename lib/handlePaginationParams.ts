export default function handlePaginationParams(
	params: {
		[key: string]: string | undefined;
	},
	limit = 10
) {
	const after = params.after;
	const before = params.before;
	if (after) {
		return {
			after: after,
			first: limit
		};
	}
	if (before) {
		return {
			before: before,
			last: limit
		};
	}
	return { first: limit };
}
