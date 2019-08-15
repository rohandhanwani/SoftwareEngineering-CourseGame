import React, { Component } from "react";
import MCQs from "../MCQs/MCQs";
import coverPic1 from "../../images/quiz.jpg";
import coverPic2 from "../../images/test.png";
import firebase from "../../config/Fire"
import { Formik, Field, Form, ErrorMessage } from "formik"
import { resolve } from "path";
import { SSL_OP_EPHEMERAL_RSA } from "constants";
import * as Yup from "yup";


class QuizList extends Component {
  constructor() {
    super();
    this.state = {
      new_question: null,
      new_option1: null,
      new_option2: null,
      new_option3: null,
      new_option4: null,
      new_answer: null,
      selected_week: null,
      selected_assignment: null,
      flag1: 0,
      flag: true,
      questions: null,
      quiz_list: [
        //{ quizName: "Week 1", tests: 2 },
        //{ quizName: "Week 2", tests: 1 },
        //{ quizName: "Week 3", tests: 3 }
      ],
      quiz_info: [
        /*{
          quizName: "Week 1",
          tests: [
            {
              name: "Test 1",
              questions: 5,
              time: 60,
              quiz_questions: [
                {
                  quiz: "What is abbreviation of HTML?",
                  option1: "Hyper Type Multi Language",
                  option2: "Higher Text Multiple Language",
                  option3: "Hyper Text Markup Language",
                  option4: "Hollow Type Markup Language ",
                  answer: "3"
                },
                {
                  quiz: "How many types of markup in HTML?",
                  option1: "Both",
                  option2: "1 - opening and closing markup only",
                  option3: "1 - self closing markups only",
                  option4: "None of above",
                  answer: "1"
                },
                {
                  quiz: "<iframe> is HTML5 markup",
                  option1: "False",
                  option2: "True",
                  option3: "Neither true nor false",
                  option4: "Not Sure",
                  answer: "2"
                },
                {
                  quiz: "<div> and <span> are inline elements?",
                  option1: "True",
                  option2: "False",
                  option3: "Neither True nor false",
                  option4: "None of above",
                  answer: "3"
                },
                {
                  quiz: "HTML must need body markup. Why? Because:",
                  option1: "It did'nt needs to show the markups inside it.",
                  option2: "It needs to show the markups inside it.",
                  option3: "It needs <head> element",
                  option4: "None of above",
                  answer: "2"
                }
              ]
            },
            {
              name: "Test 2",
              questions: 10,
              time: 120,
              quiz_questions: [
                {
                  quiz:
                    "The external JavaScript file must contain the <script> tag.",
                  option1: "True",
                  option2: "False",
                  option3: "Neither true nor false",
                  option4: "None of above",
                  answer: "1"
                },
                {
                  quiz:
                    "Choose the correct HTML element for the largest heading:",
                  option1: "<h6>",
                  option2: "<heading>",
                  option3: "<h1>",
                  option4: "<head>",
                  answer: "3"
                },
                {
                  quiz:
                    "What is the correct HTML element for inserting a line break?",
                  option1: "<break>",
                  option2: "<br>",
                  option3: "<lnbr>",
                  option4: "none of above",
                  answer: "2"
                },
                {
                  quiz:
                    "What is the correct HTML for adding a background color?",
                  option1: "<background>yellow</background>",
                  option2: '<body style="bg-color:yellow;">',
                  option3: '<body bg="yellow">',
                  option4: '<body style="background-color:yellow;">',
                  answer: "4"
                },
                {
                  quiz:
                    "Choose the correct HTML element to define important text",
                  option1: "<strong>",
                  option2: "<b>",
                  option3: "<important>",
                  option4: "<i>",
                  answer: "1"
                },
                {
                  quiz:
                    "Choose the correct HTML element to define emphasized text",
                  option1: "<i>",
                  option2: "<emphasize>",
                  option3: "<italic>",
                  option4: "<em>",
                  answer: "4"
                },
                {
                  quiz: "What is the correct HTML for creating a hyperlink?",
                  option1: "<a>http://www.w3schools.com</a>",
                  option2: ' <a href="http://www.w3schools.com">W3Schools</a>',
                  option3:
                    '<a name="http://www.w3schools.com">W3Schools.com</a>',
                  option4:
                    '<a url="http://www.w3schools.com">W3Schools.com</a>',
                  answer: "2"
                },
                {
                  quiz: "Which character is used to indicate an end tag?",
                  option1: "<",
                  option2: "*",
                  option3: "/",
                  option4: "^",
                  answer: "3"
                },
                {
                  quiz: "How can you open a link in a new tab/browser window?",
                  option1: '<a href="url" new>',
                  option2: '<a href="url" target="_blank">',
                  option3: '<a href="url" target="new">',
                  option4: '<a href="url" target="new_blank">',
                  answer: "2"
                },
                {
                  quiz: "Which of these elements are all <table> elements?",
                  option1: "<table><head><tfoot>",
                  option2: "<table><tr><td>",
                  option3: "<table><tr><tt>",
                  option4: "<thead><body><tr>",
                  answer: "2"
                }
              ]
            }
          ]
        },
        {
          quizName: "Week 2",
          tests: [
            {
              name: "Test 1",
              questions: 10,
              time: 120,
              quiz_questions: [
                {
                  quiz: "What does CSS stand for?",
                  option1: "Colorful Style Sheets",
                  option2: "Creative Style Sheets",
                  option3: "Cascading Style Sheets",
                  option4: "Computer Style Sheets",
                  answer: "3"
                },
                {
                  quiz:
                    "Where in an HTML document is the correct place to refer to an external style sheet?",
                  option1: "In the <head> section",
                  option2: "At the end of the document",
                  option3: "In the <body> section",
                  option4: "None of above",
                  answer: "1"
                },
                {
                  quiz:
                    "Which HTML tag is used to define an internal style sheet?",
                  option1: "<script>",
                  option2: "<style>",
                  option3: "<css>",
                  option4: "<pre>",
                  answer: "2"
                },
                {
                  quiz: "Which is the correct CSS syntax?",
                  option1: "{body;color:black;}",
                  option2: "body:color=black;",
                  option3: "{body:color=black;}",
                  option4: "body {color: black;}",
                  answer: "4"
                },
                {
                  quiz:
                    "Which property is used to change the background color?",
                  option1: "color",
                  option2: "bgcolor",
                  option3: "background-color",
                  option4: "backgroundColor",
                  answer: "3"
                },
                {
                  quiz: "Which CSS property controls the text size?",
                  option1: "font-size",
                  option2: "text-style",
                  option3: "text-size",
                  option4: "font-style",
                  answer: "1"
                },
                {
                  quiz:
                    "What is the correct CSS syntax for making all the <p> elements bold?",
                  option1: '<p style="text-size:bold;">',
                  option2: "p {text-size:bold;}",
                  option3: '<p style="font-size:bold;">',
                  option4: "p {font-weight:bold;}",
                  answer: "4"
                },
                {
                  quiz: "How do you display hyperlinks without an underline?",
                  option1: "a {decoration:no-underline;}",
                  option2: "a {text-decoration:no-underline;}",
                  option3: "a {underline:none;}",
                  option4: "a {text-decoration:none;}",
                  answer: "4"
                },
                {
                  quiz:
                    "How do you make each word in a text start with a capital letter?",
                  option1: "transform:capitalize",
                  option2: "text-transform:capitalize",
                  option3: "You can't do that with CSS",
                  option4: "text-style:captialize",
                  answer: "2"
                }
              ]
            }
          ]
        },
        {
          quizName: "Week 3",
          tests: [
            {
              name: "Test 1",
              questions: 5,
              time: 60,
              quiz_questions: [
                {
                  quiz:
                    'What is the correct JavaScript syntax to change the content of this <p id="demo">This is a demonstration.</p> HTML element?',
                  option1:
                    'document.getElementByName("p").innerHTML = "Hello World!";',
                  option2:
                    'document.getElement("p").innerHTML = "Hello World!";',
                  option3:
                    'document.getElementById("demo").innerHTML = "Hello World!";',
                  option4: '#demo.innerHTML = "Hello World!";',
                  answer: "3"
                },
                {
                  quiz: "Where is the correct place to insert a JavaScript?",
                  option1:
                    "Both the <head> section and the <body> section are correct",
                  option2: "The <body> section",
                  option3: "The <head> section",
                  option4: "afer the <!DOCTYPE html> declaration",
                  answer: "1"
                },
                {
                  quiz: 'How do you write "Hello World" in an alert box?',
                  option1: 'alert("Hello World");',
                  option2: 'alertBox("Hello World");',
                  option3: 'msgBox("Hello World");',
                  option4: 'msg("Hello World");',
                  answer: "1"
                },
                {
                  quiz: "How do you create a function in JavaScript?",
                  option1: "function = myFunction()",
                  option2: "function myFunction()",
                  option3: "function : myFunction()",
                  option4: "function => myFunction()",
                  answer: "2"
                },
                {
                  quiz: "How to write an IF statement in JavaScript?",
                  option1: "if i = 5 then",
                  option2: "if i = 5",
                  option3: "if (i == 5)",
                  option4: "if i == 5 then",
                  answer: "3"
                }
              ]
            },
            {
              name: "Test 2",
              questions: 6,
              time: 120,
              quiz_questions: [
                {
                  quiz:
                    'How to write an IF statement for executing some code if "i" is NOT equal to 5?',
                  option1: "if i <> 5",
                  option2: "if (i != 5)",
                  option3: "if (i <> 5)",
                  option4: "if i =! 5 then",
                  answer: "2"
                },
                {
                  quiz: "How does a WHILE loop start?",
                  option1: "while (i <= 10; i++)",
                  option2: "while i = 1 to 10",
                  option3: "while (i <= 10)",
                  option4: "none of above",
                  answer: "3"
                },
                {
                  quiz: "How does a FOR loop start?",
                  option1: "for (i = 0; i <= 5; i++)",
                  option2: "for i = 1 to 5",
                  option3: "for (i = 0; i <= 5)",
                  option4: "for (i <= 5; i++)",
                  answer: "1"
                },
                {
                  quiz: "How can you add a comment in a JavaScript?",
                  option1: "//This is a comment",
                  option2: "<!--This is a comment-->",
                  option3: "'This is a comment",
                  option4: "#This is a comment#",
                  answer: "1"
                },
                {
                  quiz: "What is the correct way to write a JavaScript array?",
                  option1: 'var colors = "red", "green", "blue"',
                  option2:
                    'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")',
                  option3: 'var colors = (1:"red", 2:"green", 3:"blue")',
                  option4: 'var colors = ["red", "green", "blue"]',
                  answer: "4"
                },
                {
                  quiz:
                    "How do you round the number 7.25, to the nearest integer?",
                  option1: "Math.rnd(7.25)",
                  option2: "rnd(7.25)",
                  option3: "Math.round(7.25)",
                  option4: "round(7.25)",
                  answer: "3"
                }
              ]
            },
            {
              name: "Test 3",
              questions: 5,
              time: 60,
              quiz_questions: [
                {
                  quiz:
                    "How do you find the number with the highest value of x and y?",
                  option1: "Math.ceil(x, y)",
                  option2: "Math.max(x, y)",
                  option3: "top(x, y)",
                  option4: "ceil(x, y)",
                  answer: "1"
                },
                {
                  quiz:
                    'What is the correct JavaScript syntax for opening a new window called "w2" ?',
                  option1: 'w2 = window.new("http://www.w3schools.com");',
                  option2: 'w2 = window.open("http://www.w3schools.com");',
                  option3: 'w2 = window.create("http://www.w3schools.com");',
                  option4: "none of above",
                  answer: "2"
                },
                {
                  quiz: "JavaScript is the same as Java.",
                  option1: "True",
                  option2: "False",
                  option3: "Neither true nor false",
                  option4: "none of above",
                  answer: "2"
                },
                {
                  quiz:
                    "Which event occurs when the user clicks on an HTML element?",
                  option1: "onmouseclick",
                  option2: "onmouseover",
                  option3: "onchange",
                  option4: "onclick",
                  answer: "4"
                },
                {
                  quiz: "How do you declare a JavaScript variable?",
                  option1: "v carName;",
                  option2: "variable carName;",
                  option3: "var carName;",
                  option4: "variables carName;",
                  answer: "3"
                }
              ]
            }
          ]
        }*/
      ],
      saveSelectedQuizObj: null,
      renderSelectedTestObj: false,
      renderMCQs: false,
      currentTestIndex: null
    };
    this.back = this.back.bind(this);
    this.backToDashboard = this.backToDashboard.bind(this);
    this.editAssignment = this.editAssignment.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.fetch_num_ques = this.fetch_num_ques.bind(this);
    this.ipEnter = this.ipEnter.bind(this);
    this.g = this.g.bind(this);
    this.getMetadata = this.getMetadata.bind(this);
    this.f = this.f.bind(this);
    this.j = this.j.bind(this);
    this.p = this.p.bind(this);
    this.backToTest = this.backToTest.bind(this);
    this.addAssignment = this.addAssignment.bind(this);
    this.validateAnswer = this.validateAnswer.bind(this);

  }
  getWeekdata = async (index) => {
    //let a=firebase.database().ref('coursegame-6af5a').child('w1').child('Weeknum');
    //console.log(a);
    const f = index + 1;
    var num_test = null;
    console.log("f=", f, "index:", index);
    var query = firebase.database().ref("MetaData").child("Weeks").child('' + index).child("Week" + f);
    await query.once("value").then(function (snapshot) {
      console.log(snapshot.val());
      num_test = snapshot.val().num_assignments;
      console.log("num_test", num_test);
    });
    console.log("num_test===", num_test);
    var arr = [];
    var i = null;
    var query2 = null;
    for (i = 1; i <= num_test; i++) {
      var u = i - 1;
      query2 = query.child('assignments').child('' + u).child('assignment' + i);
      await query2.once("value").then(function (snapshot) {
        console.log(snapshot.val());
        arr.push({

          testName: snapshot.val().Name,
          num_que: snapshot.val().num_ques,
          total_time: snapshot.val().time
        })

      });
    }
    console.log("arr:", arr);
    this.setState({
      quiz_info: arr
    })
    console.log("q_info:", this.state.quiz_info);
    this.setState({
      selected_week: f,
      saveSelectedQuizObj: this.state.quiz_info,
      renderSelectedTestObj: true
    });
    // firebase.database().ref('Week ' + f).on('value', snapshot => {
    //   const g = this.state.quiz_list[f].tests;
    //   console.log('&&&&', g);
    //   console.log('Week' + index);
    //   console.log('!!!' + snapshot.val());
    //   let arr = this.state.quiz_info;
    //   console.log('@@@@@@', snapshot.val());
    //   snapshot.forEach(child1 => {
    //     console.log('____', child1.val().Name);
    //     arr.push({

    //       testName: child1.val().Name,
    //       num_que: child1.val().num_ques,
    //       total_time: child1.val().Total_time
    //     })

    //   })
    //   console.log('arr:', arr);
    //   this.setState({
    //     quiz_info: arr
    //   })
    // })

  }
  // saving selected quiz to state
  updateQuizInfoState(index) {
    const { quiz_info } = this.state;
    this.getWeekdata(index);
    console.log("quiz_info=", this.state.quiz_info);
    // this.setState({
    //   selected_week: index + 1,
    //   saveSelectedQuizObj: quiz_info,
    //   renderSelectedTestObj: true
    // });
  }

