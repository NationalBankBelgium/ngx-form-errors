/**
 * Load karma config from Stark
 */
const defaultKarmaCIConfig = require("./node_modules/@nationalbankbelgium/stark-testing/karma.conf.ci.js").rawKarmaConfig;

// start customizing the KarmaCI configuration from stark-testing
const ngxFormErrorsSpecificConfiguration = Object.assign({}, defaultKarmaCIConfig);

// export the configuration function that karma expects and simply return the stark configuration
module.exports = config => {
	return config.set(ngxFormErrorsSpecificConfiguration);
};
