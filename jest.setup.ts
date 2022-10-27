import { server } from "./src/modules/msw/server"
import { cleanup } from "@testing-library/react"

beforeAll(() => {
  server.listen()
})

afterEach(() => {
  cleanup()
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})
