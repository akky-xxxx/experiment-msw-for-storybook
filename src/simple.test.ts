import axios, { AxiosError } from "axios"

import { handlers } from "./modules/msw/handlers"
import { server } from "./modules/msw/server"
import { Common } from "./shared/const/common"

describe("experiment for only fetch", () => {
  it("200", async () => {
    server.use(handlers.postLogin.ok)
    const { data, status } = await axios.post<unknown>(
      `${Common.MswHost}/login`,
      {
        id: "test1",
        password: "test1",
      },
    )
    expect(status).toBe(200)
    expect(data).toStrictEqual({
      name: "loggedIn-name",
    })
  })

  it("400", async () => {
    server.use(handlers.postLogin.ok)
    try {
      await axios.post<unknown>(`${Common.MswHost}/login`, {})
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(error.response?.status).toBe(400)
      }
    }
  })

  it("404", async () => {
    server.use(handlers.postLogin.ok)
    try {
      await axios.post<unknown>(`${Common.MswHost}/login`, {
        id: "test2",
        password: "test2",
      })
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(error.response?.status).toBe(404)
      }
    }
  })
})
