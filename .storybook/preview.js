import { addDecorator } from "@storybook/react"
import { Fragment } from "react"
import { worker } from "../src/modules/msw/worker"

// Node 環境ではなくブラウザ環境にいることをチェック
if (typeof global.process === "undefined") {
  worker.start()
}

export const parameters = {
  actions: { argTypesRegex: "^(?:handle|on)[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: "fullscreen",
}

addDecorator((storyFn) => <Fragment>{storyFn()}</Fragment>)
