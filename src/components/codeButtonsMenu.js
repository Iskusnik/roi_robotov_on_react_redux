import React, { Component } from 'react';
import { connect } from 'react-redux';
import './componentsStyles.css';
import CodeButton from './codeButton';
import CodeInputNumber from './codeInputNumber';
import {gameButtons} from './GameConstants';
import {forEach} from "react-bootstrap/es/utils/ElementChildren";

const mapStateToProps = state => {
    return {
        buttonValue: state.buttonValue,
        moveValue: state.moveValue
    };
};


const temp = ['↑','↓','→','←','↖','↗','↘','↙',''];

export class CodeButtonsMenu extends  Component{

    constructor() {
        super();
        this.buttonsCommands = gameButtons;
    }

    render() {
        return(
            <div className="container">
                <div className="flex-container">
                    {this.buttonsCommands.map((value, index) => {
                        if (index < 4)
                        {
                            if (this.props.buttonValue !== value)
                                return <CodeButton butCom={value} disabled={false}/>
                            else
                                return <CodeButton butCom={value} disabled={true}/>
                        }
                    })}
                    <CodeInputNumber id={'moveSize'}/>

                    {this.buttonsCommands.map((value, index) => {
                        if (index === 5)
                        {
                            if (this.props.buttonValue !== value)
                                return <CodeButton butCom={value} disabled={false}/>
                            else
                                return <CodeButton butCom={value} disabled={true}/>
                        }
                    })}
                    <CodeInputNumber id={'fuelSizeLoad'} name={'Т'}/>
                    <CodeInputNumber id={'foodSizeLoad'} name={'П'}/>

                    {this.buttonsCommands.map((value, index) => {
                        if (index === 6)
                        {
                            if (this.props.buttonValue !== value)
                                return <CodeButton butCom={value} disabled={false}/>
                            else
                                return <CodeButton butCom={value} disabled={true}/>
                        }
                    })}
                    <CodeInputNumber id={'fuelSizeUnload'} name={'Т'}/>
                    <CodeInputNumber id={'foodSizeUnload'} name={'П'}/>


                    {this.buttonsCommands.map((value, index) => {
                        if (index > 6)
                        {
                            if (this.props.buttonValue !== value)
                                return <CodeButton butCom={value} disabled={false}/>
                            else
                                return <CodeButton butCom={value} disabled={true}/>
                        }
                    })}
                </div>
                <div className="compose-main-container">
                    <div className="grid-item">
                        {this.buttonsCommands.map((value, index) => {
                            if (index === 4)
                            {
                                if (this.props.buttonValue !== value)
                                    return <CodeButton butCom={value} disabled={false}/>;
                                else
                                    return <CodeButton butCom={value} disabled={true}/>
                            }
                        })}
                    </div>
                    <div className="compose-step-container">
                            {
                                temp.map((dir) => {
                                    if (dir !== this.props.moveValue.jump1.dir)
                                        return(
                                            <div className="grid-item">
                                                <CodeButton butCom={dir} disabled={false} id={'jump1'}/>
                                            </div>
                                        );
                                    else
                                        return (
                                            <div className="grid-item">
                                                <CodeButton butCom={dir} disabled={true} id={'jump1'}/>
                                            </div>
                                        )

                                })
                            }
                        <div className="grid-item">
                            <CodeInputNumber id={'moveValue1'}/>
                        </div>

                        {
                            temp.map((dir) => {
                                if (dir !== this.props.moveValue.jump2.dir)
                                    return(
                                        <div className="grid-item">
                                            <CodeButton butCom={dir} disabled={false} id={'jump2'}/>
                                        </div>
                                    );
                                else
                                    return (
                                        <div className="grid-item">
                                            <CodeButton butCom={dir} disabled={true} id={'jump2'}/>
                                        </div>
                                    )

                            })
                        }
                        <div className="grid-item">
                            <CodeInputNumber id={'moveValue2'}/>
                        </div>


                        {
                            temp.map((dir) => {
                                if (dir !== this.props.moveValue.jump3.dir)
                                    return(
                                        <div className="grid-item">
                                            <CodeButton butCom={dir} disabled={false} id={'jump3'}/>
                                        </div>
                                    );
                                else
                                    return (
                                        <div className="grid-item">
                                            <CodeButton butCom={dir} disabled={true} id={'jump3'}/>
                                        </div>
                                    )

                            })
                        }
                        <div className="grid-item">
                            <CodeInputNumber id={'moveValue3'}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}

export default connect(mapStateToProps)(CodeButtonsMenu);
