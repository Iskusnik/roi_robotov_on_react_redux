import React, { Component } from 'react';
import { connect } from 'react-redux';
import './componentsStyles.css';
import {updateCodeField} from '../actions/actionCreators'
import {CODE, GAME, tileNames} from './GameConstants.js';


function mapDispatchToProps(dispatch) {
    return {
        updateCodeField: (x, y) => dispatch(updateCodeField(x, y))
    };
}

function renderCommand(str) {

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
        if(this.props.boardType === CODE) {
            if (this.props.y !== 0)
                return (
                    <div className="divTableCell">
                        <button className="square" onClick={this.handleClick}>
                            {
                                this.props.value
                            }
                        </button>
                    </div>
                );
            else
                return (
                    <div className="divTableCell">
                        {
                            this.props.value
                        }
                    </div>
                );
        }
        else {
            var idIMG = '';
            var val = this.props.value;
            if (this.props.bot.isBot) {
                idIMG = 'robo';
                val = this.props.bot.name
            }
            if (this.props.value[0] === tileNames.rocket)
                idIMG = 'rocket';
            if (this.props.value[0] === tileNames.storage)
                idIMG = 'storage';
            if (this.props.value[0] === tileNames.hole)
                idIMG = 'hole';
            if (this.props.value[0] === tileNames.mountain)
                idIMG = 'mountain';
            return (
                <div className="divTableCell" id = {idIMG}>
                    {
                        val //+"x"+ this.props.x.toString() +"y"+ this.props.y.toString()
                    }
                </div>
            );
        }

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
                    props.value +"x"+ this.props.x.toString() +"y"+ this.props.y.toString()
                }
            </button>
        </div>
    );
}


* */