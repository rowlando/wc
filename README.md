# Build Your Own WC Tool

An implementation of the Unix `wc` (word count) utility as part of the [Coding Challenges](https://codingchallenges.fyi/challenges/challenge-wc/) project.

## Features

- Counts bytes using Node.js's `stats.size`
- Counts lines, words, and characters in text files
- Supports command-line interface
- Fully tested implementation

## Technical Stack

- **Runtime**: Node.js
- **Testing**: Node.js built-in test runner
- **File Operations**: Node.js fs module

## Implementation Details

### Core Functionality
The main `wc` function is exported as a module to enable testing and reuse. It supports the following operations:
- `-c`: Count bytes
- `-l`: Count lines
- `-w`: Count words
- `-m`: Count characters

### CLI Implementation
The command-line interface is implemented using:
- Shebang (`#!/usr/bin/env node`) for Unix-like systems
- Proper executable permissions
- Command-line argument parsing

## Development

### Prerequisites
- Node.js (latest LTS recommended)

### Testing
```bash
node --test
```

### Running
```bash
./ccwc [option] [file]
```

### Project structure
```
.
├── ccwc.js        # Core implementation
├── ccwc.test.js   # Test file
├── test.txt       # Text file to validate solution
└── README.md
```
