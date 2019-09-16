import React, { Component } from 'react';
import { connect } from 'react-redux';
import './componentsStyles.css';
import {changeInputValue} from '../actions/actionCreators';

function mapDispatchToProps(dispatch) {
    return {
        changeInputValue: (value, id) => dispatch(changeInputValue(value, id))
    };
}



class CodeInputNumber extends Component{
    constructor() {
        super();
        this.onSomeChange  = this.handleClick.bind(this);

    }


    handleClick() {
        this.props.changeInputValue( document.getElementById(this.props.id).value, this.props.id )
    }

    render()
    {
        return (
            <div className="flex-container">
                <div>
                    {this.props.name}
                </div>
                <input type="number" id={this.props.id} name={this.props.name} min={this.props.min} max="8" defaultValue={this.props.min} onChange={this.onSomeChange}/>
            </div>
        );

    }
}
const InputNumber  = connect(null, mapDispatchToProps)(CodeInputNumber);

export default InputNumber;




