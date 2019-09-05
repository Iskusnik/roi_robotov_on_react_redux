import React, { Component } from 'react';
import { connect } from 'react-redux';
import './componentsStyles.css';
import {changeCodeButton, changeComposeMove} from '../actions/actionCreators';

//import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
//import Button from 'react-bootstrap/Button'
//import ButtonGroup from 'react-bootstrap/ButtonGroup';
//import ToggleButton from 'react-bootstrap/ToggleButton'

function mapDispatchToProps(dispatch) {
    return {
        changeCodeButton: (butCommand) => dispatch(changeCodeButton(butCommand)),
        changeComposeMove: (butCom, id) => dispatch(changeComposeMove(butCom, id))
    };
}


function commandToText(butCom){
    switch (butCom) {
        case 'UP': return('↑');
        case 'DOWN': return('↓');
        case 'RIGHT': return('→');
        case 'LEFT': return('←');
        case 'COMPOSED': return('✵');
        case 'SPLIT': return('Расстык');
        case 'CONNECT': return('Стык');
        case 'LOAD': return('+');
        case 'UNLOAD': return('-');
        case 'CLEAR': return('Удалить');



        case '↑': return('↑');
        case '↓': return('↓');
        case '→': return('→');
        case '←': return('←');
        case '↖': return('↖');
        case '↗': return('↗');
        case '↘': return('↘');
        case '↙': return('↙');
        case '': return('');

    }
}
class CodeButton extends Component{
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }


    handleClick() {
        if(!this.props.id)
            this.props.changeCodeButton( this.props.butCom );
        else
            this.props.changeComposeMove(this.props.butCom, this.props.id);
    }

    render()
    {
        return (
            <div>
                <button className="square" onClick={this.handleClick} disabled={this.props.disabled}>
                    {
                        commandToText(this.props.butCom)
                    }
                </button>
            </div>
        );

    }



}
const MyButton  = connect(null, mapDispatchToProps)(CodeButton);

export default MyButton;

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



