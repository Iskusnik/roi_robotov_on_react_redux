import React, { Component } from 'react';
import { connect } from 'react-redux';
import Row from "./row";
import './componentsStyles.css';
import {CODE} from './GameConstants'

const mapStateToProps = state => {
    return { rows: state.codeBoardRows};
};

const CodeBoard = ({ rows }) => (
    <div className="divTable">
        {rows.map((row, index) => {
            return <Row row={row} y={index} boardType={CODE}/>
        })}
    </div>
);


export default connect(mapStateToProps)(CodeBoard);

/*
*handleClick(x, y) {
    rows =  state.rows;
    return (rows[x][y]);
}
*
*
*
const Board = ({ rows }) => (
    <div className="board">
        {rows.map((row, index) => {
                return <Row key={`row-${row.id}`} row={row} />;
        })}
    </div>
);
*
const Board = ({ rows }) => (
    <div className="board">
        {rows.map((row, index) => {
                return <div>{row}</div>
        })}
    </div>
);
* */