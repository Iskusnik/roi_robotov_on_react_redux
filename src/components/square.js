import React, { Component } from 'react';
import { connect } from 'react-redux';
import './componentsStyles.css';
import {updateCodeField} from '../actions/actionCreators'



function mapDispatchToProps(dispatch) {
    return {
        updateCodeField: (x, y) => dispatch(updateCodeField(x, y))
    };
}


class CodeSquare extends Component{
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }


    handleClick() {
        this.props.updateCodeField( this.props.x, this.props.y )
    }

    render()
    {
        return(
            <div className="divTableCell">
                <button className="square" onClick={this.handleClick}>
                    {
                        this.props.value +"x"+ this.props.x.toString() +"y"+ this.props.y.toString()
                    }
                </button>
            </div>
        );
    }
}
const Square = connect(null, mapDispatchToProps)(CodeSquare);

export default Square;

/*
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


* */