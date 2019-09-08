import objectFromEntries from './objectFromEntries.mjs';
import log from './log.mjs';

// iterate over objects and replace properties.

export default (object, modifier) => {
	const entries = Object.entries(object);
	for (const entryIndex in entries) {
		const entry = entries[entryIndex];
		entry[1] = modifier(entry[1], entry[0], object);
	}
	return objectFromEntries(entries);
};
