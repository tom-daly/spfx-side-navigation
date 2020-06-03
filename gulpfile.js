'use strict';

const build = require('@microsoft/sp-build-web');
build.addSuppression(/filename should end with module.scss$/);
build.addSuppression(/error quotemark: " should be '$/);
build.addSuppression(/error semicolon: Unnecessary semicolon$/);
build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);
require("./spfx-versioning")(build);
build.initialize(require('gulp'));
