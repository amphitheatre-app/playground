<div align="center">

# Amphitheatre Playground

[![License](https://img.shields.io/github/license/amphitheatre-app/playground)](https://github.com/amphitheatre-app/playground/blob/master/LICENSE)
[![GitHub
contributors](https://img.shields.io/github/contributors/amphitheatre-app/playground)](https://github.com/amphitheatre-app/playground/graphs/contributors)
[![GitHub
issues](https://img.shields.io/github/issues/amphitheatre-app/playground)](https://github.com/amphitheatre-app/playground/issues)

[项目介绍](#它能做什么) •
[架构](#架构) •
[使用方法](#使用方法) •
[开发](#本地开发) •
[贡献](#贡献) •
[English](README.md)

</div>

## 它能做什么？

嵌入在网页中的代码运行器，支持多种编程语言。你可以在[这里](https://play.amphitheatre.app)查看演示并了解更多关于功能的信息。

它具有以下功能：

- 一个美观、不显眼的编辑器，具有语法高亮显示功能。
- 支持多种编程语言，包括其构建工具。
- 能够快速加载预定义代码的预览，该代码来自 `GitHub` 项目或 `Gist`。
- 在组件本身中查看控制台输出。


## 架构

一个 `React` 前端与一个 [Axum 后端](https://github.com/amphitheatre-app/playground-api)进行通信。使用 `Docker`
容器提供各种编译器和工具，并帮助隔离它们。

![Playground Architecture](./docs/images/architecture.jpg)

## 使用方法

> 有以下两种使用方式融合到你的网站中：

### 作为 `React` 组件

如果你使用的是 React，那么你可以直接在你的项目中添加
[playground-react](https://github.com/amphitheatre-app/playground-react) 组件。
在你的项目中，就像下面这样简单：

```shell
npm install --save @amphitheatre/playground-react
```

```javascript
import Playground from '@amphitheatre/playground-react'

export default function App() {
  return <Playground style={{ width: 800, height: 500 }} />
}
```

### 作为 `iframe`

如果不使用 React，请先私下部署项目和后端服务器，然后将 Playground 包含在一个
`iframe` 中。

```html
<iframe
  width="880"
  height="425"
  frameborder="0"
  src="//playground.your-domain.com/?gist=6b8b99c93be318f254606a92955294ec"
></iframe>
```

#### 参数

接受以下属性或者参数

| 标题 | 描述  | 默认值 |
| ---------------- | ------------------------------------------------------------ | ---------------------- |
| **`title`**      | 编辑器面板的可选标题。                     | `''`                   |
| **`files`**      | `{ [filename]: code }` 的映射。如果给出了此参数，它将优先于 `code`。 | `undefined`            |
| **`entry`**      | 首先运行的文件的文件名。此参数仅在用 `files` 参数显示多个文件时相关。 | `''`                   |
| **`initialTab`** | 默认显示的标签的文件名。此参数仅在用 `files` 参数显示多个文件时相关。默认为 `entry` 的值。| `entry`                |
| **`styles`**     | 应用到各个元素的行内样式对象，用于自定义UI的样式。示例：`{ header: { backgroundColor: 'red' } }` | `{}`                   |
| **`fullscreen`** | 显示一个按钮以启用全屏编辑（在大多数配置的 `pane` 中）。注意，`iframe` 必须具有 `allowfullscreen` 属性才能实现此目标。 | `false`                |
| **`panes`**      | 要显示的 `UI pane` 数组。要显示不带选项的 `pane`，使用字符串。否则，使用具有type属性的对象。可用的 `pane` 有：`'stack'`, `'editor'`, `'player'`, `'console'`。注意，必须有一个player pane才能运行任何代码。有关pane选项，请参见下文。 | `['editor', 'player']` |

## 本地开发

要在本地运行，请执行以下操作：

- `yarn` 安装依赖包
- `yarn build` 编译应用程序并将其放置在 `build/` 目录中
- `yarn start` 从 `build/` 目录中服务并打开浏览器页面。


在开发过程中，为了实现快速的编辑刷新循环，请运行 `yarn dev`。这将启动
一个 `HTTP` 服务器，并在 `TypeScript`、`HTML` 和 `CSS` 文件发生变化时自动重新编译它们。

## 使用 `Docker-compose` 进行本地开发

- 确保 [docker](https://docs.docker.com/get-docker/) 已安装。
- Clone 或者 fork 此仓库。
- 启动服务器 `docker-compose up`，如果希望在后台运行，将 `-d` 添加到
  `docker-compose up` 命令后面。

> 第一次启动会花费一些时间下载依赖项。这些依赖项只下载一次，然后进行缓存。

## 使用 `Amphitheatre` 进行开发

与 [Amphitheatre 的其他示例](https://docs.amphitheatre.app/examples/)一样，在[安装服务器和CLI软件](https://docs.amphitheatre.app/installation/)以及[配置证书和首选项](https://docs.amphitheatre.app/getting-started/initialize/)后，执行以下命令

```bash
amp run
```

## 贡献

如果感觉有任何不对劲，或者觉得某些功能缺失，请查看[贡献页面](https://docs.amphitheatre.app/contributing/)。在那里，您将找到分享反馈、在本地构建工具以及向项目提交拉取请求的说明。

**此项目基于 Amphitheatre 开发的 Web3 开源通用游乐场产品，旨在帮助开发者更好地学习 Web3 开发，由 [Amphitheatre](https://amphitheatre.app/) 和
[OpenBuild](https://openbuild.xyz) 共同赞助。**

**我们将一些开发任务作为任务主题并标记为“任务”，感兴趣的合作伙伴可以在相应的主题中评估开发时间，我们将从他们中选择最合适的开发者并将任务分配给他，任务完成并成功合并 PR 后，我们将给予奖励。**

更多信息，请参考[如何贡献](https://github.com/amphitheatre-app/playground/blob/master/docs/how_to_contribute.zh-CN.md)和[贡献奖励公告](https://github.com/amphitheatre-app/playground/issues/4)。

## 贡献者

<!-- readme: collaborators,contributors,zouyuxuan -start -->
<table>
	<tbody>
		<tr>
            <td align="center">
                <a href="https://github.com/lispking">
                    <img src="https://avatars.githubusercontent.com/u/4446580?v=4" width="100;" alt="lispking"/>
                    <br />
                    <sub><b>King</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/jueduizone">
                    <img src="https://avatars.githubusercontent.com/u/16284115?v=4" width="100;" alt="jueduizone"/>
                    <br />
                    <sub><b>IanXu</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/GrayJyy">
                    <img src="https://avatars.githubusercontent.com/u/122503129?v=4" width="100;" alt="GrayJyy"/>
                    <br />
                    <sub><b>GrayJiang</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/wangeguo">
                    <img src="https://avatars.githubusercontent.com/u/146697?v=4" width="100;" alt="wangeguo"/>
                    <br />
                    <sub><b>Eguo Wang</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/onlyheartt9">
                    <img src="https://avatars.githubusercontent.com/u/49861142?v=4" width="100;" alt="onlyheartt9"/>
                    <br />
                    <sub><b>Challenger</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/KazooTTT">
                    <img src="https://avatars.githubusercontent.com/u/31075337?v=4" width="100;" alt="KazooTTT"/>
                    <br />
                    <sub><b>KazooTTT</b></sub>
                </a>
            </td>
		</tr>
		<tr>
            <td align="center">
                <a href="https://github.com/dethan3">
                    <img src="https://avatars.githubusercontent.com/u/33822639?v=4" width="100;" alt="dethan3"/>
                    <br />
                    <sub><b>DEthan3</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/peewee92">
                    <img src="https://avatars.githubusercontent.com/u/20059253?v=4" width="100;" alt="peewee92"/>
                    <br />
                    <sub><b>Null</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/zouyuxuan">
                    <img src="https://avatars.githubusercontent.com/u/33485252?v=4" width="100;" alt="zouyuxuan"/>
                    <br />
                    <sub><b>Null</b></sub>
                </a>
            </td>
		</tr>
	<tbody>
</table>
<!-- readme: collaborators,contributors,zouyuxuan -end -->

## License

Copyright (c) The Amphitheatre Authors. All rights reserved.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at

      https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed
under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
CONDITIONS OF ANY KIND, either express or implied. See the License for the
specific language governing permissions and limitations under the License.
