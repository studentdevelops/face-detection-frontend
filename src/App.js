import Navigation from "./Components/Navigation/Navigation";
import InputField from "./Components/InputPicture/InputField";
import "./App.css";
import DisplayImage from "./Components/DisplayPicture/DisplayImage";
import React from "react";
import ParticlesBG from "./ParticlesBG/ParticlesBG";
import Register from "./Components/Register/Register";
import SignIn from "./Components/SignIn/SignIn";
import IntroText from "./Components/InputPicture/IntroText";



const InitialState = {
  searchField: "",
  img: "",
  path: "signin",
  logged_in: false,
  box: {},
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    join: "",
  },
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = InitialState;
  }

  updateUser = (data) => {
    this.setState({ logged_in: true });
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        join: data.joined,
      },
    });
  };

  ChangePath = (path) => {
    if (path == "signout") {
      return this.setState(InitialState);
    }
    return this.setState({ path: path });
  };

  onInputChange = (e) => {
    this.setState({ searchField: e.target.value });
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  calculateBox = (response) => {
    const box = response.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.querySelector("#img");
    const height = Number(image.height);
    const width = Number(image.width);
    return {
      left: box.left_col * width,
      top: box.top_row * height,
      right: width - box.right_col * width,
      bottom: height - box.bottom_row * height,
    };
  };

  onImageSubmit = () => {
    this.setState({ img: this.state.searchField });
    fetch("https://radiant-cliffs-05082.herokuapp.com/imageurl", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: this.state.searchField,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch("https://radiant-cliffs-05082.herokuapp.com/image", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((data) =>
              this.setState(Object.assign(this.state.user, { entries: data }))
            );
        }
        this.displayFaceBox(this.calculateBox(response));
      })
      .catch((err) => console.log("Error 404"));
  };

  render() {
    return (
      <div className="App">
        <ParticlesBG />
        <Navigation
          logged={this.state.logged_in}
          ChangePath={this.ChangePath}
        />
        {this.state.path === "home" ? (
          <>
            <IntroText
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <InputField
              onInput={this.onInputChange}
              onImageSubmit={this.onImageSubmit}
            />
            <DisplayImage box={this.state.box} img={this.state.img} />
          </>
        ) : this.state.path === "register" ? (
          <Register updateUser={this.updateUser} ChangePath={this.ChangePath} />
        ) : (
          <SignIn updateUser={this.updateUser} ChangePath={this.ChangePath} />
        )}
      </div>
    );
  }
}

export default App;
