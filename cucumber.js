// module.exports = {
//   default: "--format-options '{\"snippetInterface\": \"synchronous\"}'"
// };

const common = "--require-module @babel/register";
module.exports = {
  default: `${common} --format summary -r './features/step_definitions' -r './node_modules/.bin/chromedriver'`,
  dry: `${common} --dry-run`,
  progress: `${common} --format progress`
};
