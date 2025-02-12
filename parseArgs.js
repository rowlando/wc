function parseArgs(args) {
  // Skip 'node' and script name
  const userArgs = args.slice(2);

  return parseUserArgs(userArgs);
}

function parseUserArgs(userArgs) {
  if (userArgs.length === 0) {
    throw new Error('Missing required filename argument');
  }

  if (isFlag(userArgs)) {
    return parseFlagArgs(userArgs);
  }

  if (userArgs.length > 1) {
    throw new Error('Too many arguments');
  }

  return { flag: null, filename: userArgs[0] };
}

function parseFlagArgs(userArgs) {
  const flag = userArgs[0];
  const filename = userArgs[1];

  if (!filename) {
    throw new Error('Missing required filename after flag');
  }

  if (userArgs.length > 2) {
    throw new Error('Too many arguments');
  }

  return { flag, filename };
}

function isFlag(args) {
  return args[0] && args[0].startsWith('-') && args[0].length === 2;
}

module.exports = parseArgs;
