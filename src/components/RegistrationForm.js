import React, { Component } from 'react'
import { TextField } from '@material-ui/core'

class RegistrationForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      submitted: false
    }
  }

  handleChange = (event, name) => {
    this.setState({ [name]: event.target.value })
  }

  submit = () => {
    if (this.isValid(this.state.firstName, this.state.lastName, this.state.email, this.state.password, this.state.confirmPassword)) {
      this.props.handleRegistration(this.state.firstName, this.state.lastName, this.state.email, this.state.password)
    }
  }

  isValid = (firstName, lastName, email, password, confirmPassword) => {
    return this.isNameValid(firstName) && this.isNameValid(lastName) &&
    this.isEmailValid(email) && this.isPasswordValid(password) &&
    this.isConfirmPasswordValid(password, confirmPassword)
  }

  isNameValid = (name) => {
    return name.length >= 1
  }

  isEmailValid = (email) => {
    var check = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return check.test(email)
  }

  isPasswordValid = (password) => {
    return password.length > 5
  }

  isConfirmPasswordValid = (confirmPassword, password) => {
    return password === confirmPassword
  }

  render () {
    const firstNameError = !this.isNameValid(this.state.firstName) && (this.state.firstName !== '' || this.state.submitted)
    const lastNameError = !this.isNameValid(this.state.lastName) && (this.state.lastName !== '' || this.state.submitted)
    const emailError = !this.isEmailValid(this.state.email) && (this.state.email !== '' || this.state.submitted)
    const passwordError = !this.isPasswordValid(this.state.password) && (this.state.password !== '' || this.state.submitted)
    const confirmPasswordError = !this.isConfirmPasswordValid(this.state.confirmPassword, this.state.password) && (this.state.password !== '' || this.state.submitted)

    return (
      <div>
        <TextField
          autoFocus
          variant='outlined'
          id='firstName'
          value={this.state.firstName}
          onChange={(event) => this.handleChange(event, 'firstName')}
          error={firstNameError}
          helperText={firstNameError ? 'Enter a name' : ''}
          label='First name'
          type='name'
        />
        <TextField
          variant='outlined'
          style={{ marginLeft: 20 }}
          id='lastName'
          value={this.state.lastName}
          onChange={(event) => this.handleChange(event, 'lastName')}
          error={lastNameError}
          helperText={lastNameError ? 'Enter a last name' : ''}
          label='Last name'
          type='name'
        />
        <div style={{ width: '100%', height: 30 }} />
        <TextField
          variant='outlined'
          id='email'
          value={this.state.email}
          onChange={(event) => this.handleChange(event, 'email')}
          error={emailError}
          helperText={emailError ? 'Enter a valid email' : ''}
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
          error={passwordError}
          helperText={passwordError ? 'Enter a stronger password' : ''}
          label='Password'
          type='password'
        />
        <TextField
          variant='outlined'
          style={{ marginLeft: 20 }}
          id='confirmPassword'
          value={this.state.confirmPassword}
          onChange={(event) => this.handleChange(event, 'confirmPassword')}
          error={confirmPasswordError}
          helperText={confirmPasswordError ? 'Passwords must match' : ''}
          label='Confirm'
          type='password'
        />
      </div>
    )
  }
}
export default RegistrationForm
