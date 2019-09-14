import React, { Component } from 'react';
import Square from './square';
import './componentsStyles.css';
import {CODE} from "./GameConstants";

class Row extends Component {



    renderSquare(val, x, y, boardType) {
        return (
            <Square
                value={val}
                x={x}
                y={y}
                boardType={boardType}
            />);
    }

    render(){
        if(this.props.y === 0 && this.props.boardType === CODE){
                return (
                    <div className="divTableHeading">
                        {this.props.row.map((sq, index) => {
                            return this.renderSquare(sq, index, this.props.y, this.props.boardType)
                        })}
                    </div>
                );
        }
        else
        if(this.props.y === this.props.selectedRow && this.props.boardType === CODE){
            return (
                <div className="divTableSelectedRow">
                    {this.props.row.map((sq, index) => {
                        return this.renderSquare(sq, index, this.props.y, this.props.boardType)
                    })}
                </div>
            );
        }
        else
            return (
                <div className="divTableRow">
                    {this.props.row.map((sq, index) => {
                        return this.renderSquare(sq, index, this.props.y, this.props.boardType)
                    })}
                </div>
            );



    }


}
export default Row;