//import { combineReducers } from "redux";
//export default combineReducers();
import { GENERATE_CODE_FIELD, UPDATE_CODE_FIELD, CHANGE_CODE_BUTTON } from "../actions/actionTypes";
import {gameButtons} from "../components/GameConstants";

const initialState = {
    gameBoardRows: [[0,2,3],[4,5,6],[7,'h','j'],[11,'k', 'L__']],
    codeBoardRows: [['А1','Б1','В1','Г1','А2','Б2','А3','А4'],['','','','','','','',''],['','','','','','','','']],
    N: [3],
    M: [4],
    buttonValue: 'move',
    moveSize:1,
    foodSizeLoad:1,
    fuelSizeLoad:1,
    foodSizeUnload:1,
    fuelSizeUnload:1,
    moveValue:{
        jump1:'↑1',
        jump2:'→4',
        jump3:'↓2'
    },
    //x,y,food,fuel
    A1: [-1, -1, 0, 0],
    B1: [-1, -1, 0, 0],
    C1: [-1, -1, 0, 0],
    D1: [-1, -1, 0, 0],
    A2: [-1, -1, 0, 0],
    B2: [-1, -1, 0, 0],
    A3: [-1, -1, 0, 0],
    A4: [-1, -1, 0, 0]
};
function rootReducer(state = initialState, action) {
    if (action.type === GENERATE_CODE_FIELD) {
        return Object.assign({}, state, {
            N: state.N.concat(action.payload.N),
            M: state.M.concat(action.payload.M),
            boardRows: action.payload.boardRows
            //boardRows: state.boardRows.concat(action.payload.boardRows)
            //M: Object.assign({}, state.M, action.payload.M),
            //M: Object.assign({}, state.N, action.payload.M)
        });
    }
    if (action.type === UPDATE_CODE_FIELD) {
        return Object.assign({}, state, {
            codeBoardRows: state.codeBoardRows.map((row, rowIndex) => {
                if(rowIndex === action.payload.Y)
                    return row.map((cell, cellIndex) =>{
                        if(cellIndex === action.payload.X)
                            return commandTransform(state.buttonValue)
                        else
                            return cell;
                    })
                else
                    return row;
            })
        })
    }
    if (action.type === CHANGE_CODE_BUTTON)
    {
        return {
            ...state,
            buttonValue: action.payload.buttonCommand
        }
    }

    return state;
};

function commandTransform(buttonValue) {
    switch (buttonValue) {
        //UP
        case gameButtons[0]: return('↑'+initialState.moveSize); break;
        //DOWN
        case gameButtons[1]: return('↓'+initialState.moveSize); break;
        //LEFT
        case gameButtons[2]: return('←'+initialState.moveSize); break;
        //RIGHT
        case gameButtons[3]: return('→'+initialState.moveSize); break;
        //COMPOSED
        case gameButtons[4]: return(initialState.moveValue.jump1 + initialState.moveValue.jump2 + initialState.moveValue.jump3); break;

        //LOAD
        case gameButtons[5]: return('+'+'Т'+initialState.fuelSizeLoad+'П'+initialState.foodSizeLoad); break;
        //UNLOAD
        case gameButtons[6]: return('-'+'Т'+initialState.fuelSizeLoad+'П'+initialState.foodSizeLoad); break;

        //SPLIT
        case gameButtons[7]: return('стык'); break;
        //CONNECT
        case gameButtons[8]: return('расстык'); break;
    }
}

export default rootReducer;

/*

if (action.type === UPDATE_CODE_FIELD) {
        return state.boardRows.map((row, rowIndex) => {
            if(rowIndex === action.payload.Y) {
                row.map((cell, cellIndex) => {
                 if(cellIndex === action.payload.X)
                     return [cell, state.buttonValue];
                })
            }
        });
    }
 */