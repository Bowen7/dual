const chalk = require('chalk')
const msgPath = process.env.GIT_PARAMS
const msg = require('fs')
  .readFileSync(msgPath, 'utf-8')
  .trim()
const commitRE = /^(feat|fix|docs|style|refactor|test|chore|build): .{1,50}/

if (!commitRE.test(msg)) {
  console.log()
  console.error(
    `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(
      `invalid commit message format.`
    )}\n\n` +
      chalk.red(`  Proper commit message format is required. Examples:\n\n`) +
      `    ${chalk.green(`feat: feature desc`)}\n`
  )
  process.exit(1)
}
