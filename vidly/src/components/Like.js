import React, { Component } from 'react';

const Like = ({ items, onLikeClicked }) => {
    const getHeartIconClass = () => {
        return items.liked ? "fa fa-heart" : "fa fa-heart-o";
    }
    const handleLikeClick = (movie) => {
        onLikeClicked(movie);
    }
    return (
        <div style={{ cursor: "pointer" }} onClick={() => handleLikeClick(items)}>
            <i className={getHeartIconClass()} aria-hidden="true"></i>
        </div>
    )
}

export default Like;