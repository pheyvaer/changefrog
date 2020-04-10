# :frog: Changefrog

## Usage

1. Install Changefrog via `npm i -g changefrog`.
2. Execute Changefrog via `changefrog -i major`.
This auto-increment the major version number in the CHANGELOG file.

## Requirements

These are the requirements of the CHANGELOG file
in order for Changefrog to work correctly.

- It contains an unreleased section.
This section can be empty.
- Unreleased is written as "Unreleased". 
- There is at least one compare link at the bottom.
An example is `[0.1.0]: https://github.com/user/repo/compare/v0.0.1...v0.1.0`.

## License

© 2020 [Pieter Heyvaert](https://pieterheyvaert.com), 
[MIT License](https://github.com/pheyvaer/changefrog/blob/master/LICENSE.md)
