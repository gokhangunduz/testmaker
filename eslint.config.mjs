import { createRequire } from "module";
const require = createRequire(import.meta.url);
const config = require("eslint-config-next/core-web-vitals");
export default config;
