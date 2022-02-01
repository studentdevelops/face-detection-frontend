import React from "react";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
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
    if (!this.state.email || !this.state.password || !this.state.name) {
      return;
    }
    fetch("http://localhost:3001/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          this.props.updateUser(data);
          this.props.ChangePath("home");
        }
      });
  };

  render() {
    return (
      <div className="register-form">
        <h2>Register</h2>
        <label htmlFor="name">Name </label>
        <input type="text" name="name" onChange={this.onNameChange} />
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

export default Register;
