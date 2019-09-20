import React, { Component } from 'react';
import Square from './square';
import './componentsStyles.css';
import {CODE, GAME} from "./GameConstants";

class Row extends Component {
    renderSquare(val, x, y, boardType, bots) {

        const roboNames = {
            0: 'A1',
            1: 'B1',
            2: 'C1',
            3: 'D1',
            4: 'A2',
            5: 'B2',
            6: 'A3',
            7: 'A4',
        };

        if(boardType === GAME)
            for(var i = 0; i < 8; i++) {
                if (
                    bots[i][0] === y &&
                    bots[i][1] === x
                )
                    return (
                        <Square
                            value={val}
                            x={x}
                            y={y}
                            boardType={boardType}
                            bot={{isBot: true, name: roboNames[i]}}
                        />);
            }



        return (
            <Square
                value={val}
                x={x}
                y={y}
                boardType={boardType}
                bot={{isBot:false, name:-1}}
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
                    {
                        this.props.row.map((sq, index) => {
                        return this.renderSquare(sq, index, this.props.y, this.props.boardType, this.props.bots)
                    })}
                </div>
            );



    }


}
export default Row;