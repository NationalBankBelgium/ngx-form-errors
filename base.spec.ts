"use strict";

/* tslint:disable:no-import-side-effect */
import "core-js/es6";
import "core-js/es7/reflect";
import "core-js/stage/4";

import "zone.js";
import "zone.js/dist/long-stack-trace-zone";
import "zone.js/dist/proxy"; // since zone.js 0.6.15
import "zone.js/dist/sync-test";
import "zone.js/dist/jasmine-patch"; // put here since zone.js 0.6.14
import "zone.js/dist/async-test";
import "zone.js/dist/fake-async-test";
/* tslint:enable */

import { TestBed } from "@angular/core/testing";
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";

TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting(), { teardown: { destroyAfterEach: false } });

// define global environment variable if needed
// global["ENV"] = "development";
// Then we find all the tests.

declare const require: {
	context(
		path: string,
		deep?: boolean,
		filter?: RegExp
	): {
		keys(): string[];
		<T>(id: string): T;
	};
};

const context = require.context("./src", true, /\.spec\.ts$/);
// And load the modules.
context.keys().forEach(context);
