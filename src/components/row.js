import React, { Component } from 'react';
import { connect } from 'react-redux';
import Square from './square';
import './componentsStyles.css';


class Row extends Component {



    renderSquare(val, x, y, handler) {
        return (
            <Square
                value={val}
                onClick={()=>handler}
                x={x}
                y={y}
            />);
    }

    render(){
        return (
            <div className="divTableRow">
                {this.props.row.map((sq, index) => {
                    return this.renderSquare(sq, index, this.props.y, handleClick)
                })}
            </div>
        );

        function handleClick(x, y) {
            return updateCodeField(x, y);
        }
    }



}
export default Row;
