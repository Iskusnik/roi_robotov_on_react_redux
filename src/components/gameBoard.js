import React, { Component } from 'react';
import { connect } from 'react-redux';
import Row from "./row";
import './componentsStyles.css';

import {CODE, GAME} from './GameConstants'

const mapStateToProps = state => {
    return {
        rows: state.gameBoardRows,
        bots: {
            0: state.A1,
            1: state.B1,
            2: state.C1,
            3: state.D1,
            4: state.A2,
            5: state.B2,
            6: state.A3,
            7: state.A4,
        }
    };
};

const GameBoard = ({ rows, bots }) => (
    <div className="divTable">
        {rows.map((row, index) => {
                return <Row row={row} y={index} boardType={GAME} bots={bots}/>
        })}
    </div>
);


export default connect(mapStateToProps)(GameBoard);

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