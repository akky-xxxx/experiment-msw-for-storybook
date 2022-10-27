import { useLoginForm } from "./modules/useLoginForm"

import type { FC } from "react"

export const LoginForm: FC = () => {
  const {
    errorMessage,
    handleChangeId,
    handleChangePassword,
    handleSubmit,
    idValue,
    isLoggedIn,
    isDisabled,
    passwordValue,
  } = useLoginForm()

  return (
    <form action="" onSubmit={handleSubmit}>
      {isLoggedIn ? <p>logged in</p> : null}
      {errorMessage ? <p>{errorMessage}</p> : null}
      <div>
        <label>
          id:
          <input type="text" value={idValue} onChange={handleChangeId} />
        </label>
      </div>
      <div>
        <label>
          password:
          <input
            type="text"
            value={passwordValue}
            onChange={handleChangePassword}
          />
        </label>
      </div>
      <button disabled={isDisabled} type="submit">
        submit
      </button>
    </form>
  )
}
