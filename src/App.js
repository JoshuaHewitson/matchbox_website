import React from 'react'
import Home from './pages/Home'
import TermsOfUse from './pages/TermsOfUse'
import PrivacyPolicy from './pages/PrivacyPolicy'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'

function App (props) {
  return (
    <div className='App'>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/terms_of_use' render={() => <TermsOfUse />} />
          <Route path='/privacy_policy' render={() => <PrivacyPolicy />} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
