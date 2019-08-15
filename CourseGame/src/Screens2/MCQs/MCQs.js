
import React, { Component } from "react";
import firebase from "../../config/Fire";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
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
      flag: false,
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
      option4: null,
      answer: null,
      new_question: null,
      new_option1: null,
      new_option2: null,
      new_option3: null,
      new_option4: null,
      new_answer: null,
      num_que: null
    };
    // this.minute = Math.ceil(currentQuesObj.tests[currentTestIndex].time / 60);
    this.second = 1;
    this.timeStart = null;
    this.next = this.next.bind(this);
    this.timer = this.timer.bind(this);
    this.prev = this.prev.bind(this);
    //this.y = this.y.bind(this);
    this.edit = this.edit.bind(this);
    this.editdata = this.editdata.bind(this);
    this.p = this.p.bind(this);
  }
  edit() {
    var w = this.props.selected_week;
    var a = this.props.selected_assignment;
    var n = this.state.i;
    document.getElementById("quizContainer").style.display = "none";
    document.getElementById("editContainer").style.display = "block";
    console.log("week:", w, "assignment:", a, "ques_num:", n);
    //var query = firebase.database().ref('MetaData').child('Weeks').child('' + w).child();

  }
  prev() {
    const { currentQuesObj, currentTestIndex } = this.props;
    var { i, correct, score, list_que, num_que } = this.state;

    //var quiz_questions = currentQuesObj.tests[currentTestIndex].quiz_questions;

    // var radioBtn = document.querySelector("input[name='option']:checked");
    // if (radioBtn == null) {
    //   alert("select value");
    // } else {
    //   if (list_que[i].answer.match(radioBtn.value)) {
    //     //console.log("quiz_questions[i].answer**", quiz_questions[i].answer);
    //     // console.log(
    //     //   "answer**",
    //     //   quiz_questions[i].answer
    //     // );
    //     this.setState({ correct: ++correct });
    //   }

    // if (num_que - 1 === i) {
    //   //document.getElementById("quizContainer").style.display = "none";
    //   //document.getElementById("resultContainer").style.display = "block";
    //   // console.log("value equal");
    //   // console.log(this.state.correct);
    //   score = correct;//* (100 / quiz_questions.length).toFixed(2);
    //   //console.log(quiz_questions.length);
    //   this.setState({ score });
    // } else {
    // document.querySelector("input[name='option']:checked").checked = false;
    console.log("i_oldL", i);

    i--;
    console.log("i_new", i);
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
    //}
    //}
  }
  next() {
    const { currentQuesObj, currentTestIndex } = this.props;
    var { i, correct, score, list_que, num_que } = this.state;

    //var quiz_questions = currentQuesObj.tests[currentTestIndex].quiz_questions;

    // var radioBtn = document.querySelector("input[name='option']:checked");
    // if (radioBtn == null) {
    //   alert("select value");
    // } else {
    //   if (list_que[i].answer.match(radioBtn.value)) {
    //     //console.log("quiz_questions[i].answer**", quiz_questions[i].answer);
    //     // console.log(
    //     //   "answer**",
    //     //   quiz_questions[i].answer
    //     // );
    //     this.setState({ correct: ++correct });
    //   }

    // if (num_que - 1 === i) {
    //   //document.getElementById("quizContainer").style.display = "none";
    //   //document.getElementById("resultContainer").style.display = "block";
    //   // console.log("value equal");
    //   // console.log(this.state.correct);
    //   score = correct;//* (100 / quiz_questions.length).toFixed(2);
    //   //console.log(quiz_questions.length);
    //   this.setState({ score });
    // } else {
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
    //}
    //}
  }
  fetch_question = async () => {
    //let a=firebase.database().ref('coursegame-6af5a').child('w1').child('Weeknum');
    //console.log(a);
    const { i } = this.state;
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
    var query2 = firebase.database().ref('MetaData').child('Weeks').child('' + d).child('Week' + w).child('assignments').child('' + e).child('assignment' + a);
    await query2.once("value").then(function (snapshot) {
      console.log("____", snapshot.val());
      num_ques = snapshot.val().num_ques;
    })

    this.setState({
      num_que: num_ques,
      list_que: arr,
      question: arr[i].Question,
      option1: arr[i].Option1,
      option2: arr[i].Option2,
      option3: arr[i].Option3,
      option4: arr[i].Option4,
      answer: arr[i].answer
    })
  }
  componentDidMount() {
    this.fetch_question();
    //this.timer();
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
          var quiz_questions =
            currentQuesObj.tests[currentTestIndex].quiz_questions;
          var { score, correct } = this.state;
          this.setState({
            min: 0,
            sec: 0
          });
          score = correct * (100 / quiz_questions.length).toFixed(2);
          this.setState({
            score
          });

          document.getElementById("quizContainer  ").style.display = "none";
          document.getElementById("resultContainer").style.display = "block";
        }
      }
    }, 1000);
  }
  // y() {
  //   this.props.backTest(true)
  // }
  async editdata(que, opt1, opt2, opt3, opt4, ans) {
    var w = this.props.selected_week;
    var a = this.props.selected_assignment;
    var n = this.state.i + 1;
    var x = w - 1;
    var y = a + 1;
    const { new_answer, new_option1, new_option2, new_option3, new_option4, new_question } = this.state;
    document.getElementById("quizContainer").style.display = "block";
    document.getElementById("editContainer").style.display = "none";
    console.log("week:", w, "assignment:", a, "ques_num:", n);
    var i;
    var d;
    var key = null;
    var query = firebase.database().ref('MetaData').child('Weeks').child('' + x).child('Week' + w).child('assignments').child('' + a).child('assignment' + y).child('Questions');
    await query.once("value").then(function (snapshot) {
      snapshot.forEach((child, index) => {
        if (parseInt(n) === parseInt(child.val().Question_num)) {
          console.log("index:", index, "childkey:", child.key, "childval:", child.val());
          key = child.key;
        }
      });
    });
    await query.child('' + key).once("value").then(function (snapshot) {
      console.log("Question:", snapshot.val());

    });
    console.log("new", "question:", new_question, "new_option1", new_option1);
    await query.child('' + key).update({
      Option1: opt1,
      Option2: opt2,
      Option3: opt3,
      Option4: opt4,
      Question: que,
      answer: ans
    });

  }
  async p() {
    const { new_question, new_option1, new_option2, new_option3, new_option4, new_answer, question, option1, option2, option3, option4, answer, flag } = this.state;
    console.log("I am in p");
    var que, opt1, opt2, opt3, opt4, ans;
    que = new_question;
    opt1 = new_option1;
    opt2 = new_option2;
    opt3 = new_option3;
    opt4 = new_option4;
    ans = new_answer;
    if (new_question === null) {
      console.log("new_question is null");
      que = question;
    }
    if (new_option1 === null) {
      console.log("new_question is null");
      opt1 = option1;
    }
    if (new_option2 === null) {
      console.log("new_question is null");
      opt2 = option2;
    }
    if (new_option3 === null) {
      console.log("new_question is null");
      opt3 = option3;
    }
    if (new_option4 === null) {
      console.log("new_question is null");
      opt4 = option4;
    }
    if (new_answer === null) {
      console.log("new_question is null");
      ans = answer;
    }
    console.log("answer:");
    console.log('question:', que, "option1:", opt1);
    console.log("new_que:", new_question, "question:", question);
    this.editdata(que, opt1, opt2, opt3, opt4, ans);
    await this.fetch_question();
    await this.setState({
      question: que,
      option1: opt1,
      option2: opt2,
      option3: opt3,
      option4: opt4,
      answer: ans
    });
  }
  render() {
    const { question, option1, option2, option3, option4, score, min, sec, i, num_que, answer } = this.state;
    const { currentQuesObj, currentTestIndex } = this.props;
    console.log("i=", i);

    var x = null;
    var y = <button
      className="btn btn-success pull-right"
      onClick={this.next.bind(this)}
    >
      Next Question <i className="fa fa-forward" />
    </button>
    if (i > 0) {
      x = <button
        className="btn btn-success pull-left"
        onClick={this.prev.bind(this)}
      >
        Previous Question <i className="fa fa-angle-double-left" />
      </button>
    }
    console.log("i=", i);
    if (num_que - 1 === i) {
      y = null;
    }
    else {
      y = <button
        className="btn btn-success pull-right"
        onClick={this.next.bind(this)}
      >
        Next Question
      </button>
    }
    console.log("list:", this.state.list_que);
    return (

      <div>
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
                  {/* {min} : {sec} */}
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
                  {/* <label className="btn btn-lg btn-info btn-block">
                    <span className="btn-label">
                      <input type="radio" name="option" value="4" />
                      <i></i>Answer:
                    </span>
                    <span>{answer}</span>
                  </label> */}
                  <label>Answer:  {answer}</label>

                  <div>
                    {y}
                  </div>
                  <br />
                  <br />
                  <div>
                    <button
                      className="btn btn-success pull-right"
                      onClick={this.edit.bind(this)}
                    >
                      Edit Question
                    </button>
                  </div>

                  <br />
                  <div>
                    {x}
                  </div>
                  <br />
                  {<button
                    className="btn btn-success pull-right"
                    onClick={() => {
                      this.props.backToTest(false);
                    }}
                  >
                    <i className="fa fa-angle-double-left" /> Back to Tests
                  </button>}
                  <br />
                  <br />
                </div>
              </div>
            </div>

            <div id="editContainer" style={{ display: "none" }}>
              <div>
                <h3 className="text-center ">Edit Question</h3>
                <br />
                <div className="row">
                  <div className="col-md-4">
                    <label htmlFor="name">Question:</label>
                    <input
                      type="text"
                      onChange={e => {
                        this.setState({ new_question: e.target.value });
                      }}
                      autoFocus={true}
                      className="form-control"
                      placeholder={question}
                    />
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-md-4">
                    <label htmlFor="name">Option1:</label>
                    <input
                      type="text"
                      onChange={e => {
                        this.setState({ new_option1: e.target.value });
                      }}
                      autoFocus={true}
                      className="form-control"
                      placeholder={option1}
                    />
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-md-4">
                    <label htmlFor="name">Option2:</label>
                    <input
                      type="text"
                      onChange={e => {
                        this.setState({ new_option2: e.target.value });
                      }}
                      autoFocus={true}
                      className="form-control"
                      placeholder={option2}
                    />
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-md-4">
                    <label htmlFor="name">Option3:</label>
                    <input
                      type="text"
                      onChange={e => {
                        this.setState({ new_option3: e.target.value });
                      }}
                      autoFocus={true}
                      className="form-control"
                      placeholder={option3}
                    />
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-md-4">
                    <label htmlFor="number">Option4:</label>
                    <input
                      type="text"
                      onChange={e => {
                        this.setState({ new_option4: e.target.value });
                      }}
                      className="form-control"
                      placeholder={option4}
                    />
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-md-4">
                    <label htmlFor="number">Answer:</label>
                    <input
                      type="text"
                      onChange={e => {
                        this.setState({ new_answer: e.target.value });
                      }}
                      className="form-control"
                      placeholder={answer}
                    />
                  </div>
                </div>
                <br />
                <div>
                  <div className="row">
                    <div className="col">
                      <button className="btn btn-primary" onClick={this.p}>
                        Edit <i className="fa fa-database" />
                      </button>
                    </div>
                  </div>
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
                    {/* {currentQuesObj.tests[currentTestIndex].time / 60} Minute(s) */}
                </p>
                {/* <p>Questions: {currentQuesObj.tests[currentTestIndex].questions}</p> */}
                {
                  <h3>
                    Your Score:{score}
                  </h3>
                  /* {score < 70 ? (
                  <h3>You are fail with grades {score}%</h3>
                ) : (
                    <h3>You are pass with grades {score}%</h3>
                  )} */}
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MCQs;





// import React, { Component } from "react";

// class MCQs extends Component {
//   static defaultProps = {
//     currentQuesObj: {},
//     currentTestIndex: 0
//   };
//   constructor(props) {
//     super(props);
//     const { currentQuesObj, currentTestIndex } = this.props;
//     this.state = {
//       question: currentQuesObj.tests[currentTestIndex].quiz_questions[0].quiz,
//       opt1: currentQuesObj.tests[currentTestIndex].quiz_questions[0].option1,
//       opt2: currentQuesObj.tests[currentTestIndex].quiz_questions[0].option2,
//       opt3: currentQuesObj.tests[currentTestIndex].quiz_questions[0].option3,
//       opt4: currentQuesObj.tests[currentTestIndex].quiz_questions[0].option4,
//       i: 0,
//       correct: 0,
//       score: 0,
//       min: null,
//       sec: null
//     };
//     this.minute = Math.ceil(currentQuesObj.tests[currentTestIndex].time / 60);
//     this.second = 1;
//     this.timeStart = null;
//     this.next = this.next.bind(this);
//     this.timer = this.timer.bind(this);
//   }

//   next() {
//     const { currentQuesObj, currentTestIndex } = this.props;
//     var { i, correct, score } = this.state;

//     var quiz_questions = currentQuesObj.tests[currentTestIndex].quiz_questions;

//     var radioBtn = document.querySelector("input[name='option']:checked");
//     if (radioBtn == null) {
//       alert("select value");
//     } else {
//       if (quiz_questions[i].answer.match(radioBtn.value)) {
//         //console.log("quiz_questions[i].answer**", quiz_questions[i].answer);
//         // console.log(
//         //   "answer**",
//         //   quiz_questions[i].answer
//         // );
//         this.setState({ correct: ++correct });
//       }

//       if (quiz_questions.length - 1 === i) {
//         document.getElementById("quizContainer").style.display = "none";
//         document.getElementById("resultContainer").style.display = "block";
//         // console.log("value equal");
//         // console.log(this.state.correct);
//         score = correct * (100 / quiz_questions.length).toFixed(2);
//         //console.log(quiz_questions.length);
//         this.setState({ score });
//       } else {
//         // document.querySelector("input[name='option']:checked").checked = false;
//         i++;
//         const question = quiz_questions[i].quiz;
//         const option1 = quiz_questions[i].option1;
//         const option2 = quiz_questions[i].option2;
//         const option3 = quiz_questions[i].option3;
//         const option4 = quiz_questions[i].option4;
//         const answer = quiz_questions[i].answer;
//         this.setState({
//           question,
//           opt1: option1,
//           opt2: option2,
//           opt3: option3,
//           opt4: option4,
//           i: i
//         });
//       }
//     }
//   }

//   componentDidMount() {
//     this.timer();
//   }

//   timer() {
//     this.timeStart = setInterval(() => {
//       this.setState({
//         min: this.minute,
//         sec: this.second
//       });
//       this.second--;
//       if (this.second === 0) {
//         this.second = 60;
//         this.minute--;
//         this.setState({
//           sec: this.second,
//           min: this.minute
//         });
//         if (this.minute < 0) {
//           clearInterval(this.timeStart);
//           const { currentQuesObj, currentTestIndex } = this.props;
//           var quiz_questions =
//             currentQuesObj.tests[currentTestIndex].quiz_questions;
//           var { score, correct } = this.state;
//           this.setState({
//             min: 0,
//             sec: 0
//           });
//           score = correct * (100 / quiz_questions.length).toFixed(2);
//           this.setState({
//             score
//           });

//           document.getElementById("quizContainer  ").style.display = "none";
//           document.getElementById("resultContainer").style.display = "block";
//         }
//       }
//     }, 1000);
//   }

//   render() {
//     const { question, opt1, opt2, opt3, opt4, score, min, sec } = this.state;
//     const { currentQuesObj, currentTestIndex } = this.props;
//     return (
//       <div>
//         <div className="col-md-12">
//           <div className="col" id="content">
//             <div id="quizContainer">
//               <div className="modal-header">
//                 <h5>
//                   <i className="fa fa-question-circle" />
//                   <span> </span>
//                   <span className="label label-warning">{question}</span>
//                 </h5>
//                 <h5>
//                   {min} : {sec}
//                 </h5>
//               </div>
//               <div className="modal-body">
//                 <div className="quiz" id="quiz" data-toggle="buttons">
//                   <label className="btn btn-lg btn-info btn-block">
//                     <span className="btn-label">
//                       <input type="radio" name="option" value="1" />
//                       <br />
//                       <i className="fa fa-arrow-right" />
//                     </span>
//                     <span>{opt1}</span>
//                   </label>
//                   <label className="btn btn-lg btn-info btn-block">
//                     <span className="btn-label">
//                       <input type="radio" name="option" value="2" />
//                       <br />
//                       <i className="fa fa-arrow-right" />
//                     </span>
//                     <span>{opt2}</span>
//                   </label>
//                   <label className="btn btn-lg btn-info btn-block">
//                     <span className="btn-label">
//                       <input type="radio" name="option" value="3" />
//                       <br />
//                       <i className="fa fa-arrow-right" />
//                     </span>
//                     <span>{opt3}</span>
//                   </label>
//                   <label className="btn btn-lg btn-info btn-block">
//                     <span className="btn-label">
//                       <input type="radio" name="option" value="4" />
//                       <br />
//                       <i className="fa fa-arrow-right" />
//                     </span>
//                     <span>{opt4}</span>
//                   </label>
//                   <button
//                     className="btn btn-success pull-right"
//                     onClick={this.next.bind(this)}
//                   >
//                     Next Question <i className="fa fa-angle-double-right" />
//                   </button>

//                   <br />
//                   <br />
//                 </div>
//               </div>
//             </div>
//             <div id="resultContainer" style={{ display: "none" }}>
//               <div className="modal-header">
//               <h2>{currentQuesObj.quizName} Quiz</h2>
//                   <button
//                     className="btn btn-secondary pull-right"
//                     onClick={() => {
//                       this.props.backToDashboard(false);
//                     }}
//                   >
//                     Goto Dashboard <i className="fa fa-undo" />
//                   </button>
//                 </div>
//                 <div className="modal-body">
//                   <h3>{currentQuesObj.tests[currentTestIndex].name}</h3>
//                   <p>
//                     Time:
//                     {currentQuesObj.tests[currentTestIndex].time / 60} Minute(s)
//                   </p>
//                   <p>Questions: {currentQuesObj.tests[currentTestIndex].questions}</p>
//                   {score < 70 ? (
//                     <h3>You are fail with grades {score}%</h3>
//                   ) : (
//                     <h3>You are pass with grades {score}%</h3>
//                   )}
//                   <hr />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default MCQs;
