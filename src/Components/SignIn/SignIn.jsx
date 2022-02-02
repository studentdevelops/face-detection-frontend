import React from "react";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  onEmailChange = (e) => {
    this.setState({ email: e.target.value.trim() });
  };
  onPasswordChange = (e) => {
    this.setState({ password: e.target.value.trim() });
  };
  onNameChange = (e) => {
    this.setState({ name: e.target.value.trim() });
  };

  ChangePath = (path) => {
    this.setState({ path: path });
  };

  onSubmit = (e) => {
    if (!this.state.email || !this.state.password) {
      return;
    }
    fetch("https://radiant-cliffs-05082.herokuapp.com/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((user) => {
        if (user.id) {
          this.props.updateUser(user);
          this.props.ChangePath("home");
        }
      });
  };

  render() {
    return (
      <div className="register-form">
        <h2>Login</h2>
        <label htmlFor="email">Email </label>
        <input type="text" name="email" onChange={this.onEmailChange} />
        <label htmlFor="password">Password </label>
        <input type="password" name="email" onChange={this.onPasswordChange} />
        <button className="btn" onClick={this.onSubmit}>
          {" "}
          Register{" "}
        </button>
      </div>
    );
  }
}

export default SignIn;
