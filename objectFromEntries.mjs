import log from './log.mjs';

// returns object assembled from output of 'Object.entries' because 'Object.fromEntries is not widely supported'

export default entries => {
	const obj = {};
	for (const entry of entries) {
		obj[entry[0]] = entry[1];
	}
	return obj;
}
