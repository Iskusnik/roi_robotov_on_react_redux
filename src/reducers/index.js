//import { combineReducers } from "redux";
//export default combineReducers();
import {
    UPDATE_CODE_FIELD,
    CHANGE_CODE_BUTTON,
    CHANGE_INPUT_VALUE,
    CHANGE_COMPOSE_MOVE,
    LOAD_GAME_FIELD,
    MAKE_STEP,
    RESET_BOARD,
} from "../actions/actionTypes";
import {gameButtons} from "../components/GameConstants";

const initialState = {
    gameBoardRows: [
        ['','','','',''],
        ['','A','B','',''],
        ['','D','C','',''],
        ['','','','',''],
        ['','','r','s',''],
    ],
    codeBoardRows: [['А1','B1','C1','D1','А2','B2','А3','А4'],['←1','↓1','→1','←1','','','','']],
    currentCodeRow: 1,
    N: [5], //columns x
    M: [5], //rows    y
    buttonValue: 'UP',
    moveSize:1,
    foodSizeLoad:0,
    fuelSizeLoad:0,
    foodSizeUnload:0,
    fuelSizeUnload:0,
    moveValue:{
        jump1:{dir:'', size:1},
        jump2:{dir:'', size:1},
        jump3:{dir:'', size:1},
    },
    //y,x,food,fuel
    A1: [1, 1, 0, 0],
    B1: [1, 2, 0, 0],
    C1: [2, 2, 0, 0],
    D1: [2, 1, 0, 0],
    A2: [-1, -1, 0, 0],
    B2: [-1, -1, 0, 0],
    A3: [-1, -1, 0, 0],
    A4: [-1, -1, 0, 0],
    paused: false,
    playing: false,

    A1StartingPosition: [1, 1, 0, 0],
    B1StartingPosition: [1, 2, 0, 0],
    C1StartingPosition: [2, 2, 0, 0],
    D1StartingPosition: [2, 1, 0, 0],

    gameBoardRowsStartingPosition: [
        ['','','','',''],
        ['','A','B','',''],
        ['','D','C','',''],
        ['','','','',''],
        ['','','r','s',''],],
};
const initialStateTestComposeRobo = {
    gameBoardRows: [
        ['','','',''],
        ['','A','B',''],
        ['','D','C',''],
        ['','','','']
    ],
    codeBoardRows: [['А1','Б1','В1','Г1','А2','Б2','А3','А4'],['←1','↓1','→1','←1','','','','']],
    currentCodeRow: [1],
    N: [4], //columns x
    M: [4], //rows    y
    buttonValue: 'UP',
    moveSize:1,
    foodSizeLoad:0,
    fuelSizeLoad:0,
    foodSizeUnload:0,
    fuelSizeUnload:0,
    moveValue:{
        jump1:{dir:'', size:1},
        jump2:{dir:'', size:1},
        jump3:{dir:'', size:1},
    },
    //y,x,food,fuel
    A1: [1, 1, 0, 0],
    B1: [1, 2, 0, 0],
    C1: [2, 2, 0, 0],
    D1: [2, 1, 0, 0],
    A2: [-1, -1, 0, 0],
    B2: [-1, -1, 0, 0],
    A3: [-1, -1, 0, 0],
    A4: [-1, -1, 0, 0],
    paused: false,
    playing: false,

    A1StartingPosition: [1, 1, 0, 0],
    B1StartingPosition: [1, 2, 0, 0],
    C1StartingPosition: [2, 2, 0, 0],
    D1StartingPosition: [2, 1, 0, 0],

    gameBoardRowsStartingPosition: [[['rocket',1,1],2,3],[4,5,6],[7,'h','j'],[11,'k', 'L__']],
};

