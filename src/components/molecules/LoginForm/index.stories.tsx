import { userEvent, within } from "@storybook/testing-library"

import { LoginForm } from "./index"

import type { ComponentStoryObj, Meta } from "@storybook/react"
import type { ComponentProps } from "react"

type LoginFormType = typeof LoginForm
type LoginFormStory = ComponentStoryObj<LoginFormType>

const meta: Meta<ComponentProps<LoginFormType>> = {
  component: LoginForm,
}
export default meta

export const Default: LoginFormStory = {}

export const InputValidId: LoginFormStory = {
  play: async ({ canvasElement }) => {
    const screen = within(canvasElement)
    await userEvent.type(screen.getByText("id:"), "test1", { delay: 100 })
  },
}

export const InputInvalidId: LoginFormStory = {
  play: async ({ canvasElement }) => {
    const screen = within(canvasElement)
    await userEvent.type(screen.getByText("id:"), "test2", { delay: 100 })
  },
}

export const InputValidPassword: LoginFormStory = {
  play: async ({ canvasElement }) => {
    const screen = within(canvasElement)
    await userEvent.type(screen.getByText("password:"), "test1", { delay: 100 })
  },
}

export const InputInvalidPassword: LoginFormStory = {
  play: async ({ canvasElement }) => {
    const screen = within(canvasElement)
    await userEvent.type(screen.getByText("password:"), "test2", { delay: 100 })
  },
}

export const InputValid: LoginFormStory = {
  play: async (context) => {
    await InputValidId.play?.(context)
    await InputValidPassword.play?.(context)
  },
}

export const InputInvalid: LoginFormStory = {
  play: async (context) => {
    await InputInvalidId.play?.(context)
    await InputInvalidPassword.play?.(context)
  },
}

export const LoginSuccess: LoginFormStory = {
  play: async (context) => {
    const { canvasElement } = context
    const screen = within(canvasElement)
    await InputValid.play?.(context)
    // eslint-disable-next-line @typescript-eslint/await-thenable, @typescript-eslint/no-confusing-void-expression
    await userEvent.click(screen.getByText("submit"))
  },
}

export const LoginFailure: LoginFormStory = {
  play: async (context) => {
    const { canvasElement } = context
    const screen = within(canvasElement)
    await InputInvalid.play?.(context)
    // eslint-disable-next-line @typescript-eslint/await-thenable, @typescript-eslint/no-confusing-void-expression
    await userEvent.click(screen.getByText("submit"))
  },
}
