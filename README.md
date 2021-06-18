# ReX Design For OS

**开发中，敬请期待**

[![NPM Package](https://img.shields.io/npm/v/@rexd/core?style=flat-square)](https://www.npmjs.org/package/@rexd/core)

基于 React 的多端自适应组件库

## 开发

安装依赖

```bash
yarn
```

运行示例

```bash
yarn start:story
```

## 测试

```bash
yarn test
```

自定义传参，只运行个别目录

```bash
yarn test src/utils --watch
```

详细命令行参数参考：https://jestjs.io/docs/cli

## 提交代码

提交代码需要编写符合约定的 commit message 规范，格式如下：

```
git commit -m <type>(<scope>): <message>
```

其中 type 允许的类型包括：

- feat: (new feature for the user, not a new feature for build script)
- fix: (bug fix for the user, not a fix to a build script)
- docs: (changes to the documentation)
- style: (formatting, missing semi colons, etc; no production code change)
- refactor: (refactoring production code, eg. renaming a variable)
- test: (adding missing tests, refactoring tests; no production code change)
- chore: (updating grunt tasks etc; no production code change)

其中 scope 表示作用的组件，必须使用 Pascal-Case，例如

- Button
- DatePicker

最后，message 为您此次提交的描述。例如：

```bash
git commit -m feat(DatePicker): add onChange
```

## Pull Request 流程

请参考：[如何优雅地在 github 上贡献代码](https://segmentfault.com/a/1190000000736629)

1. 克隆仓库
2. 创建分支
3. 提交代码
4. 合并修改 `git rebase master`
5. 发起 MR

## 致谢

感谢下述开源项目，部分功能实现参考了这些项目中的代码实现。

- [Alibaba Fusion Design](https://github.com/alibaba-fusion/next)
- [Material UI](https://material-ui.com/)

## License

This project is licensed under the terms of the MIT license.
