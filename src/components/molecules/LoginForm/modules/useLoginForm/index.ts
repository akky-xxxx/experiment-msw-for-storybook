import axios, { AxiosError, HttpStatusCode } from "axios"
import { useState } from "react"

import { Common } from "../../../../../shared/const/common"

import type { ChangeEventHandler, FormEventHandler } from "react"

export const useLoginForm = () => {
  const [idValue, setIdValue] = useState("")
  const [passwordValue, setPasswordValue] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleChangeId: ChangeEventHandler<HTMLInputElement> = (event) => {
    setIdValue(event.currentTarget.value)
  }

  const handleChangePassword: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setPasswordValue(event.currentTarget.value)
  }

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault()
    try {
      const { status } = await axios.post<unknown>(`${Common.MswHost}/login`, {
        id: idValue,
        password: passwordValue,
      })

      if (status > HttpStatusCode.BadRequest) {
        setErrorMessage("has error1")
        return
      }

      setIsLoggedIn(true)
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setErrorMessage("has error2")
      }
    }
  }

  const isDisabled = !idValue || !passwordValue

  return {
    errorMessage,
    handleChangeId,
    handleChangePassword,
    handleSubmit,
    idValue,
    isDisabled,
    isLoggedIn,
    passwordValue,
  }
}
