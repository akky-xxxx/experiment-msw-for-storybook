import { composeStories } from "@storybook/testing-react"
import { render } from "@testing-library/react"

import * as stories from "./index.stories"

const { Default, InputValid, LoginSuccess, LoginFailure } =
  composeStories(stories)

const sleep = (ms = 500) =>
  new Promise((resolve) => {
    const timer = setTimeout(() => {
      clearTimeout(timer)
      resolve(true)
    }, ms)
  })

describe("LoginForm", () => {
  it("Default pattern", () => {
    const mounted = render(<Default />)
    expect(mounted.getByLabelText("id:")).toBeVisible()
    expect(mounted.getByLabelText("password:")).toBeVisible()
  })

  it("InputValid pattern", async () => {
    const mounted = render(<InputValid />)
    await LoginFailure.play({ canvasElement: mounted.container })
    await sleep()
    expect(mounted.getByLabelText("id:")).toHaveDisplayValue(["test2"])
    expect(mounted.getByLabelText("password:")).toHaveDisplayValue(["test2"])
  })

  it("LoginSuccess pattern", async () => {
    const mounted = render(<LoginSuccess />)
    await LoginSuccess.play({ canvasElement: mounted.container })
    await sleep()
    expect(mounted.getByText("logged in")).toBeVisible()
  })

  it("LoginFailure pattern", async () => {
    const mounted = render(<LoginFailure />)
    await LoginFailure.play({ canvasElement: mounted.container })
    await sleep()
    expect(mounted.getByText("has error2")).toBeVisible()
  })
})