  // back button function
  back() {
    this.setState({
      renderSelectedTestObj: false,
      quiz_info: [],
      renderMCQs: false
    });
  }

  backToDashboard(param) {
    this.setState({ renderMCQs: param });
  }
  testEnter = async () => {
    var name = prompt("Enter test Name", "Algorithms");
    var flag = false;
    var time;
    while (flag === false) {
      time = prompt("Enter test Duration(in seconds)", "60");
      if (time === null) {
        return;
      }
      else if (isNaN(parseInt(time))) {
        window.alert('Invalid Input');
      }
      else {
        flag = true;
      }
    }

    var num = 0;
    console.log(name, time, num);
    console.log("week:", this.state.selected_week);
    var week = this.state.selected_week;
    var e = week - 1;
    var arr = [];
    var num_test = null;
    var tests = [];
    var query = firebase.database().ref('MetaData').child('Weeks').child('' + e).child('Week' + week);
    await query.once("value").then(function (snapshot) {
      console.log("***", snapshot.val());
      num_test = snapshot.val().num_assignments;
    });
    var i;
    for (i = 0; i < num_test; i++) {
      await query.child('assignments').child('' + i).once("value").then(function (snapshot) {
        console.log('@@@@@', snapshot.val());
        tests.push(snapshot.val());
      })
    }
    console.log("tests:", tests, "num:", num_test);
    var y = num_test + 1;
    tests.push({
      ['assignment' + y]: { Name: name, num_ques: num, time: time }
    })
    console.log("new_arr", tests);
    // await query.once("value").then(function (snapshot) {
    //   console.log('!!!', snapshot.val());
    //   snapshot.forEach(child1 => {
    //     console.log(child1.val());
    //     arr.push({
    //       [child1.key]: child1.val()
    //     })

    //   })
    // }va
    // var x = arr.pop();
    // x = x.num_assignments;
    //console.log('arr:', arr);
    // console.log("x:", x);
    // var l = x + 1;
    // var y = { Name: name, num_ques: num, time: time };
    // var g = {
    //   ['assignment' + l]: y
    // }
    // arr.push(g);
    // arr.push({ num_assignments: l });
    // console.log('#####newarr:', arr);
    var h = num_test + 1;
    var query2 = firebase.database().ref('MetaData').child('Weeks').child('' + e).child('Week' + week);
    query2.set({
      assignments: tests,
      num_assignments: h
    })
    this.getWeekdata(this.state.selected_week - 1);
  }
  j() {
    this.testEnter();
  }
  renderQuizInfo() {
    const { saveSelectedQuizObj } = this.state;
    const { add, edit } = this.props;
    var p = null;
    if (add === true) {
      p = "Add to";
    }
    else {
      p = "Edit in";
    }
    return (
      <div>
        <h2>Week {this.state.selected_week} Quiz</h2>

        <div className="row">
          {saveSelectedQuizObj.map((test, i) => {
            console.log("test:", test);

            return (
              <div
                className="col-md-4"
              //key={`${saveSelectedQuizObj.quizName}_${test.name}`}
              >
                <div className="card" style={{ width: "18rem" }}>
                  <img
                    className="card-img-top"
                    src={coverPic2}
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{test.testName}</h5>
                    <p className="card-text">
                      Total Questions: {test.num_que}
                    </p>
                    <p>Total Time: {test.total_time} Minutes</p>
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        this.setState({
                          renderMCQs: true,
                          currentTestIndex: i,
                          selected_assignment: i,
                          renderSelectedTestObj: false
                        });
                      }}
                    >
                      {p} Quiz {i + 1} <i className=" fa fa-paper-plane" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <br />
        <div>
          {this.props.add ? (<button className="btn btn-secondary" onClick={this.j}>
            Add Test
          </button>) : (null)}
        </div>

        <br />
        <button className="btn btn-secondary" onClick={this.back}>
          Back <i className="fa fa-backward" />
        </button>
      </div>
    );
  }
  async getMetadata() {
    //let a=firebase.database().ref('coursegame-6af5a').child('w1').child('Weeknum');
    //console.log(a);
    var query = firebase.database().ref('MetaData');
    var res = null;
    var num_weeks = null;
    var i = null;
    var query2 = null;
    var arr = [];
    await query.once("value").then(function (snapshot) {
      console.log(snapshot.val());
      num_weeks = snapshot.val().num_weeks;
      console.log("num_weeks", num_weeks);
    });
    console.log('num_weeks:', num_weeks);
    var res2 = null;
    var x = null;
    for (i = 1; i <= num_weeks; i++) {
      var e = i - 1;
      console.log('e:', e);
      query2 = query.child('Weeks').child('' + e).child('Week' + i);
      await query2.once("value").then(function (snapshot) {
        res2 = snapshot.val();
        console.log("**values=", snapshot.val());
        x = { quizName: "Week " + i, tests: snapshot.val().num_assignments };
        arr.push(x);
      })
      console.log(arr);
      this.setState({
        quiz_list: arr
      })

    }
    // firebase.database().ref('w1').child('Weeknum').on('value', snapshot => {
    //   console.log(snapshot.val());
    //   let arr = this.state.quiz_list;
    //   // console.log(snapshot.val());
    // snapshot.forEach(child1 => {
    //   console.log(child1.val());
    //   arr.push({
    //     quizName: child1.key,
    //     tests: child1.val()
    //   })

    // })
    //   this.setState({
    //     quiz_list: arr
    //   })
    // })
  }
  backToTest(b) {
    this.setState({
      renderMCQs: b,
      renderSelectedTestObj: !b
    })
  }
  editAssignment = () => {
    const {
      renderSelectedTestObj,
      renderMCQs,
      saveSelectedQuizObj,
      currentTestIndex,

    } = this.state;
    return (
      <div>
        <MCQs
          currentQuesObj={saveSelectedQuizObj}
          currentTestIndex={currentTestIndex}
          backToDashboard={this.backToDashboard}
          selected_assignment={this.state.selected_assignment}
          selected_week={this.state.selected_week}
          backToTest={this.backToTest}
          id={this.props.id}
          w={this.props.selected_week}
          a={this.props.selected_assignment}
          name={this.props.name}

        />
      </div>
    );
  }

  async ipEnter() {
    console.log("Rohan");
    var name = prompt("Please enter name of test for the week:");
    var num = 0;
    var time;
    var flag = false;
    while (flag == false) {
      time = prompt("Please enter the duration of the test (in minutes)");
      var x = parseInt(time);
      if (time === null) {
        return;
      }
      else if (isNaN(parseInt(time))) {
        console.log('Karan')
        window.alert("Time must be integer");
        return;
      }
      else if (time - x !== 0) {
        window.alert("Time must be integer");
        return;

      }
      else {
        flag = true;
      }
    }


    console.log('Time:', time);
    console.log('name:', name, 'time:', time, 'num', num);
    var g = { Name: name, num_ques: num, time: time };
    var h = { assignments: { 0: { assignment1: g } }, num_assignments: 1 };
    var query2 = firebase.database().ref('MetaData').child('Weeks');
    var w = null;
    var t = null;
    var arr = [];
    var x = null;
    // await query2.once("value").then(function (snapshot) {
    //   //t = snapshot.val().Weeks;
    //   snapshot.forEach(child1 => {
    //     console.log(child1.val());
    //     arr.push({
    //       [child1.key]: child1.val()
    //     })
    //   })
    //   x = snapshot.val()
    // });
    var b = null;
    await firebase.database().ref('MetaData').once("value").then(function (snapshot) {
      console.log('SSSnum:', snapshot.val());
      t = snapshot.val().num_weeks;
      b = t + 1;
    }

    )
    var i = null;
    for (i = 0; i < t; i++) {
      await query2.child('' + i).once("value").then(function (snapshot) {
        //t = snapshot.val().Weeks;
        snapshot.forEach(child1 => {
          console.log(child1.val());
          arr.push({
            [child1.key]: child1.val()
          })

        })
        x = snapshot.val()
      });
    }
    // await query2.once("value").then(function (snapshot) {
    //   //t = snapshot.val().Weeks;
    //   snapshot.forEach(child1 => {
    //     console.log(child1.val());
    //     arr.push({
    //       [child1.key]: child1.val()
    //     })

    //   })
    //   x = snapshot.val()
    // });


    console.log("arr:", arr);
    arr.push({
      ['Week' + b]: h
    })
    console.log("new_arr", arr);
    console.log('Weeks:', arr, 'b:', b);
    var query3 = firebase.database().ref('MetaData');
    query3.once("value").then(function (snapshot) {
      console.log('&&&:', snapshot.val());
    });
    query3.set({
      Weeks: arr,
      num_weeks: b
    });
    // this.setState({
    //   flag1: !this.state.flag1
    // })
    var p = 'Week12'
    // console.log('x:', x);
    // x.push({ [p]: h });
    // console.log('newx:', x);
    //var q = x + 1;
    //var p = "Week9";
    // query2.child('Weeks').child('Week' + q).set({
    //   [p]: h
    // })
    firebase.database().ref('w1').child('Weeknum').set({
      [p]: 12
    })
    console.log("arr:", arr);
    // t.push(h)
    // console.log("newt:", t);
    // // var s = w + 1;
    // var query = firebase.database().ref('MetaData').child('Weeks');
    // query.push({

    // })
    //query = firebase.database().ref('MetaData').child('Weeks').child('Week'+i).child('assignments'); 
    this.getMetadata(this.state.selected_week - 1);
  }
  componentDidCatch(error, errorInfo) {
    console.log(errorInfo);
  }
  g() {
    this.props.f();
  }
  f() {
    this.ipEnter();
  }
  renderQuizList() {
    const { quiz_list } = this.state;
    return (
      <div>
        <h2>Dashboard</h2>

        <div className="row">
          {quiz_list.map((qList, index) => {
            return (
              <div className="col-md-4" key={`${qList}_${index}`}>
                <div className="card" style={{ width: "18rem" }}>
                  <img
                    className="card-img-top"
                    src={coverPic1}
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{qList.quizName} Quiz</h5>
                    <p className="card-text">
                      Test your skills of {qList.quizName} by taking this small quiz.
                      It has {qList.tests} tests.
                    </p>
                    <button
                      className="btn btn-info"
                      onClick={this.updateQuizInfoState.bind(this, index)}
                    >
                      Next <i className=" fa fa-paper-plane" />
                    </button>
                    {/* <button className="btn btn-primary" >Next <i class=" fa fa-paper-plane"></i></button> */}
                  </div>
                </div>
              </div>
            );
          })}







        </div>
        <br />
        <div>
          <br />
          {this.props.add ? (<button
            className="btn btn-info"
            onClick={this.f}
          >
            Add Week <i className=" fa fa-paper-plane" />
          </button>) : (
              null
            )


          }
        </div>
        <div>
          <br />
          <button className="btn btn-secondary" onClick={this.g}>
            Back <i className="fa fa-backward" />
          </button>

        </div>
      </div>
    );
  }


  async getQuestions(name, time, num) {
    var curr_week = this.state.selected_week;
    var curr_test = this.state.selected_assignment + 1;
    firebase.database().ref('MetaData').child('Weeks').child('Week' + curr_week).child('assignments').child('assignment' + curr_test).on('value', snapshot => {
      console.log('****', snapshot.val());
      async (dd) => {
        name = await snapshot.val().Name;
        time = await snapshot.val().Time;
        num = await snapshot.val().num_ques;
        console.log('num:', num);
      }
    }
    )
  }
  async fetch_num_ques(x, values) {
    var arr = [];
    var res = null;
    var e = null;
    var g = this.state.selected_week - 1;
    var d = x - 1;
    console.log("d=", d, "g=", g);
    var query = firebase.database().ref('MetaData').child('Weeks').child('' + g).child('Week' + this.state.selected_week).child('assignments').child('' + d).child('assignment' + x);
    await query.once("value").then(function (snapshot) {
      console.log('One:', snapshot.val());
      res = snapshot.val()
      e = res.num_ques;
    });
    e = parseInt(e, 10);
    e = e + 1;
    console.log("e=", e);
    console.log('temp1:', res, "e:", e);
    var query2 = firebase.database().ref('MetaData').child('Weeks').child('' + g).child('Week' + this.state.selected_week).child('assignments').child('' + d).child('assignment' + x).child('Questions');
    await query2.once("value").then(function (snapshot) {
      console.log('Two:', snapshot.val());
    });
    console.log("values:", values);

    query2.push({
      Question_num: e,
      Question: values.question,
      Option1: values.Option1,
      Option2: values.Option2,
      Option3: values.Option3,
      Option4: values.Option4,
      answer: values.answer
    });
    firebase.database().ref('MetaData').child('Weeks').child('' + g).child('Week' + this.state.selected_week).child('assignments').child('' + d).child('assignment' + x).update({
      num_ques: e
    });
    // let dout = null;
    // let name = null;
    // let Time = null;
    // const num = await firebase.database().ref('MetaData').child('Weeks').child('Week' + this.state.selected_week).child('assignments').child('assignment' + x).on('value', snapshot => {
    //   console.log('***', snapshot.val());
    //   console.log('num:', snapshot.val().num_ques);
    //   // dout = snapshot.val().num_ques;
    //   // name = snapshot.val().Name;
    //   // Time = snapshot.val().time;
    //   dout = {
    //     dout: snapshot.val().num_ques,
    //     name: snapshot.val().Name,
    //     Time: snapshot.val().time
    //   }
    //   //resolve(d);
    // });
    // console.log("dout:", dout);
    // var arr = [];

    // let f = await firebase.database().ref('Weeks').child('Week' + this.state.selected_week).child('Assignments').child('Assignment' + x).child('Questions').push({
    //   Question_num: dout + 1,
    //   Question: values.question,
    //   Option1: values.Option1,
    //   Option2: values.Option2,
    //   Option3: values.Option3,
    //   Option4: values.Option4,
    //   answer: values.answer
    // });
    // let num2 = await firebase.database().ref('MetaData').child('Weeks').child('Week' + this.state.selected_week).child('assignments').child('assignment' + x).set({
    //   num_ques: dout + 1,
    //   Name: name,
    //   time: Time
    // });
    //return dout;
  }
  addQuestion(values) {
    console.log('values:', values);
    var num = this.selected_assignment + 1;
    this.fetch_num_ques(this.state.selected_assignment + 1, values).then((res) => {
      console.log("num::", res);
      // console.log('next_question_num::', res.dout + 1);

      // firebase.database().ref('Weeks').child('Week' + this.state.selected_week).child('Assignments').child('Assignment' + num).child('Questions').push({

      //   Question_num: res.dout + 1,
      //   Question: values.question,
      //   Option1: values.Option1,
      //   Option2: values.Option2,
      //   Option3: values.Option3,
      //   Option4: values.Option4,
      //   answer: values.answer
      // });
      // firebase.database().ref('MetaData').child('Weeks').child('Week' + this.state.selected_week).child('assignments').child('assignment' + num).set({
      //   num_ques: res.dout + 1,
      //   Name: res.name,
      //   time: res.Time
      // });
    });





  }
  checkvalues(values) {
    console.log("check_values:", values);
    if (isNaN(values.answer)) {
      window.alert("Answer should be in integer. Please retry again.");
    }
    else {
      this.addQuestion(values);
    }
  }
  validateAnswer(value) {
    let error;
    if (isNaN(parseInt(value))) {
      error = 'Answer should be integer';
    }
    this.addAssignment();
    return error;
  }
  async p() {
    const { new_question, new_option1, new_option2, new_option3, new_option4, new_answer, flag } = this.state;
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
      return;
    }
    if (new_option1 === null) {
      console.log("new_question is null");
      return;
    }
    if (new_option2 === null) {
      console.log("new_question is null");
      return;
    }
    if (new_option3 === null) {
      console.log("new_question is null");
      return;
    }
    if (new_option4 === null) {
      console.log("new_question is null");
      return;
    }
    if (new_answer === null) {
      console.log("new_question is null");
      return;
    }
    if (new_option1 === new_option2) {
      console.log("Enter different options");
      return;
    }
    if (new_option2 === new_option3) {
      console.log("Enter different options");
      return;
    }
    if (new_option3 === new_option4) {
      console.log("Enter different options");
      return;
    }
    if (new_option1 === new_option3) {
      console.log("Enter different options");
      return;
    }
    if (new_option1 === new_option4) {
      console.log("Enter different options");
      return;
    }
    if (new_option2 === new_option4) {
      console.log("Enter different options");
      return;
    }
    console.log("answer:");
    console.log('question:', que, "option1:", opt1);
    //console.log("new_que:", new_question, "question:", question);
    //this.editdata(que, opt1, opt2, opt3, opt4, ans);
    var values = {
      question: que,
      Option1: opt1,
      Option2: opt2,
      Option3: opt3,
      Option4: opt4,
      answer: ans
    };
    console.log("values initial:", values);

    await this.addQuestion(values);
    await this.setState({
      renderSelectedTestObj: true
    })
  }
  addAssignment() {


    const SignupSchema = Yup.object().shape({
      question: Yup.string()
        .required('Required'),
      Option1: Yup.string()
        .required('Required'),
      Option2: Yup.string()
        .required('Required'),
      Option3: Yup.string()
        .required('Required'),
      Option4: Yup.string()
        .required('Required'),
      answer: Yup.string()
        .required('Required'),
    });

    return (
      <div>
        <h2>Add Assignment</h2>
        <div>
          <div>
            {/* <h3 className="text-center ">Edit Question</h3> */}
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
                  placeholder="Question"
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
                  placeholder="Option 1"
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
                  placeholder="Option 2"
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
                  placeholder="Option 3"
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
                  placeholder="Option 4"
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
                  placeholder="Answer"
                />
              </div>
            </div>
            <br />
            <div>
              <div className="row">
                <div className="col">
                  <button className="btn btn-primary" onClick={this.p}>
                    Add
                  </button>
                </div>
              </div>
              <br />
              <br />
            </div>
          </div>
          {/* <Formik
            validationSchema={SignupSchema}
            onSubmit={(values, actions) => {
              console.log(values);
              this.checkvalues(values);
              //this.addQuestion(values);

            }}
            render={({ errors, status, touched, isSubmitting }) => (
              <Form>
                <div>
                  <Field type="text" className="error" name="question" placeholder="Question" />
                  <ErrorMessage name="social.facebook">
                    {errorMessage => <div className="error">{errorMessage}</div>}
                  </ErrorMessage>
                </div>
                <br />
                <div>
                  <Field type="text" className="error" name="Option1" placeholder="Option1" />
                  <ErrorMessage name="social.facebook">
                    {errorMessage => <div className="error">{errorMessage}</div>}
                  </ErrorMessage>
                </div>
                <br />
                <div>
                  <Field type="text" className="error" name="Option2" placeholder="Option2" />
                  <ErrorMessage name="social.facebook">
                    {errorMessage => <div className="error">{errorMessage}</div>}
                  </ErrorMessage>
                </div>
                <br />
                <div>
                  <Field type="text" className="error" name="Option3" placeholder="Option3" />
                  <ErrorMessage name="social.facebook">
                    {errorMessage => <div className="error">{errorMessage}</div>}
                  </ErrorMessage>
                </div>
                <br />
                <div>
                  <Field type="text" className="error" name="Option4" placeholder="Option4" />
                  <ErrorMessage name="social.facebook">
                    {errorMessage => <div className="error">{errorMessage}</div>}
                  </ErrorMessage>
                </div>
                <br />
                <div>
                  <Field type="text" className="error" name="answer" placeholder="Answer" />
                  <ErrorMessage name="social.facebook">
                    {errorMessage => <div className="error">{errorMessage}</div>}
                  </ErrorMessage>
                </div>
                <br />
                {status && status.msg && <div>{status.msg}</div>}
                <button type="submit" disabled={isSubmitting}>
                  Submit
          </button>
              </Form>
            )}
          /> */}
        </div>




        <div>
          <br />
          <button className="btn btn-secondary" onClick={() => {
            this.setState({
              renderSelectedTestObj: true
            })
          }}>
            Back <i className="fa fa-backward" />
          </button>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.getMetadata();
  }
  render() {
    const {
      renderSelectedTestObj,
      renderMCQs,
      saveSelectedQuizObj,
      currentTestIndex
    } = this.state;
    //const addAssignment = (
    // <div>
    //   <h2>Add Assignment</h2>
    //   <div>
    //     <Formik
    //       onSubmit={(values, actions) => {
    //         console.log(values);
    //         this.addQuestion(values);

    //       }}
    //       render={({ errors, status, touched, isSubmitting }) => (
    //         <Form>
    //           <div>
    //             <Field type="text" className="error" name="question" placeholder="Question" />
    //             <ErrorMessage name="social.facebook">
    //               {errorMessage => <div className="error">{errorMessage}</div>}
    //             </ErrorMessage>
    //           </div>
    //           <br />
    //           <div>
    //             <Field type="text" className="error" name="Option1" placeholder="Option1" />
    //             <ErrorMessage name="social.facebook">
    //               {errorMessage => <div className="error">{errorMessage}</div>}
    //             </ErrorMessage>
    //           </div>
    //           <br />
    //           <div>
    //             <Field type="text" className="error" name="Option2" placeholder="Option2" />
    //             <ErrorMessage name="social.facebook">
    //               {errorMessage => <div className="error">{errorMessage}</div>}
    //             </ErrorMessage>
    //           </div>
    //           <br />
    //           <div>
    //             <Field type="text" className="error" name="Option3" placeholder="Option3" />
    //             <ErrorMessage name="social.facebook">
    //               {errorMessage => <div className="error">{errorMessage}</div>}
    //             </ErrorMessage>
    //           </div>
    //           <br />
    //           <div>
    //             <Field type="text" className="error" name="Option4" placeholder="Option4" />
    //             <ErrorMessage name="social.facebook">
    //               {errorMessage => <div className="error">{errorMessage}</div>}
    //             </ErrorMessage>
    //           </div>
    //           <br />
    //           <div>
    //             <Field type="text" className="error" name="answer" placeholder="Answer" />
    //             <ErrorMessage name="social.facebook">
    //               {errorMessage => <div className="error">{errorMessage}</div>}
    //             </ErrorMessage>
    //           </div>
    //           <br />
    //           {status && status.msg && <div>{status.msg}</div>}
    //           <button type="submit" disabled={isSubmitting}>
    //             Submit
    //       </button>
    //         </Form>
    //       )}
    //     /></div>




    //   <div>
    //     <br />
    //     <button className="btn btn-secondary" onClick={() => {
    //       this.setState({
    //         renderSelectedTestObj: true
    //       })
    //     }}>
    //       Back <i className="fa fa-backward" />
    //     </button>
    //   </div>
    // </div>
    //);
    console.log(this.props);
    const { add, edit } = this.props;
    return (this.state.flag &&
      <div>
        {renderSelectedTestObj ? (
          this.renderQuizInfo()
        ) : renderMCQs ? (
          add ? (this.addAssignment()) : (this.editAssignment())
          /*<MCQs
          currentQuesObj={saveSelectedQuizObj}
          currentTestIndex={currentTestIndex}
          backToDashboard={this.backToDashboard}
          selected_assignment={this.selected_assignment}
          selected_week={this.selected_week}
        />*/) : (
              this.renderQuizList()
            )}
      </div>
    );
  }
}


export default QuizList;
