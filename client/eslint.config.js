import { fixupConfigRules } from "@eslint/compat";
import { configs } from 'eslint-plugin-react-hooks'

// eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0
export default [
  ...fixupConfigRules(configs.recommended),
]
