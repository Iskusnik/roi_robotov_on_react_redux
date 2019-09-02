import React, { Component } from 'react';
import Square from './square';
import './componentsStyles.css';

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
        if(this.props.y === 0){
                return (
                    <div className="divTableHeading">
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