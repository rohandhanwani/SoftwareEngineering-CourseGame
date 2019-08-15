import React from 'react';

const ListItem = (item) => {
    // const video = props.video;
    const imageUrl = item.item.img;
    const style = { padding: "0px", display: "flex", alignItems: "center", justifyContent: "center" };
    return (
        <li className="list-group-item">
            <div className="row">
                <div className="col-1" style={style} ><h1>{item.rank}</h1></div>
                <div className="col-4" style={style}><h4>{item.item.username}</h4></div>
                <div className="col-3" style={style} ><h4>{item.item.recent}</h4></div>
                <div className="col-3" style={style}><h4>{item.item.alltime}</h4></div>
            </div>
        </li>
    )
};

export default ListItem;