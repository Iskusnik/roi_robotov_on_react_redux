import React, { Component } from 'react';
import { connect } from 'react-redux';
import './componentsStyles.css';
import CodeButton from './codeButton';
import {gameButtons} from './GameConstants'

const mapStateToProps = state => {
    return { buttonValue: state.buttonValue};
};



export class CodeButtonsMenu extends  Component{

    constructor() {
        super();
        this.buttonsCommands = gameButtons;
    }

    render() {
        return(
            <div className="d-flex flex-column">
                {this.buttonsCommands.map((value, index) => {
                    if (this.props.buttonValue !== value)
                        return <CodeButton butCom={value} disabled={false}/>
                    else
                        return <CodeButton butCom={value} disabled={true}/>
                })}
                <CodeButton butCom={'2'} disabled={true}/>
                <CodeButton butCom={'1'} disabled={false}/>
            </div>
        )
    }
}

export default connect(mapStateToProps)(CodeButtonsMenu);
