import { pathsToModuleNameMapper, GlobalConfigTsJest } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";

const tsJestConfig: GlobalConfigTsJest = {
  "ts-jest": {
    tsconfig: "tsconfig.json",
    compiler: "typescript",
  },
};

const jestSetting = {
  setupFiles: ["<rootDir>/.jest/setupEnv.js"],
  globals: tsJestConfig,
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
  roots: ["<rootDir>"],
  modulePaths: ["<rootDir"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  moduleDirectories: ["node_modules", "src"],
  modulePathIgnorePatterns: ["dist"],
  testRegex: "\\.spec|\\.test\\.ts$",
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
};

export default jestSetting;
