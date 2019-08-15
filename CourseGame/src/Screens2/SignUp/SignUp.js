import React, { Component } from "react";
import fire from '../../config/Fire';
class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      studentid: "",
      batch: ""
    };
    this.signUpNow = this.signUpNow.bind(this);
    this.register = this.register.bind(this);
    itemsRef: fire.database().ref('user');
  }
  register(e) {
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
      console.log('uid', fire.auth().currentUser.uid);
      var userid = fire.auth().currentUser.uid;
      fire.firestore().collection("user").doc(userid).set({
        name: this.state.username,
        email: this.state.email,
        type: true,
        password: this.state.password
      })

    }).catch((error) => { console.log(error) });

  }
  signUpNow() {
    let { toggleToSignIn } = this.props;
    const { username, email, password } = this.state;
    if (!email.match(/\S+@\S+\.\S+/)) {
      alert("please enter correct email");
    } else if (!password.match(/(?=.*\d)(?=.*[a-z]).{8,}/)) {
      alert(
        "Please enter atleast 8 characters and contain atleast one character and one number"
      );
    } else {
      let signUpObj = { username, email, password };
      //localStorage.setItem("userInfo", JSON.stringify(signUpObj));//Statement to save the registration
      //saveDetails();
      { this.register().bind(this) }
      toggleToSignIn(false);
      // console.log(signUpObj, "****");
    }
  }

  render() {
    // const {  } = this.props;
    return (
      <div>
        <h1 className="text-center ">REGISTRATION</h1>
        <br />
        <div className="row">
          <div className="col-md-4">
            <label htmlFor="name">Username:</label>
            <input
              type="text"
              onChange={e => {
                this.setState({ username: e.target.value });
              }}
              autoFocus={true}
              className="form-control"
              placeholder="name"
            />
          </div>
          <br />
          <div className="col-md-4">
            <label htmlFor="number">Email:</label>
            <input
              type="email"
              onChange={e => {
                this.setState({ email: e.target.value });
              }}
              className="form-control"
              placeholder="email"
            />
          </div>
          <br />
          <div className="col-md-4">
            <label htmlFor="number">password:</label>
            <input
              type="password"
              onChange={e => {
                this.setState({ password: e.target.value });
              }}
              maxLength="8"
              className="form-control"
              placeholder="password"
            />
          </div>
          <br />
        </div>
        <div>
          <br />
          <div className="row">
            <br />

          </div>
        </div>
      </div>
      <div>
        <div className="col">
          <button className="btn btn-primary" onClick={this.register}>
            Submit <i className="fa fa-database" />
          </button>
        </div>
      </div>
    );
  }
}

export default SignUp;
