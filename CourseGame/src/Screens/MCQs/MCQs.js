import React, { Component } from "react";
import firebase from "../../config/Fire";
import Leaderboard from './Leaderboard';

class MCQs extends Component {
  static defaultProps = {
    currentQuesObj: {},
    currentTestIndex: 0
  };
  constructor(props) {
    super(props);
    const { currentQuesObj, currentTestIndex } = this.props;
    this.state = {
      // question1: currentQuesObj.tests[currentTestIndex].quiz_questions[0].quiz,
      // opt1: currentQuesObj.tests[currentTestIndex].quiz_questions[0].option1,
      // opt2: currentQuesObj.tests[currentTestIndex].quiz_questions[0].option2,
      // opt3: currentQuesObj.tests[currentTestIndex].quiz_questions[0].option3,
      // opt4: currentQuesObj.tests[currentTestIndex].quiz_questions[0].option4,
      i: 0,
      correct: 0,
      score: 0,
      min: null,
      sec: null,
      list_que: [],
      question: null,
      option1: null,
      option2: null,
      option3: null,
      answer: null,
      num_que: null,
      leaderboard: false
    };
    this.minute = 120;
    this.time;
    this.second = 1;
    this.timeStart = null;
    this.next = this.next.bind(this);
    this.timer = this.timer.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.p = this.p.bind(this);
    this.viewLeader = this.viewLeader.bind(this);
    this.changelead = this.changelead.bind(this);
    this.updatelevel = this.updatelevel.bind(this);
    this.updatepoints = this.updatepoints.bind(this);
  }
  async updatepoints() {
    //firebase.database().ref('ListofStudents').child('' + this.props.id)
    var i = firebase.auth().currentUser.uid;
    console.log("i:", i);
    var w = this.props.selected_week;
    var a = this.props.selected_assignment;
    var a1 = a + 1;
    var w1 = w - 1;
    var curr_p;
    var key;
    var point;
    await firebase.database().ref('ListofStudents').child('' + i).once("value").then(function (snapshot) {
      snapshot.forEach((child) => {
        console.log("Student**", child.val());
        key = child.key;
        point = child.val().current_point;
      })
    });
    var num_test;
    await firebase.database().ref('ListofStudents').child('' + i).child('' + key).update({
      current_point: point + 1
    })
    await firebase.database().ref('MetaData').child('Weeks').child('' + w1).child('Week' + w).once("value").then(function (snapshot) {
      console.log("####3", snapshot.val());
      num_test = snapshot.val().num_assignments;
    })
    // if (point + 1 === num_test) {
    //   await firebase.database().ref('ListofStudents').child('' + i).child('' + key).update({
    //     curr_level = w
    //   })
    // }
  }
  async updatelevel() {
    console.log("I am in update level");
    var w = this.props.selected_week;
    var a = this.props.selected_assignment;
    var a1 = a + 1;
    var w1 = w - 1;
    console.log("a:", a, "w:", w, "a1:", a1, "w1:", w1);
    var num_a;
    var query1 = firebase.database().ref('MetaData').child('Weeks').child('' + w1).child('Week' + w);
    var query3 = firebase.database().ref('MetaData').child('Weeks').child('' + w1).child('Week' + w).child('assignments').child('' + a).child('assignment' + a1);

    await query1.once("value").then(function (snapshot) {
      console.log("num_a:", snapshot.val().num_assignments);
      num_a = snapshot.val().num_assignments;
    })
    if (this.props.point == num_a) {
      var q = firebase.database().ref('ListofStudents');
      var y;
      await q.then(function (snapshot) {
        console.log('***', snapshot.val());

      })
    }
    // console.log("num_a:", num_a);
    // var query2, i;
    // for (i = 0; i < num_a; i++) {
    //   var g = i + 1;
    //   query2 = query1.child('assignments').child('' + i).child('assignment' + g).child('Leaderboard');
    //   var num_stud;
    //   await query2.once("value").then(function (snapshot) {
    //     num_stud = snapshot.val().num_student;
    //     console.log("i=", i, "num_student:", num_stud);
    //   });
    // }
  }
  next() {
    const { currentQuesObj, currentTestIndex } = this.props;
    var { i, correct, score, list_que, num_que } = this.state;

    //var quiz_questions = currentQuesObj.tests[currentTestIndex].quiz_questions;
    var radioBtn = document.querySelector("input[name='option']:checked");
    if (radioBtn == null) {
      alert("select value");
    } else {
      if (list_que[i].answer.match(radioBtn.value)) {
        //console.log("quiz_questions[i].answer**", quiz_questions[i].answer);
        // console.log(
        //   "answer**",
        //   quiz_questions[i].answer
        // );
        this.setState({ correct: ++correct });
      }

      if (num_que - 1 === i) {
        document.getElementById("quizContainer").style.display = "none";
        document.getElementById("resultContainer").style.display = "block";
        // console.log("value equal");
        // console.log(this.state.correct);
        score = correct;//* (100 / quiz_questions.length).toFixed(2);
        //console.log(quiz_questions.length);
        this.setState({ score });
        // if (score > 0) {
        //   this.updatepoints();

        // }
      } else {
        // document.querySelector("input[name='option']:checked").checked = false;
        i++;
        const que = list_que[i].Question;
        const opt1 = list_que[i].Option1;
        const opt2 = list_que[i].Option2;
        const opt3 = list_que[i].Option3;
        const opt4 = list_que[i].Option4;
        const ans = list_que[i].answer;
        this.setState({
          question: que,
          option1: opt1,
          option2: opt2,
          option3: opt3,
          option4: opt4,
          answer: ans,
          i: i
        });
      }
    }
  }
  fetch_question = async () => {
    //let a=firebase.database().ref('coursegame-6af5a').child('w1').child('Weeknum');
    //console.log(a);
    const w = this.props.selected_week;
    var d = w - 1;
    const a = this.props.selected_assignment + 1;
    var e = a - 1;
    console.log('***', w);
    console.log('$$$', a);
    var arr = [];
    var query = firebase.database().ref('MetaData').child('Weeks').child('' + d).child('Week' + w).child('assignments').child('' + e).child('assignment' + a).child('Questions');
    await query.once("value").then(function (snapshot) {
      snapshot.forEach(child => {
        console.log("@@@@", child.val());
        arr.push(child.val());
      })

    })
    var num_ques;
    var time;
    var query2 = firebase.database().ref('MetaData').child('Weeks').child('' + d).child('Week' + w).child('assignments').child('' + e).child('assignment' + a);
    await query2.once("value").then(function (snapshot) {
      console.log("____", snapshot.val());
      num_ques = snapshot.val().num_ques;
      time = snapshot.val().time;
    })
    console.log("time:", time);

    this.minute = parseInt(time);
    this.time = parseInt(time);
    this.setState({
      num_que: num_ques,
      list_que: arr,
      question: arr[0].Question,
      option1: arr[0].Option1,
      option2: arr[0].Option2,
      option3: arr[0].Option3,
      option4: arr[0].Option4,
      answer: arr[0].answer
    })
  }
  componentDidMount() {
    this.fetch_question();
    this.timer();
  }
  timer() {
    this.timeStart = setInterval(() => {
      this.setState({
        min: this.minute,
        sec: this.second
      });
      this.second--;
      if (this.second === 0) {
        this.second = 60;
        this.minute--;
        this.setState({
          sec: this.second,
          min: this.minute
        });
        if (this.minute < 0) {
          clearInterval(this.timeStart);
          const { currentQuesObj, currentTestIndex } = this.props;
          //var quiz_questions =
          //currentQuesObj.tests[currentTestIndex].quiz_questions;
          var { score, correct } = this.state;
          this.setState({
            min: 0,
            sec: 0
          });
          score = correct * (100 / this.state.num_ques).toFixed(2);
          this.setState({
            score
          });

          document.getElementById("quizContainer").style.display = "none";
          document.getElementById("resultContainer").style.display = "block";
        }
      }
    }, 1000);
  }
  async handleSubmit() {
    console.log("Handle Submit");
    console.log("selected week:", this.props.selected_week, "selected assignment", this.props.selected_assignment);
    var w = this.props.selected_week - 1;
    var a = this.props.selected_assignment + 1;
    var arr = [], num;
    var query = firebase.database().ref('MetaData').child('Weeks').child('' + w).child('Week' + this.props.selected_week).child('assignments').child('' + this.props.selected_assignment).child('assignment' + a).child('Leaderboard');
    await query.once("value").then(function (snapshot) {
      console.log(snapshot.val());
      //arr = snapshot.val().list;
      num = snapshot.val().num_student;
    });
    var i;
    await query.child('list').once("value").then(function (snapshot) {
      console.log(snapshot.val());
      snapshot.forEach((child) => {
        console.log("child:", child.val());
        arr.push(child.val());
      })
    })
    console.log("num:", num, "id:", this.props.id,"arr:",arr);

    for (i = 0; i < num; i++) {
      if (arr[i].id === this.props.id) {
        window.alert("Cannot Submit: You have already attempted this test.");
        return;
      }
    }
    console.log("id:", this.props.id, "arr", arr, "name:", this.props.name);
    query.child('list').push({
      id: this.props.id,
      name: this.props.name,
      score: this.state.score
    })
    query.update({
      num_student: num + 1
    })

  }
  viewLeader = () => {
    console.log("View Leaderboard");
    console.log("In MCQs,week:", this.props.selected_week, "assignemtn:", this.props.selected_assignment);

    // return (
    //   <div>
    //     <Leaderboard w={this.props.selected_week} a={this.props.selected_assignment} />
    //   </div>
    // );


  }
  changelead(param) {
    this.setState({
      leaderboard: false
    })
  }
  p() {
    this.viewLeader();
  }
  render() {
    const { question, option1, option2, option3, option4, score, min, sec } = this.state;
    const { currentQuesObj, currentTestIndex } = this.props;
    return (
      this.state.leaderboard ?
        (<div>
          <Leaderboard backToDashboard={this.props.backToDashboard} w={this.props.selected_week} a={this.props.selected_assignment} name={this.props.name} />
        </div>
        ) :
        (<div>
          <div className="col-md-12">
            <div className="col" id="content">
              <div id="quizContainer">
                <div className="modal-header">
                  <h5>
                    <i className="fa fa-question-circle" />
                    <span> </span>
                    <span className="label label-warning">{question}</span>
                  </h5>
                  <h5>
                    {min} : {sec}
                  </h5>
                </div>
                <div className="modal-body">
                  <div className="quiz" id="quiz" data-toggle="buttons">
                    <label className="btn btn-lg btn-info btn-block">
                      <span className="btn-label">
                        <input type="radio" name="option" value="1" />
                        <br />
                        <i className="fa fa-arrow-right" />
                      </span>
                      <span>{option1}</span>
                    </label>
                    <label className="btn btn-lg btn-info btn-block">
                      <span className="btn-label">
                        <input type="radio" name="option" value="2" />
                        <br />
                        <i className="fa fa-arrow-right" />
                      </span>
                      <span>{option2}</span>
                    </label>
                    <label className="btn btn-lg btn-info btn-block">
                      <span className="btn-label">
                        <input type="radio" name="option" value="3" />
                        <br />
                        <i className="fa fa-arrow-right" />
                      </span>
                      <span>{option3}</span>
                    </label>
                    <label className="btn btn-lg btn-info btn-block">
                      <span className="btn-label">
                        <input type="radio" name="option" value="4" />
                        <br />
                        <i className="fa fa-arrow-right" />
                      </span>
                      <span>{option4}</span>
                    </label>
                    <button
                      className="btn btn-success pull-right"
                      onClick={this.next.bind(this)}
                    >
                      Next Question <i className="fa fa-angle-double-right" />
                    </button>

                    <br />
                    <br />
                  </div>
                </div>
              </div>
              <div id="resultContainer" style={{ display: "none" }}>
                <div className="modal-header">
                  <h2>{'Week' + this.props.selected_week} Quiz</h2>
                  <button
                    className="btn btn-secondary pull-right"
                    onClick={() => {
                      this.props.backToDashboard(false);
                    }}
                  >
                    Goto Dashboard <i className="fa fa-undo" />
                  </button>
                </div>
                <div className="modal-body">
                  <h3>{/*currentQuesObj.tests[currentTestIndex].name*/}</h3>
                  <p>
                    Time:
                    {this.time} Minute(s)
                </p>
                  {/* <p>Questions: {currentQuesObj.tests[currentTestIndex].questions}</p> */}
                  {score > 0 ? (
                    <h3>You have scored {score} points from {this.state.num_que}</h3>

                  ) : (
                      <h3>You have scored {score}</h3>
                    )}
                  {/* <form ref="form" onSubmit={this.handleSubmit}>
                  <button className="btn btn-secondary pull-right" type="submit">Do the thing</button>
                </form> */}
                  <hr />

                  <br />
                  <button className="btn btn-secondary pull-right" onClick={this.handleSubmit}>Submit Test</button>
                  <br />
                  <button className="btn btn-secondary pull-left" onClick={() => { this.setState({ leaderboard: true }) }}>View Leaderboard</button>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>)
    );
  }
}

export default MCQs;
