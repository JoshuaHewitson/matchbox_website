import React from 'react'
import Matchbox from './Matchbox'
import { Provider } from 'react-redux'
import store from './redux/store'

function App (props) {
  return (
    <Provider store={store}>
      <Matchbox />
    </Provider>
  )
}

export default App
