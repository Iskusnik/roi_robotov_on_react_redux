import React, { Component } from 'react';
import { connect } from 'react-redux';
import './componentsStyles.css';
import CodeButton from './codeButton';
import CodeInputNumber from './codeInputNumber';
import {gameButtons} from './GameConstants';

const mapStateToProps = state => {
    return {
        buttonValue: state.buttonValue,
        foodSizeLoad: state.foodSizeLoad,
        fuelSizeLoad: state.fuelSizeLoad,
        foodSizeUnload: state.foodSizeUnload,
        fuelSizeUnload: state.fuelSizeUnload,

    };
};



export class CodeButtonsMenu extends  Component{

    constructor() {
        super();
        this.buttonsCommands = gameButtons;
    }

    render() {
        return(
            <div className="flex-fill">
                {this.buttonsCommands.map((value) => {
                    if (this.props.buttonValue !== value)
                        return <CodeButton butCom={value} disabled={false}/>
                    else
                        return <CodeButton butCom={value} disabled={true}/>
                })}
                <CodeInputNumber id={'foodSizeLoad'} name={'Продовольствие'}/>
            </div>
        )
    }
}

export default connect(mapStateToProps)(CodeButtonsMenu);
