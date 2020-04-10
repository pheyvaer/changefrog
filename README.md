# :frog: Changefrog

We regularly have to update [changelogs](https://keepachangelog.com/en/1.0.0/).
One of these moments is when releasing a new version.
We have to add a new version number, 
add the date, and 
provide a link.
And we easily make mistakes.
Which we only notice _after_ the release. :cry:
Solution: Changefrog!

Changefrog is a tool that automatically updates a changelog.
It adds a new version based on the unreleased section.

## Usage

1. Install Changefrog via `npm i -g changefrog`.
2. Execute Changefrog via `changefrog -i major`.
This auto-increment the major version number in the CHANGELOG file.
3. Get more usage information via `changefrog -h`.

## Requirements

The requirements of a CHANGELOG file
in order for Changefrog to work are

- It contains an unreleased section.
This section can be empty.
- Unreleased is written as "Unreleased". 
- At least one compare link is at the bottom.
An example is `[0.1.0]: https://github.com/user/repo/compare/v0.0.1...v0.1.0`.

Find an example [here](test/01/input.md).

## License

© 2020 [Pieter Heyvaert](https://pieterheyvaert.com), 
[MIT License](https://github.com/pheyvaer/changefrog/blob/master/LICENSE.md)
