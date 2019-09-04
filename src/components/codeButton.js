import React, { Component } from 'react';
import { connect } from 'react-redux';
import './componentsStyles.css';
import {changeCodeButton} from '../actions/actionCreators';

//import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
//import Button from 'react-bootstrap/Button'
//import ButtonGroup from 'react-bootstrap/ButtonGroup';
//import ToggleButton from 'react-bootstrap/ToggleButton'

function mapDispatchToProps(dispatch) {
    return {
        changeCodeButton: (butCommand) => dispatch(changeCodeButton(butCommand))
    };
}



class CodeButton extends Component{
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }


    handleClick() {
        this.props.changeCodeButton( this.props.butCom )
    }

    render()
    {
        return (
            <div>
                <button className="square" onClick={this.handleClick} disabled={this.props.disabled}>
                    {
                        this.props.butCom
                    }
                </button>
            </div>
        );

    }
}
const t  = connect(null, mapDispatchToProps)(CodeButton);

export default t;

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



