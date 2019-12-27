import * as types from './Types'

export const logout = () => ({
  type: types.AUTH_LOGOUT
})

export const loadAppData = (isAnonymous) => ({
  type: types.LOAD_APP_DATA,
  isAnonymous
})

export const createAnonymousUser = () => ({
  type: types.CREATE_ANONYMOUS_USER
})

export const attemptLogin = (onLoginError) => ({
  type: types.AUTH_LOGIN,
  onLoginError
})

export const attemptUserRegistration = (firstName, lastName, cell, email, password, onUserRegFail) => ({
  type: types.AUTH_REGISTER,
  payload: {
    firstName,
    lastName,
    cell,
    email,
    password
  },
  onUserRegFail
})

export const attemptEmailLogin = (email, password, onEmailAuthFail) => ({
  type: types.AUTH_EMAIL_PWORD_LOGIN,
  payload: {
    email,
    password
  },
  onAuthFail: onEmailAuthFail
})

export const attemptGoogleAuth = (onGoogleAuthFail) => ({
  type: types.AUTH_GOOGLE,
  onAuthFail: onGoogleAuthFail
})

export const attemptFacebookAuth = (onFacebookAuthFail) => ({
  type: types.AUTH_FACEBOOK,
  onAuthFail: onFacebookAuthFail
})
