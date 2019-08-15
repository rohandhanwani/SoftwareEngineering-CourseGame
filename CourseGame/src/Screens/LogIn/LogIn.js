import React, { Component } from "react";
import fire from '../../config/Fire'
class LogIn extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      user: null
    };
    this.logInNow = this.logInNow.bind(this);
    this.Login = this.Login.bind(this);
    this.getData = this.getData.bind(this);
  }
  async getData(userid) {
    var user = null;
    await fire.database().ref('ListofStudents').child(fire.auth().currentUser.uid).once("value").then(function (snapshot) {
      console.log("addtoData:", snapshot.val());
      snapshot.forEach(child => {
        console.log(child.val());
        user = {
          batch: child.val().batch,
          curr_level: child.val().curr_level,
          email: child.val().email,
          id: child.val().id,
          name: child.val().name,
          password: child.val().password,
          type: child.val().type,
        }
      })
    })
    console.log("user:", user);
    this.props.getUser(user);
  }
  logInNow() {
    const { email, password } = this.state;
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (email === userInfo.email && password === userInfo.password) {
      sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
      this.props.changeUserState();
    } else {
      console.log("enter correct details");
    }
    // console.log(JSON.parse(sessionStorage.getItem("userInfo")));
  }
  async Login(e) {
    e.preventDefault();
    var userid = null;
    const { email, password } = this.state;
    await fire.auth().signInWithEmailAndPassword(email, password).then((u) => {
      userid = fire.auth().currentUser.uid
      this.getData(userid);
      this.props.changeUserState();
    })
      .catch((error) => { window.alert(error) });
    console.log("userid:", userid);


  }
  render() {
    return (
      <div>
        <h1 className="text-center">LOG IN</h1>
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="email" className="">
              Email:
            </label>
            <input
              type="email"
              onChange={e =>
                this.setState({
                  email: e.target.value
                })
              }
              className="form-control"
              autoComplete="true"
              autoFocus={true}
              placeholder="email"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="password" className="">
              Password:
            </label>
            <input
              type="password"
              onChange={e =>
                this.setState({
                  password: e.target.value
                })
              }
              className="form-control"
              placeholder="password"
            />
          </div>
          <br />

        </div>
        <br />
        <div className="row">
          <div className="col">
            <button className="btn btn-success" onClick={this.Login}>
              LogIn <i className="fa fa-sign-in" />
            </button>
          </div>
        </div>


      </div>
    );
  }
}

export default LogIn;
