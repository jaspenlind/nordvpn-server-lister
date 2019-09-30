"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cli_1 = tslib_1.__importDefault(require("../cli"));
(async () => {
    const args = process.argv;
    await cli_1.default.run(args);
})();
//# sourceMappingURL=nordservers.js.map