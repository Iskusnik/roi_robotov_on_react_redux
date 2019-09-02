//import { combineReducers } from "redux";
//export default combineReducers();
import { GENERATE_CODE_FIELD, UPDATE_CODE_FIELD, CHANGE_CODE_BUTTON } from "../actions/actionTypes";

const initialState = {
    gameBoardRows: [[0,2,3],[4,5,6],[7,'h','j'],[11,'k', 'L__']],
    codeBoardRows: [['А1','Б1','В1','Г1','А2','Б2','А3','А4'],[4,5,6],[7,'h','j'],[11,'k', 'L__']],
    N: [3],
    M: [4],
    buttonValue: 'move',
    moveValue:{
        jumps: 2,
        jumpsValue:[1,3],
        jumpsDir:['UP', 'LEFT']
    },
    A1: [-1, -1],
    B1: [-1, -1],
    C1: [-1, -1],
    D1: [-1, -1],
    A2: [-1, -1],
    B2: [-1, -1],
    A3: [-1, -1],
    A4: [-1, -1]
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
                            return state.buttonValue
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
        return Object.assign({}, state, {
            buttonValue: state.buttonValue.concat(action.payload.command),
            //boardRows: state.boardRows.concat(action.payload.boardRows)
            //M: Object.assign({}, state.M, action.payload.M),
            //M: Object.assign({}, state.N, action.payload.M)
        });
    }

    return state;
};
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