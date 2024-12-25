export default function handlePaginationParams(params: {
	[key: string]: string | undefined;
}) {
	const after = params.after;
	const before = params.before;
	if (after) {
		return {
			after: after,
			first: 1
		};
	}
	if (before) {
		return {
			before: before,
			last: 1
		};
	}
	return { first: 1 };
}
