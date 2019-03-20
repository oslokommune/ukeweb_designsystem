# Work Flow For Internal Contributors

## Working on the Styleguide with git flow and Jira

Clone styleguide_devtools and follow the instructions there to get a gui with hot reloading.

- Git: Clone this repository and run

```shell
git flow init -d
git checkout develop
```

- Jira: Make a Jira issue in Oslo kommune's Jira instance describing the task, or pick one that is assigned to you.
- Jira: Move the issue to "in progress".
- Git: on develop branch run

```shell
git flow feature start [name-of-jira-issue]
```

- Git: do changes and make commits. Remember to update the changelog when it is needed.
- Git: when you are ready for a code review run

```shell
git flow feature publish [name-of-jira-issue]
```

- Github: Find your feature branch and make a pull request towards the develop branch
- Jira: Move your issue from "in progress" to "code review"

Someone from the team will look over and either make change requests or accept the pull request. If you get change request, make changes, commit and push.
Webforvaltningen does not use Github for merging PRs so when you get an email from Github that your PR is closed run

```shell
git checkout develop
git pull
git checkout feature/[name-of-jira-issue]
git merge develop
git flow feature finish [name-of-jira-issue]
git push
```

The four first steps ensures that the branch is able to merge back into the develop branch. The two last step merges the branch into develop and deletes your branch locally and remotely, checks out develop and then pushes the local develop branch changes to the remote one.
ps: If you get merge conflicts after merging your branch with develop, fix these before finishing.

- Jira: the issue should now have the status "code review finished", and you can now move it to "test" and then "test ok" (because we do not currently have a test environment for the style guide).

## Releasing

### Starting

Pull develop branch, check that it is compiling by running the styleguide_devtools. Use git flow to start the release procedure in git

```shell
git flow release start [release-number]
```

### Changelog

To update the [changelog](docs/changelog.md), copy the placeholder title (unreleased) and the headings (fixed, added, changed, and removed) and paste it above the original placeholder title. Change the original placeholder title so that it contains the release number followed by todays date.

The changelog is automatically merged, so duplicate headings may occur. Group events that belong under the same heading, and delete the superfluous headings.

### Versioning

Remember to update package.json with version number on release.

### Finishing

Commit changes to changelog, composer and package and run

```shell
git flow release finish
```

### Docs

- [Article explaining GitFlow](https://jeffkreeftmeijer.com/git-flow/)
- [GitFlow on GitHub](https://github.com/nvie/gitflow)
- [Changelog](docs/changelog.md)
- [Best practices](docs/bestPractises)
