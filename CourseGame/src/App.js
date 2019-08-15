import React, { Component } from "react";
import "./App.css";
import SignUp from "./Screens/SignUp/SignUp";
import LogIn from "./Screens/LogIn/LogIn";
import QuizList from "./Screens/QuizList/QuizList";
import fire from './config/Fire';
import AddEdit from './Screens2/AddEdit/AddEdit';
class App extends Component {
  constructor() {
    super();
    this.state = {
      isUser: false,
      authForms: true,
      user: null,
      student: false,
      prof: false,
      userlevel: null,
      userid: null
    };
    this.checkUser = this.checkUser.bind(this);
    this.toggleAuthForms = this.toggleAuthForms.bind(this);
    this.changeUserState = this.changeUserState.bind(this);
    this.changeUserState2 = this.changeUserState2.bind(this);
    this.logout = this.logout.bind(this);
    this.getUser = this.getUser.bind(this);
    this.g = this.g.bind(this);
    this.change_level = this.change_level.bind(this);
  }
  checkUser() {
    let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    if (!userInfo) {
      console.log("user is NOT logged in");
      this.setState({ isUser: false });
    } else {
      this.setState({ isUser: true });
      console.log(`${userInfo.username} is logged IN`);
    }
  }

  changeUserState(userid) {
    this.setState({ isUser: true });
  }
  changeUserState2() {
    this.setState({ isUser: false });
  }
  async getUser(user2) {
    console.log("in App.js user:", user2);
    var g = user2.type;
    await this.setState({
      user: user2,
      student: !g,
      prof: g
    })
    console.log("in App.js userState:", this.state.user);
  }
  toggleAuthForms(Show_Hide) {
    this.setState({ authForms: Show_Hide });
  }

  logout() {
    this.setState({ isUser: false });
    fire.auth().signOut();
    sessionStorage.removeItem("userInfo");
  }
  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      //console.log(user);
      if (user) {
        this.setState({ user });

      } else {
        this.setState({ user: null });
      }

    });
  }
  componentDidMount() {
    this.authListener();
  }
  g() {
    this.toggleAuthForms.bind(this, true);
    this.setState({
      isUser: false,
      student: false,
      prof: false
    })
  }
  change_level(n) {
    var t = {
      name: this.state.user.username,
      id: this.state.user.studentid,
      email: this.state.user.email,
      batch: this.state.user.batch,
      curr_level: n,
      type: this.state.user.type,
      password: this.state.user.password
    }
    console.log(t);
    // this.setState({
    //   user.curr_level : n
    // })
  }
  render() {
    const { isUser, authForms, student, prof } = this.state;
    return (
      <div className="container margin">
        {!this.state.isUser ? (
          authForms ? (
            <div>
              <SignUp toggleToSignIn={this.toggleAuthForms} getUser={this.getUser} k={this.changeUserState2} />
              <br />
              <button
                className="btn btn-success"
                onClick={this.toggleAuthForms.bind(this, false)}
              >
                LogIn <i className="fa fa-sign-in" />
              </button>
            </div>
          ) : (
              <div>
                <LogIn getUser={this.getUser} changeUserState={this.changeUserState} userid={this.userid} userlevel={this.userlevel} />
                <br />
                <button
                  className="btn btn-primary"
                  onClick={this.toggleAuthForms.bind(this, true)}
                >
                  SignUp <i className="fa fa-database" />
                </button>
              </div>
            )
        ) : (
            student ? (
              <div>
                <br />
                <button className="btn btn-danger pull-right" onClick={this.logout}>Logout <i className="fa fa-sign-out"></i></button>
                <QuizList curr_level={this.state.user.curr_level} change_level={this.change_level} id={this.state.user.id} name={this.state.user.name} />
              </div>
            ) : (prof ? (
              <div>
                <br />
                <button className="btn btn-danger pull-right" onClick={this.logout}>Logout <i className="fa fa-sign-out"></i></button>
                <AddEdit />
              </div>
            ) : (

                <div>
                  <LogIn getUser={this.getUser} changeUserState={this.changeUserState} userid={this.userid} userlevel={this.userlevel} />
                  <br />
                  <button
                    className="btn btn-primary"
                    onClick={this.g()}
                  >
                    SignUp <i className="fa fa-database" />
                  </button>
                </div>
              )

              )
            // <div>
            //   <br />
            //   <button className="btn btn-danger pull-right" onClick={this.logout}>Logout <i className="fa fa-sign-out"></i></button>
            //   <QuizList />
            // </div>
          )}
      </div>
    );
  }
}

export default App;
