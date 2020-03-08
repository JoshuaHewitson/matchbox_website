import * as types from '../actions/Types'
import { Record } from 'immutable'

const initialState = Record({
  loginDialogueOpen: false
})

const auth = (state = initialState(), action) => {
  switch (action.type) {
    case types.SET_LOGIN_DIALOGUE_OPEN:
      return state.set('loginDialogueOpen', action.payload.state)
    default: return state
  }
}
export default auth
