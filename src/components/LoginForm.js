import React, { Component } from 'react'
import { TextField } from '@material-ui/core'

class LoginForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = (event, name) => {
    this.setState({ [name]: event.target.value })
  }

  submit = () => {
    this.props.handleLogin(this.state.email, this.state.password)
  }

  render () {
    return (
      <div>
        <TextField
          autoFocus
          variant='outlined'
          id='email'
          value={this.state.email}
          onChange={(event) => this.handleChange(event, 'email')}
          label='Email Address'
          type='email'
          fullWidth
        />
        <div style={{ width: '100%', height: 30 }} />
        <TextField
          variant='outlined'
          id='password'
          value={this.state.password}
          onChange={(event) => this.handleChange(event, 'password')}
          label='Password'
          type='password'
          fullWidth
        />
      </div>
    )
  }
}
export default LoginForm
