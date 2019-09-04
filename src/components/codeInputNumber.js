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
            <div>
                <label>
                    {this.name}
                </label>
                <input type="number" id={this.props.id} name={this.props.name} min="1" max="8" defaultValue={1} onChange={this.onSomeChange}/>
            </div>
        );

    }
}
const InputNumber  = connect(null, mapDispatchToProps)(CodeInputNumber);

export default InputNumber;




