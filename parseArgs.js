function parseArgs(args) {
  let flag = null;
  let filename;

  if (isFlag(args)) {
    flag = args[2];
    filename = args[3];
  } else {
    filename = args[2];
  }

  return { flag, filename };
}

function isFlag(args) {
  return args[2] && args[2].startsWith('-') && args[2].length === 2;
}

module.exports = parseArgs;
