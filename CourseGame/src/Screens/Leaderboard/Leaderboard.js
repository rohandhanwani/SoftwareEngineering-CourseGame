import React, { Component } from "react";
import firebase from "../../config/Fire";

class Leaderboard extends Component {
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
            num_que: null
        };
        this.minute = 120;
        this.time;
        this.second = 1;
        this.timeStart = null;
        this.next = this.next.bind(this);
        this.timer = this.timer.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

        this.minute = parseInt(time) / 60;
        this.time = parseInt(time) / 60;
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
        //this.fetch_question();
        //this.timer();
        console.log("I am in Leaderboard");

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
                    //score = correct * (100 / quiz_questions.length).toFixed(2);
                    this.setState({
                        score
                    });

                    document.getElementById("quizContainer").style.display = "none";
                    document.getElementById("resultContainer").style.display = "block";
                }
            }
        }, 1000);
    }
    handleSubmit() {
        console.log("Handle Submit");

    }
    viewLeader() {
        console.log("View Leaderboard");
        //<Lead />
    }
    render() {
        return (
            <div>
                <h2>Leaderboard</h2>
            </div>
        );

        // const { question, option1, option2, option3, option4, score, min, sec } = this.state;
        // const { currentQuesObj, currentTestIndex } = this.props;
        // return (
        //     <div>
        //         <div className="col-md-12">
        //             <div className="col" id="content">
        //                 <div id="quizContainer">
        //                     <div className="modal-header">
        //                         <h5>
        //                             <i className="fa fa-question-circle" />
        //                             <span> </span>
        //                             <span className="label label-warning">{question}</span>
        //                         </h5>
        //                         <h5>
        //                             {min} : {sec}
        //                         </h5>
        //                     </div>
        //                     <div className="modal-body">
        //                         <div className="quiz" id="quiz" data-toggle="buttons">
        //                             <label className="btn btn-lg btn-info btn-block">
        //                                 <span className="btn-label">
        //                                     <input type="radio" name="option" value="1" />
        //                                     <br />
        //                                     <i className="fa fa-arrow-right" />
        //                                 </span>
        //                                 <span>{option1}</span>
        //                             </label>
        //                             <label className="btn btn-lg btn-info btn-block">
        //                                 <span className="btn-label">
        //                                     <input type="radio" name="option" value="2" />
        //                                     <br />
        //                                     <i className="fa fa-arrow-right" />
        //                                 </span>
        //                                 <span>{option2}</span>
        //                             </label>
        //                             <label className="btn btn-lg btn-info btn-block">
        //                                 <span className="btn-label">
        //                                     <input type="radio" name="option" value="3" />
        //                                     <br />
        //                                     <i className="fa fa-arrow-right" />
        //                                 </span>
        //                                 <span>{option3}</span>
        //                             </label>
        //                             <label className="btn btn-lg btn-info btn-block">
        //                                 <span className="btn-label">
        //                                     <input type="radio" name="option" value="4" />
        //                                     <br />
        //                                     <i className="fa fa-arrow-right" />
        //                                 </span>
        //                                 <span>{option4}</span>
        //                             </label>
        //                             <button
        //                                 className="btn btn-success pull-right"
        //                                 onClick={this.next.bind(this)}
        //                             >
        //                                 Next Question <i className="fa fa-angle-double-right" />
        //                             </button>

        //                             <br />
        //                             <br />
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <div id="resultContainer" style={{ display: "none" }}>
        //                     <div className="modal-header">
        //                         <h2>{'Week' + this.props.selected_week} Quiz</h2>
        //                         <button
        //                             className="btn btn-secondary pull-right"
        //                             onClick={() => {
        //                                 this.props.backToDashboard(false);
        //                             }}
        //                         >
        //                             Goto Dashboard <i className="fa fa-undo" />
        //                         </button>
        //                     </div>
        //                     <div className="modal-body">
        //                         <h3>{/*currentQuesObj.tests[currentTestIndex].name*/}</h3>
        //                         <p>
        //                             Time:
        //             {this.time} Minute(s)
        //         </p>
        //                         {/* <p>Questions: {currentQuesObj.tests[currentTestIndex].questions}</p> */}
        //                         {score < 70 ? (
        //                             <h3>You are fail with grades {score}</h3>

        //                         ) : (
        //                                 <h3>You are pass with grades {score}</h3>
        //                             )}
        //                         {/* <form ref="form" onSubmit={this.handleSubmit}>
        //           <button className="btn btn-secondary pull-right" type="submit">Do the thing</button>
        //         </form> */}
        //                         <hr />

        //                         <br />
        //                         <button className="btn btn-secondary pull-right" onClick={this.handleSubmit}>Submit Test</button>
        //                         <br />
        //                         <button className="btn btn-secondary pull-left" onClick={this.viewLeader}>View Leaderboard</button>
        //                         <br />
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // );
    }
}

export default Leaderboard;
