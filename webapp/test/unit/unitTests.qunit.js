/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"no/mil/ztravel/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
