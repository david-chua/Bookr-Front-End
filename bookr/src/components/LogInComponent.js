import React from 'react';
import axios from 'axios';

class LogInComponent extends React.Component{
  constructor(props){
    super(props)
    this.state= {
      signUp: false,
      usernameInput:'',
      passwordInput: '',
      passwordInputCheck: '',
      matchError: ''
    }
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  signUpComponentClickHandler = () => {
    this.setState({
      signUp: true
    })
  }

  logInComponentclickHandler = () => {
    this.setState({
      signUp: false
    })
  }

  signUpOnClickHandler = () => {
    const newUser = {
      username: this.state.usernameInput,
      password: this.state.passwordInput
    }
    if (this.state.passwordInput === this.state.passwordInputCheck){
      axios.post('http://localhost:3300/api/signup/', newUser)
      .then(response => {
        localStorage.setItem('jwt', response.data.token)
        localStorage.setItem('user', newUser.username);
      })
      .then(() => {
        this.props.history.push('/userpage');
      })
    } else {
      this.setState({matchError: 'PASSWORD MUST MATCH'})
    }
  }

  logInOnClickHandler = () => {
    const registeredUser = {
      username: this.state.usernameInput,
      password: this.state.passwordInput
    }

    axios.post('http://localhost:3300/api/login/', registeredUser)
    .then(response => {
      localStorage.setItem('user', registeredUser.username);
      localStorage.setItem('jwt', response.data.token)
    })
    .then(() => {
      this.props.history.push('/userpage');
    })
    .catch(error => {
      return error;
    })
  }

  render(){
    const signUp = this.state.signUp;
    return(

      <div>
        { !signUp ? (
          <div>
            <h1> Sign In </h1>
            <label> USERNAME</label><br/>
            <input
              onChange={this.handleInputChange}
              type="text"
              name="usernameInput"
              value={this.state.usernameInput}
             /><br/>
            <label> Password</label><br/>
            <input
              onChange={this.handleInputChange}
              type="text"
              name="passwordInput"
              value={this.state.passwordInput} /><br/>
            <button onClick={this.logInOnClickHandler}> Log In </button>
            <p> Don't have an account? Sign up <button onClick={this.signUpComponentClickHandler}> Here </button></p>
          </div>
        ) : (
          <div>
            <h1> Sign Up </h1>
            <label> USERNAME</label><br/>
            <input
              onChange={this.handleInputChange}
              type="text"
              name="usernameInput"
              value={this.state.usernameInput}
             /><br/>
            <label> Password</label><br/>
            <input
              onChange={this.handleInputChange}
              type="text"
              name="passwordInput"
              value={this.state.passwordInput} /><br/>
            <label> Password</label><br/>
            <input
              onChange={this.handleInputChange}
              type="text"
              name="passwordInputCheck"
              value={this.state.passwordInputCheck} /><br/>
            <button onClick={this.signUpOnClickHandler}> SignUp </button>
            <p> Already have an account? Log In <button onClick={this.logInComponentclickHandler}> Here </button></p>
            <div> <h1>{this.state.matchError }</h1></div>
          </div>
        )}
      </div>
    )
  }
}

export default LogInComponent;
