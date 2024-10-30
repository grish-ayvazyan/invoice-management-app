<h1 align="center">Invoice Management App</h1>

## Get Started

### Installation

We use `pnpm` as a package manager: [pnpm](https://pnpm.io/)

```sh
# Install all dependencies
pnpm install
```

#### Commands

```sh
// Run development
pnpm dev
```

#### Building

```sh
// Build
pnpm build
```

#### Lint and Prettier

```sh
pnpm lint
pnpm lint:fix
pmpm prettier
```

## Conventions and Best Practices

-   [Introduction](#introduction)
-   [Commits and commit messages](#commits-and-commit-messages)
-   [Code Quality](#code-quality)
-   [Code Formatting](#code-formatting)
-   [Linting](#linting)
-   [Code Reviews](#code-reviews)
-   [Never push directly to master](#never-push-directly-to-master)

### Introduction

This document contains various conventions and best practices that we strive to adhere.

### Commits and commit messages

#### Conventional Commits

-   Commit messages should be stylistically consistent and follow
    [Conventional Commits](https://www.conventionalcommits.org) specification. We have enabled pre-hook which check
    commit, if it suits conventional commit styles.

### Code Quality

#### Code formatting

-   We use [prettier](https://prettier.io).
-   To make it really convenient and seamless we recommended installing `prettier` as your code editor plugin and set up
    in your IDE settings.
-   We are running `eslint | prettier` with scripts mentioned above

### Linting

We use `eslint` to keep our source code clean.

-   We have enabled pre-hook which check commit, if it suits eslint styles.

### Code Reviews

We are working with Trunk Based Development, which means that we are merging to master frequently. This means that we
need to be extra careful with the code that we are merging. We are using GitHub PRs for code reviews.

#### Never push directly to master

All feature work must happen on it's own fork or a branch. No direct commits on the version (eg. `0.1`) or master
branches are allowed.
