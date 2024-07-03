const { defineConfig } = require('cypress');
const fs = require('fs');

module.exports = defineConfig({
	env: {
		grepFilterSpecs: true,
		grepOmitFiltered: true,
	},
	video: true,
	viewportHeight: 920,
	viewportWidth: 1080,
	defaultCommandTimeout: 25000,
	requestTimeout: 65000,
	responseTimeout: 65000,
	pageLoadTimeout: 65000,
	taskTimeout: 90000,
	fixturesFolder: 'cypress/fixtures',
	screenshotsFolder: 'cypress/screenshots',
	videosFolder: 'cypress/videos',
	downloadsFolder: 'cypress/downloads',
	includeShadowDom: true,
	chromeWebSecurity: false,
	reporter: 'cypress-multi-reporters',
	reporterOptions: {
		reporterEnabled: 'mochawesome',
		mochawesomeReporterOptions: {
			reportDir: 'mochawesome-report/reports',
			reportTitle: 'Test Report',
			overwrite: false,
			html: false,
			json: true,
			timestamp: 'mmddyyyy_HHMMss',
		},
	},
	e2e: {
		// We've imported your old cypress plugins here.
		// You may want to clean this up later by importing these.
		setupNodeEvents(on, config) {
			on('after:spec', (spec, results) => {
				if (results && results.video) {
					// Do we have failures for any retry attempts?
					const failures = results.tests.some((test) =>
						test.attempts.some((attempt) => attempt.state === 'failed')
					);
					if (!failures) {
						// delete the video if the spec passed and no tests retried
						fs.unlinkSync(results.video);
					}
				}
			});
		},
		// supportFile: 'cypress/support/index.js',
		specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
		testIsolation: false,
	},
});
