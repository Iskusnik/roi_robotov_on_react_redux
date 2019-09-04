//import { combineReducers } from "redux";
//export default combineReducers();
import { UPDATE_CODE_FIELD, CHANGE_CODE_BUTTON, CHANGE_INPUT_VALUE } from "../actions/actionTypes";
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
        jump1:{dir:'↑', size:1},
        jump2:{dir:'→', size:4},
        jump3:{dir:'↓', size:2},
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
    if (action.type === UPDATE_CODE_FIELD) {
        return Object.assign({}, state, {
            codeBoardRows: state.codeBoardRows.map((row, rowIndex) => {
                if(rowIndex === action.payload.Y)
                    return row.map((cell, cellIndex) =>{
                        if(cellIndex === action.payload.X)
                            return commandTransform(state.buttonValue, state)
                        else
                            return cell;
                    })
                else
                    return row;
            })
        })
    }
    if (action.type === CHANGE_CODE_BUTTON) {
        return {
            ...state,
            buttonValue: action.payload.buttonCommand
        }
    }
    if (action.type === CHANGE_INPUT_VALUE) {
        switch (action.payload.id) {
            case 'foodSizeLoad': {
                return {
                    ...state,
                    foodSizeLoad: action.payload.sizeValue
                }
            }

            case 'fuelSizeLoad': {
                return {
                    ...state,
                    fuelSizeLoad: action.payload.sizeValue
                }
            }

            case 'foodSizeUnload': {
                return {
                    ...state,
                    foodSizeUnload: action.payload.sizeValue
                }
            }

            case 'fuelSizeUnload': {
                return {
                    ...state,
                    fuelSizeUnload: action.payload.sizeValue
                }
            }
        }
    }
    return state;
};

function commandTransform(buttonValue, state) {
    switch (buttonValue) {
        //UP
        case gameButtons[0]: return('↑'+state.moveSize); break;
        //DOWN
        case gameButtons[1]: return('↓'+state.moveSize); break;
        //LEFT
        case gameButtons[2]: return('←'+state.moveSize); break;
        //RIGHT
        case gameButtons[3]: return('→'+state.moveSize); break;
        //COMPOSED
        case gameButtons[4]:
            return(state.moveValue.jump1.dir +  state.moveValue.jump1.size
                 + state.moveValue.jump2.dir +  state.moveValue.jump2.size
                 + state.moveValue.jump3.dir +  state.moveValue.jump3.size); break;

        //LOAD
        case gameButtons[5]: return('+'+'Т'+state.fuelSizeLoad+'П'+state.foodSizeLoad); break;
        //UNLOAD
        case gameButtons[6]: return('-'+'Т'+state.fuelSizeUnload+'П'+state.foodSizeUnload); break;

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