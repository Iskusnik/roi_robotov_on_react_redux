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
                {
                    if (this.props.x !== 0)
                        return (
                            <div className="divTableCell">
                                <button className="square" onClick={this.handleClick} style={{ fontWeight: 'bolder', fontSize: '200%'}}>
                                    {
                                        this.props.value
                                    }
                                </button>
                            </div>
                        );
                    else
                        return (
                            <div className="divTableCell" style={{ fontWeight: 'bolder', fontSize: '200%'}}>
                                    {
                                        this.props.y
                                    }
                            </div>
                        );
                }
            else{
                //console.log(this.props)
                if(this.props.x === 0)
                    return (
                        <div className="divTableCell" style={{ fontWeight: 'bolder', fontSize: '200%'}}>
                            {
                                this.props.value
                            }
                        </div>
                    );
                if(this.props.bot.exist >= 0)
                    return (
                        <div className="divTableCell">
                            {
                                this.props.value + ' (Т' + this.props.bot.fuel + ' П'+ this.props.bot.food + ')'
                            }
                        </div>
                    );
                else
                    return (
                        <div className="divTableCell" style={{ backgroundColor: 'grey'}}>
                            {
                                this.props.value + ' (Т' + this.props.bot.fuel + ' П'+ this.props.bot.food + ')'
                            }
                        </div>
                    );
            }

        }
        else {
            var idIMG = '';
            var val = this.props.value;
            if (this.props.bot.isBot) {
                idIMG = 'robo';
                val = this.props.bot.name
            }

            if (this.props.value[0] === tileNames.rocket){
                idIMG = 'rocket';
                //console.log(this.props.value);
                val = 'T' + (this.props.value[3] - this.props.value[1]) + ' П' + (this.props.value[4] - this.props.value[2])
            }

            if (this.props.value[0] === tileNames.storage) {
                idIMG = 'storage';
                val = 'T' + this.props.value[1] +
                     ' П' + this.props.value[2]
            }

            if (this.props.value[0] === tileNames.hole) {
                idIMG = 'hole';
                val = '';
            }

            if (this.props.value[0] === tileNames.mountain){
                idIMG = 'mountain';
                val = '';
            }


            return (
                <div className="divTableCell" id = {idIMG}>
                    <div>
                    {
                        val //+"x"+ this.props.x.toString() +"y"+ this.props.y.toString()
                    }
                    </div>
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