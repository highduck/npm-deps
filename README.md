# npm-deps

C++ modules via NPM

## Release Flow

- regular updates should be done via `changeset` command and pushing to master, or PR to master, then Ver
- micro fixes could be made faster with manual steps `changeset version` and push changes to master for auto-check and publishing

### TODO

- replace `lzma-native` to make initial install faster
- cleanup task for packages
- add support for scoped packages names mapping to cmake namespaces
- ci only packages changed since previous release, or unreleased
- rename repo
- upgrade flow for git packages
