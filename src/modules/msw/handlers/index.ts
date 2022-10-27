/* eslint-disable import/no-extraneous-dependencies */
import { StatusCodes } from "http-status-codes"
import { rest } from "msw"
/* eslint-enable import/no-extraneous-dependencies */

import { Common } from "../../../shared/const/common"

import type {
  DefaultRequestMultipartBody,
  MockedRequest,
  RestHandler,
} from "msw"

const request =
  (method: typeof rest.post) =>
  (
    path: string,
    status: number,
    baseURL: string,
    response: Record<string, unknown> | unknown[] | null = {},
  ): RestHandler<MockedRequest<DefaultRequestMultipartBody>> =>
    // eslint-disable-next-line complexity
    method(`${baseURL}${path}`, async (req, res, context) => {
      const requestBody = await req.json<
        Record<"id" | "password", string> | undefined
      >()

      if (!requestBody || !requestBody.id || !requestBody.password) {
        return res(
          context.status(StatusCodes.BAD_REQUEST),
          context.json(response),
        )
      }

      if (requestBody.id !== "test1" || requestBody.password !== "test1") {
        return res(
          context.status(StatusCodes.NOT_FOUND),
          context.json(response),
        )
      }
      return res(context.status(status), context.json(response))
    })

const post = request(rest.post)

export const handlers = {
  postLogin: {
    ok: post("/login", StatusCodes.OK, Common.MswHost, {
      name: "loggedIn-name",
    }),

    badRequest: post("/login", StatusCodes.BAD_REQUEST, Common.MswHost),

    notFound: post("/login", StatusCodes.NOT_FOUND, Common.MswHost),
  },
}

export const defaultHandlers = Object.entries(handlers).map(
  ([, handler]) => handler.ok,
)
