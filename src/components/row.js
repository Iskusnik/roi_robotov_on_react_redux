import React, { Component } from 'react';
import { connect } from 'react-redux';
import Square from './square';
import './componentsStyles.css';
import {updateCodeField} from '../actions/actionCreators'


class Row extends Component {



    renderSquare(val, x, y) {
        return (
            <Square
                value={val}
                x={x}
                y={y}
            />);
    }

    render(){
        return (
            <div className="divTableRow">
                {this.props.row.map((sq, index) => {
                    return this.renderSquare(sq, index, this.props.y)
                })}
            </div>
        );

        function handleClick() {
            let x = this.props.x;
            let y = this.props.y;
            return this.props.updateCodeField(x, y);
        }
    }



}
export default Row;