import * as types from './Types'

export const logout = () => ({
  type: types.AUTH_LOGOUT
})

export const loadAppData = (newAnon) => ({
  type: types.LOAD_APP_DATA,
  newAnon
})

export const createAnonymousUser = () => ({
  type: types.CREATE_ANONYMOUS_USER
})

export const userRegistration = (firstName, lastName, email, password, onSuccess, onFail) => ({
  type: types.AUTH_REGISTER,
  payload: {
    firstName,
    lastName,
    email,
    password
  },
  onSuccess,
  onFail
})

export const emailLogin = (email, password, onSuccess, onFail) => ({
  type: types.AUTH_EMAIL_LOGIN,
  payload: {
    email,
    password
  },
  onSuccess,
  onFail
})

export const googleAuthLogin = (onSuccess, onFail) => ({
  type: types.AUTH_GOOGLE_LOGIN,
  onSuccess,
  onFail
})
