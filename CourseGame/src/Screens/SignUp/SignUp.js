import React, { Component } from "react";
import fire from '../../config/Fire';
class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      username: null,
      email: null,
      password: null,
      studentid: null,
      batch: null
    };
    this.signUpNow = this.signUpNow.bind(this);
    this.register = this.register.bind(this);
    this.addtoData = this.addtoData.bind(this);
    this.t = this.t.bind(this);
    this.g = this.g.bind(this);
    itemsRef: fire.database().ref('user');
  }
  addtoData(userid) {
    fire.database().ref('ListofStudents').once("value").then(function (snapshot) {
      console.log("addtoData:", snapshot.val());

    })
    fire.database().ref('ListofStudents').child(userid).push({
      name: this.state.username,
      id: this.state.studentid,
      email: this.state.email,
      batch: this.state.batch,
      curr_level: 0,
      type: false,
      password: this.state.password,
      current_point: 0
    });
    var user = {
      name: this.state.username,
      id: this.state.studentid,
      email: this.state.email,
      batch: this.state.batch,
      curr_level: 0,
      type: false,
      password: this.state.password,
      current_point: 0
    }
    this.props.getUser(user);
  }
  register(e) {
    e.preventDefault();
    var d = parseInt(this.state.studentid);
    var e = parseInt(this.state.batch);
    console.log("student id:", d, "username:", this.state.username);
    if (this.state.studentid === null) {
      window.alert('Please fill all the details');
      return;
    }
    if (this.state.username === null) {
      window.alert('Please fill all the details');
      return;
    }
    if (this.state.batch === null) {
      window.alert('Please fill all the details');
      return;
    }
    var x = this.state.username;
    if (!x.match(/^[A-Za-z]+$/)) {
      window.alert('Only characters in Full name');
      return;
    }
    if (isNaN(d)) {
      window.alert('Student Id must be integer');
      return;
    }
    if (d > 999999999) {
      window.alert('9 digit is allowed in Student Id');
      return;
    }
    if (isNaN(e)) {
      window.alert('Batch must be an integer');
      return;
    }
    if (e > 9999) {
      window.alert('4 digit is allowed in Batch');
      return;
    }
    if (e < 1000) {
      window.alert('4 digit is allowed in Batch');
      return;
    }
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
      console.log('uid', fire.auth().currentUser.uid);
      var userid = fire.auth().currentUser.uid;
      // fire.firestore().collection("user").doc(userid).set({
      //     name: this.state.username,
      //     id: this.state.studentid,
      //     email: this.state.email,
      //     batch: this.state.batch,
      //     level:0 ,
      //     type:false,
      //     password:this.state.password
      // });
      this.addtoData(userid);
      this.g();

    }).catch((error) => { window.alert(error) }).then(() => {
      /*fire.database().ref('w1/').push({
        name: this.state.username,
        id: this.state.studentid,
        email: this.state.email,
        batch: this.state.batch,
        level:this.state.level,
        type:false,
        password:this.state.password
          
        })*/

    })
    // fire.database().ref('ListofStudents/').child(this.state.studentid).push({
    //   name: this.state.username,
    //   id: this.state.studentid,
    //   email: this.state.email,
    //   batch: this.state.batch,
    //   curr_level: 0,
    //   type: false,
    //   password: this.state.password
    // });

  }
  g() {
    this.props.toggleToSignIn();
    this.props.k();
  }
  t(e) {
    this.register(e);
    this.g();
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
  onKeyPress(event) {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    if (/\+|-/.test(keyValue))
      event.preventDefault();
  }
  render() {
    // const {  } = this.props;
    return (
      <div>
        <h1 className="text-center ">REGISTRATION</h1>
        <br />
        <div className="row">
          <div className="col-md-4">
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              onkeypress={(event) => {
                return (event.charCode > 64 &&
                  event.charCode < 91) || (event.charCode > 96 && event.charCode < 123)
              }}
              onChange={e => {
                this.setState({ username: e.target.value });
              }}
              autoFocus={true}
              className="form-control"
              placeholder="name"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="name">Student Id:</label>
            <input
              type="number"
              onKeyPress={this.onKeyPress.bind(this)}
              onChange={e => {
                this.setState({ studentid: e.target.value });
              }}
              autoFocus={true}
              className="form-control"
              placeholder="Student Id"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="name">Batch:</label>
            <input
              type="number"
              onKeyPress={this.onKeyPress.bind(this)}
              onChange={e => {
                this.setState({ batch: e.target.value.replace(/\D/, '') });
              }}
              autoFocus={true}
              className="form-control"
              placeholder="Batch"
            />
          </div>
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
        </div>
        <br />
        <div className="row">
          <div className="col">
            <button className="btn btn-primary" onClick={this.register}>
              Submit <i className="fa fa-database" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
