// eslint-disable-next-line import/no-extraneous-dependencies
import { setupServer } from "msw/node"

import { defaultHandlers } from "../handlers"

export const server = setupServer(...defaultHandlers)
