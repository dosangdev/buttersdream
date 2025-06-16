import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // any 허용
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      }, // _로 시작하면 무시
    },
  },
];

export default eslintConfig;
