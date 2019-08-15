import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
//import ListItem from './listitem';
import firebase from "../../config/Fire";

class Lead extends Component {
    constructor() {
        super();
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            recentActive: true,
            alltimeActive: false,
            alltimeItems: []
        };
        this.handleClickRecent = this.handleClickRecent.bind(this);
        this.handleClickAlltime = this.handleClickAlltime.bind(this);

    }
    fetchitems() {
        console.log("In fetch items");

    }
    fetchallitems() {
        console.log("In fetch all items");

    }
    componentDidMount() {
        fetchitems();
        fetchallitems();
    }

    handleClickRecent() {
        this.setState({ recentActive: true, alltimeActive: false });
    }

    handleClickAlltime() {
        this.setState({ recentActive: false, alltimeActive: true });
    }

    active(x) {
        let rank = 0;
        return x.map(item => {
            rank = rank + 1;
            return (
                <ListItem
                    key={item.username}
                    item={item}
                    rank={rank}
                />
            )
        });
    }

    render() {
        if (this.state.recentActive) {
            let recent = "red";
            let userItems = this.active(this.state.items);
        } else {
            let alltime = "red";
            let userItems = this.active(this.state.alltimeItems);
        }
        const style = { display: "flex", alignItems: "center", justifyContent: "center", padding: "0" };
        return (
            <div className="container">
                <button className="btn btn-primary" onClick={this.handleClickRecent}>Recent</button>
                <button className="btn btn-primary" onClick={this.handleClickAlltime}>All-Time</button>
                <ul className="list-group">
                    <li className="list-group-item">
                        <div className="row">
                            <div className="col-1" style={style}><h4>#</h4></div>
                            <div className="col-1" style={style}></div>
                            <div className="col-4" style={style}><h4>User</h4></div>
                            <div className="col-3" style={style}><h4 style={{ color: recent }}>Recent Score</h4></div>
                            <div className="col-3" style={style}><h4 style={{ color: alltime }}>All Time Score</h4></div>
                        </div>
                    </li>
                    {userItems}
                </ul>
            </div>
        );
    }
}



export default Lead;
