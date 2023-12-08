// babel.config.js
module.exports = {
	presets: [
		["@babel/preset-env", { targets: { node: "current" } }], // Compiles ES6 for the current Node version
		"@babel/preset-react",
		"@babel/preset-typescript", // if using TypeScript
	],
};
// babel.config.js
