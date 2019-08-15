import React, { Component } from "react";
import firebase from "../../config/Fire";
import { render } from 'react-dom';
//import './style.css';
import ListItem from './ListItem';
class Leaderboard extends Component {
    constructor(props) {
        super(props);
        super();
        this.sort_recent;
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            recentActive: true,
            //alltimeActive: false,
            //alltimeItems: []
        };
        this.handleClickRecent = this.handleClickRecent.bind(this);
        //this.handleClickAlltime = this.handleClickAlltime.bind(this);
        this.fetchitems = this.fetchitems.bind(this);
        //this.fetchallitems = this.fetchallitems.bind(this);
        this.g = this.g.bind(this);
    }


    async fetchitems() {
        console.log("In fetch items");
        var arr = []
        var user1 = {
            username: "Karan",
            recent: 10,
            alltime: 10
        }
        var user2 = {
            username: "Vrund",
            recent: 20,
            alltime: 5
        }
        var user3 = {
            username: "USER1",
            recent: 50,
            alltime: 5
        }
        var user4 = {
            username: "USER2",
            recent: 19,
            alltime: 5
        }

        // arr.push(user1);
        // arr.push(user2);
        // arr.push(user3)
        // arr.push(user4)
        var g = this.props.w - 1;
        var f = this.props.a + 1;
        console.log("g:", g, "f:", f, "w:", this.props.w, "a:", this.props.a);

        var query = firebase.database().ref('MetaData').child('Weeks').child('' + g).child('Week' + this.props.w).child('assignments').child('' + this.props.a).child('assignment' + f).child('Leaderboard').child('list');
        await query.once("value").then(function (snapshot) {
            console.log("Leaderboard:", snapshot.val());
            snapshot.forEach((child) => {
                arr.push(child.val());
            })
        })
        console.log("arr:", arr);

        await this.setState({
            items: arr,
            //alltimeItems: arr
        })
        console.log("items:", this.state.items);


    }/*
    async fetchallitems() {
        console.log("In fetch all items");
        var arr = []
        var user1 = {
            username: "Karan",
            recent: 10,
            alltime: 10
        }
        var user2 = {
            username: "Vrund",
            recent: 20,
            alltime: 5
        }
        arr.push(user1);
        arr.push(user2);
        await this.setState({
            items: arr,
            alltimeItems: arr
        })
        //console.log("items:", this.state.items, "alltimeItems:", this.state.alltimeItems);



    }*/
    async g() {
        //await this.fetchallitems();
        await this.fetchitems();
        var arr1, arr2;
        arr1 = this.state.items;
        //arr2 = this.state.alltimeItems;
        await arr1.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
        //arr2.sort((a, b) => parseFloat(b.alltime) - parseFloat(a.alltime));
        console.log("arr1:", arr1);

        await this.setState({
            items: arr1,
            //alltimeItems: arr2
        })
    }
    componentDidMount() {
        this.g();
    }

    handleClickRecent() {
        this.setState({ recentActive: true, alltimeActive: false });
    }

    // handleClickAlltime() {
    //     this.setState({ recentActive: false, alltimeActive: true });
    // }

    handleSubmit() {
        console.log("Handle Submit");

    }
    viewLeader() {
        console.log("View Leaderboard");
        //<Lead />
    }
    active(x) {
        let rank = 0;
        return x.map(item => {
            rank = rank + 1;
            return (
                <ListItem
                    item={item}
                    rank={rank}
                />
            )
        });
    }
    render() {
        var recent;
        //var alltime;
        var userItems;
        //if (this.state.recentActive) {
        recent = "red";
        userItems = this.active(this.state.items);
        //} else {
        // alltime = "red";
        //  userItems = this.active(this.state.alltimeItems);
        //}
        const style = { display: "flex", alignItems: "center", justifyContent: "center", padding: "0" };
        return (
            <div className="container">
                {/* <button className="btn btn-primary" onClick={this.handleClickRecent}>Recent</button>
                <button className="btn btn-primary" onClick={this.handleClickAlltime}>All-Time</button> */}
                <br />
                <br />
                <br />
                <ul className="list-group">
                    <h3>Leaderboard</h3>
                    <li className="list-group-item">
                        <div className="row">
                            <div className="col-1" style={style}><h4>#</h4></div>
                            <div className="col-1" style={style}></div>
                            <div className="col-4" style={style}><h4>User</h4></div>
                            <div className="col-3" style={style}><h4 style={{ color: recent }}>Recent Score</h4></div>
                            {/* <div className="col-3" style={style}><h4 style={{ color: alltime }}>All Time Score</h4></div> */}
                        </div>
                    </li>
                    {userItems}
                </ul>
                <br />
                <br />
                <button
                    className="btn btn-secondary pull-right"
                    onClick={() => {
                        this.props.backToDashboard(false);
                    }}
                >
                    Goto Dashboard <i className="fa fa-undo" />
                </button>
            </div>
        );
    }
}

export default Leaderboard;
