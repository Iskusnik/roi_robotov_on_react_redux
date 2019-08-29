import React, { Component } from 'react';
import { connect } from 'react-redux';
import './componentsStyles.css';

function Square(props){
    return(
        <div className="divTableCell">
            <button className="square" onClick={props.onClick}>
                {
                    props.value +"x"+ props.x.toString() +"y"+ props.y.toString()
                }
            </button>
        </div>
    );
}
export default Square;