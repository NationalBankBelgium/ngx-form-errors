module.exports = {
	extends: ["@commitlint/config-conventional"],

	//See here for the rules definition : https://github.com/marionebl/commitlint/blob/master/docs/reference-rules.md
	rules: {
		"header-max-length": [1, "always", 100],
		"scope-enum": [
			2,
			"always",
			["accessibility", "build", "developer-guide", "docs", "qa", "release", "all", "service", "directive", "demo"]
		],
		"scope-case": [2, "always", "lowerCase"]
	}
};
