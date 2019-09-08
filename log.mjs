export default (...args) => {
	for (const argument of args) {
		console.log(typeof argument === 'object' ? JSON.stringify(argument, null, 2) : argument);
	}
	return args.length > 1 ? args : args[0];
};
