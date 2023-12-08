// jest.config.js
module.exports = {
	clearMocks: true,

	// The directory where Jest should output its coverage files
	coverageDirectory: "coverage",
	transform: {
		"^.+\\.js$": "babel-jest", // Transform JS files
		"^.+\\.tsx?$": "ts-jest",
	},
	testEnvironment: "jsdom",
	setupFilesAfterEnv: ["./jest.setup.js"],
	transformIgnorePatterns: ["node_modules/(?!(.*?)/)"],
};
