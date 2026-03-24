# addon-visual-coder

## 日本語

Minecraft アドオンを視覚的に制作するための、Blockly / React / TypeScript ベースのビジュアルエディタです。

### 主な機能

- Blockly ベースのビジュアルスクリプト編集
- React + Vite による開発環境
- アドオン生成を前提にしたエクスポートワークフロー

### 開発

```bash
npm install
npm run dev
```

Vite の開発サーバーは `3000` 番ポートで動作します。

### ビルド

```bash
npm run build
npm run preview
```

### ディレクトリ構成

- `src/pages/`: ページ単位の画面
- `src/components/`: 再利用可能な UI コンポーネント
- `src/hooks/`: Blockly、ダウンロード、プロジェクト管理向けのカスタムフック
- `src/blocks/`: Blockly ブロック定義とローカライズ
- `src/utils/`, `src/types/`, `src/constants/`: 共通処理、型、定数
- `public/`: `toolbox.xml` を含む静的アセット

### 利用について

このプロジェクトは自由に利用、改変して構いません。  
ただし、再配布は許可していません。配布や公開を伴う利用をしたい場合は、事前に作者へ連絡してください。  
また、どのような用途や形で活用されているかを知りたいため、利用時にも作者へ連絡をもらえると助かります。

イベントで使用する場合は、引用元を明記してください。

例:

```text
使用ツール: addon-visual-coder
作者: BakurikuJP
リポジトリ: https://github.com/BakurikuJP/addon-visual-coder
```

## English

This is a visual editor for building Minecraft add-ons with Blockly, React, and TypeScript.

### Features

- Blockly-based visual scripting
- React + Vite development environment
- Export-oriented workflow for add-on generation

### Development

```bash
npm install
npm run dev
```

The Vite dev server runs on port `3000`.

### Build

```bash
npm run build
npm run preview
```

### Project Structure

- `src/pages/`: route-level screens
- `src/components/`: reusable UI components
- `src/hooks/`: custom hooks for Blockly, downloads, and project management
- `src/blocks/`: Blockly block definitions and localization
- `src/utils/`, `src/types/`, `src/constants/`: shared utilities, types, and static data
- `public/`: static assets including `toolbox.xml`

### Usage

You are free to use and modify this project.  
However, redistribution is not permitted. If you want to distribute or publicly republish it, please contact the author in advance.  
I would also appreciate it if you contact the author when you use it, because I want to know how and where it is being used.

If you use this project in an event, please clearly provide attribution to the original source.

Example:

```text
Tool used: addon-visual-coder
Author: BakurikuJP
Repository: https://github.com/BakurikuJP/addon-visual-coder
```

## License

See [LICENSE](./LICENSE).