function rootReducer(state = initialState, action) {
    if (action.type === UPDATE_CODE_FIELD) {

        const newEmptyRow = ['','','','','','','',''];

        var codeBoardNew = [...state.codeBoardRows];
        if(action.payload.Y === (state.codeBoardRows.length - 1))
            codeBoardNew = [...state.codeBoardRows, newEmptyRow];

        return Object.assign({}, state, {
            codeBoardRows: codeBoardNew.map((row, rowIndex) => {
                if(rowIndex === action.payload.Y)
                    return row.map((cell, cellIndex) =>{
                        if(cellIndex === action.payload.X)
                            return commandTransform(state.buttonValue, state);
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

            case 'moveSize': {
                return {
                    ...state,
                    moveSize: action.payload.sizeValue
                }
            }

            case 'moveValue1':{
                return {
                    ...state,
                    moveValue: {
                        ...state.moveValue,
                        jump1: {
                            ...state.moveValue.jump1,
                            size: action.payload.sizeValue
                        }
                    }
                }
            }
            case 'moveValue2':{
                return {
                    ...state,
                    moveValue: {
                        ...state.moveValue,
                        jump2: {
                            ...state.moveValue.jump2,
                            size: action.payload.sizeValue
                        }
                    }
                }
            }
            case 'moveValue3':{
                return {
                    ...state,
                    moveValue: {
                        ...state.moveValue,
                        jump3: {
                            ...state.moveValue.jump3,
                            size: action.payload.sizeValue
                        }
                    }
                }
            }
        }
    }
    if (action.type === CHANGE_COMPOSE_MOVE) {
        switch (action.payload.id) {
            case 'jump1':
                return {
                    ...state,
                    moveValue: {
                        ...state.moveValue,
                        jump1: {
                            ...state.moveValue.jump1,
                            dir: action.payload.butCom
                        }
                    }
                }
            case 'jump2':
                return {
                    ...state,
                    moveValue: {
                        ...state.moveValue,
                        jump2: {
                            ...state.moveValue.jump2,
                            dir: action.payload.butCom
                        }
                    }
                }
            case 'jump3':
                return {
                    ...state,
                    moveValue: {
                        ...state.moveValue,
                        jump3: {
                            ...state.moveValue.jump3,
                            dir: action.payload.butCom
                        }
                    }
                }
        }
    }
    if (action.type === LOAD_GAME_FIELD) {
        var N = action.payload.field.length;
        var M = action.payload.field[0].length;

        return {
            ...state,
            N: N,
            M: M,
            gameBoardRows: action.payload.field,
            gameBoardRowsStartingPosition: action.payload.field,
            A1: action.payload.a1,
            B1: action.payload.b1,
            C1: action.payload.c1,
            D1: action.payload.d1,

            A1StartingPosition: action.payload.a1,
            B1StartingPosition: action.payload.b1,
            C1StartingPosition: action.payload.c1,
            D1StartingPosition: action.payload.d1
        }
    }
    if (action.type === MAKE_STEP) {
        var currentRow = (state.currentCodeRow + 1);
        if (currentRow === state.codeBoardRows.length)
            currentRow -= 1;
        return {
            ...state,
            gameBoardRows: action.payload.field,
            A1: action.payload.a1,
            B1: action.payload.b1,
            C1: action.payload.c1,
            D1: action.payload.d1,
            currentCodeRow: currentRow,
        }
    }
    if (action.type === RESET_BOARD) {
        return {
            ...state,
            gameBoardRows: state.gameBoardRowsStartingPosition,
            A1: state.A1StartingPosition,
            B1: state.B1StartingPosition,
            C1: state.C1StartingPosition,
            D1: state.D1StartingPosition,
            A2: [-1, -1, 0, 0],
            B2: [-1, -1, 0, 0],
            A3: [-1, -1, 0, 0],
            A4: [-1, -1, 0, 0],
            currentCodeRow: 1,
        }
    }
    return state;
};

function commandTransform(buttonValue, state) {
    switch (buttonValue) {
        //UP
        case 'UP': return('↑'+state.moveSize); break;
        //DOWN
        case 'DOWN': return('↓'+state.moveSize); break;
        //LEFT
        case 'LEFT': return('←'+state.moveSize); break;
        //RIGHT
        case 'RIGHT': return('→'+state.moveSize); break;
        //COMPOSED
        case 'COMPOSED':
            let s = '';
            if (state.moveValue.jump1.dir !== '')
                s += state.moveValue.jump1.dir +  state.moveValue.jump1.size;
            if (state.moveValue.jump2.dir !== '')
                s += state.moveValue.jump2.dir +  state.moveValue.jump2.size;
            if (state.moveValue.jump3.dir !== '')
                s += state.moveValue.jump3.dir +  state.moveValue.jump3.size;

            return(s);
            break;

        //LOAD
        case 'LOAD':
            if(state.fuelSizeLoad === 0 && state.foodSizeLoad === 0)
                return ('');
            return('+'+'Т'+state.fuelSizeLoad+'П'+state.foodSizeLoad); break;
        //UNLOAD
        case 'UNLOAD':
            if(state.fuelSizeUnload === 0 && state.foodSizeUnload === 0)
                return ('');
            return('-'+'Т'+state.fuelSizeUnload+'П'+state.foodSizeUnload); break;

        //SPLIT
        case 'SPLIT': return('расстык'); break;
        //CONNECT
        case 'CONNECT': return('стык'); break;
        //CLEAR
        case 'CLEAR': return(''); break;
    }
}
function makeStep() {

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