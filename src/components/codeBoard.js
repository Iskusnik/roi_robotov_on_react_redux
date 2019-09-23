import React, { Component } from 'react';
import { connect } from 'react-redux';
import Row from "./row";
import './componentsStyles.css';
import {CODE} from './GameConstants'

const mapStateToProps = state => {
    return {
        rows: state.codeBoardRows,
        selectedRow: state.currentCodeRow,
        bots: {
            0: 0,
            1: state.A1,
            2: state.B1,
            3: state.C1,
            4: state.D1,
            5: state.A2,
            6: state.B2,
            7: state.A3,
            8: state.A4,
        }
    };
};

const CodeBoard = ({ rows, selectedRow, bots }) => (
    <div className="divTable">
        {rows.map((row, index) => {
            return <Row row={row} y={index} boardType={CODE} selectedRow={selectedRow} bots={bots}/>
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