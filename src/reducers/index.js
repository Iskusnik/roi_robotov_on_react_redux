//import { combineReducers } from "redux";
//export default combineReducers();
import {
    UPDATE_CODE_FIELD,
    CHANGE_CODE_BUTTON,
    CHANGE_INPUT_VALUE,
    CHANGE_COMPOSE_MOVE,
    LOAD_GAME_FIELD,
    MAKE_STEP,
    RESET_BOARD, STEP_BACK,
} from "../actions/actionTypes";
import {gameButtons} from "../components/GameConstants";

const initialState = {
    previousState: {},
    gameBoardRows: [
        ['','','','',''],
        ['','A','B','',''],
        ['','D','C','',''],
        ['','','','',''],
        ['','',["r", 1, 1, 6, 7],["s", 10, 11],''],
    ],
    codeBoardRows: [['А1','B1','C1','D1','А2','B2','А3','А4'],['←1','↓1','→1','←1','','','',''],['','','','','','','','']],
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
    //y,x,fuel,food
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

    gameBoardRowsStartingPosition:[
    ['','','','',''],
    ['','A','B','',''],
    ['','D','C','',''],
    ['','','','',''],
    ['','',["r", 1, 1, 6, 7],["s", 10, 11],''],
],
};
const initialStateSplitConnect = {
    gameBoardRows: [
        ['','','','',''],
        ['','A','B','m',''],
        ['','D','C','',''],
        ['','','','',''],
        ['','',["r", 1, 1, 6, 7],["s", 10, 11],''],
    ],
    codeBoardRows: [['А1','B1','C1','D1','А2','B2','А3','А4'],['стык','','→1','←1','','','',''],['','','','','расстык','','','']],
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
    //y,x,fuel,food
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

    gameBoardRowsStartingPosition:[
        ['','','','',''],
        ['','A','B','',''],
        ['','D','C','',''],
        ['','','','',''],
        ['','',["r", 1, 1, 6, 7],["s", 10, 11],''],
    ],
};
const initialStateTestComposeRobo = {
    previousState: {},
    gameBoardRows: [
        ['','','','',''],
        ['','A','B','h',''],
        ['','D','C','',''],
        ['','','','',''],
        ['','',["r", 1, 1, 6, 7],["s", 10, 11],''],
    ],
    codeBoardRows: [['№','А1','B1','C1','D1','А2','B2','А3','А4'],['','←1','↓1','→1','←1','','','',''],['','','','','','','','','']],
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
    //y,x,fuel,food
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

    gameBoardRowsStartingPosition:[
        ['','','','',''],
        ['','A','B','',''],
        ['','D','C','',''],
        ['','','','',''],
        ['','',["r", 1, 1, 6, 7],["s", 10, 11],''],
    ],
};

function rootReducer(state = initialStateTestComposeRobo, action) {
    if (action.type === UPDATE_CODE_FIELD) {

        const newEmptyRow = ['','','','','','','','',''];

        var codeBoardNew = [...state.codeBoardRows];
        if(action.payload.Y === (state.codeBoardRows.length - 1))
            codeBoardNew = [...state.codeBoardRows, newEmptyRow];

        var result = Object.assign({}, state, {
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


        if(
            action.payload.Y === (result.codeBoardRows.length - 2) &&
            JSON.stringify(result.codeBoardRows[action.payload.Y]) === JSON.stringify(newEmptyRow)
        ) {

            codeBoardNew = [...result.codeBoardRows];
            var index = action.payload.Y;
            if (index !== -1) {
                codeBoardNew.splice(index, 1);
            }
        }
        var result = Object.assign({}, state, {
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
        return result;
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
            gameBoardRows: Object.assign([],action.payload.field),
            gameBoardRowsStartingPosition: Object.assign([],action.payload.field),
            A1: action.payload.a1,
            B1: action.payload.b1,
            C1: action.payload.c1,
            D1: action.payload.d1,

            A1StartingPosition: Object.assign({},action.payload.a1),
            B1StartingPosition: Object.assign({},action.payload.b1),
            C1StartingPosition: Object.assign({},action.payload.c1),
            D1StartingPosition: Object.assign({},action.payload.d1)
        }
    }
    if (action.type === MAKE_STEP) {
        //console.log(state.A1StartingPosition);


        var currentRow = (state.currentCodeRow + 1);
        if (currentRow === state.codeBoardRows.length)
            getResult(state)
        else{
            if (currentRow === state.codeBoardRows.length - 1)
                getResult(state)
            var oldState = JSON.parse(JSON.stringify(state));
            /*console.log(state.A1)
            console.log(oldState.A1)
            try {
            console.log(oldState.previousState.A1)
            }
            catch (e) {

            }*/
            return {
                ...state,
                gameBoardRows: action.payload.field,
                A1: action.payload.a1,
                B1: action.payload.b1,
                C1: action.payload.c1,
                D1: action.payload.d1,

                A2: action.payload.a2,
                B2: action.payload.b2,
                A3: action.payload.a3,
                A4: action.payload.a4,
                currentCodeRow: currentRow,
                previousState: oldState
            }
        }
    }
    if (action.type === RESET_BOARD) {

        return {
            ...state,
            gameBoardRows: JSON.parse(JSON.stringify(state.gameBoardRowsStartingPosition)),//Object.assign([],state.gameBoardRowsStartingPosition),
            A1: Object.assign({},state.A1StartingPosition),
            B1: Object.assign({},state.B1StartingPosition),
            C1: Object.assign({},state.C1StartingPosition),
            D1: Object.assign({},state.D1StartingPosition),
            A2: [-1, -1, 0, 0],
            B2: [-1, -1, 0, 0],
            A3: [-1, -1, 0, 0],
            A4: [-1, -1, 0, 0],
            currentCodeRow: 1,
            paused: false,
            playing: false,
        }
    }

    if (action.type === STEP_BACK) {
        return {
            ...state,
            gameBoardRows: JSON.parse(JSON.stringify(state.previousState.gameBoardRows)),//Object.assign([],state.gameBoardRowsStartingPosition),
            A1: JSON.parse(JSON.stringify(state.previousState.A1)),
            B1: JSON.parse(JSON.stringify(state.previousState.B1)),
            C1: JSON.parse(JSON.stringify(state.previousState.C1)),
            D1: JSON.parse(JSON.stringify(state.previousState.D1)),
            A2: JSON.parse(JSON.stringify(state.previousState.A2)),
            B2: JSON.parse(JSON.stringify(state.previousState.B2)),
            A3: JSON.parse(JSON.stringify(state.previousState.A3)),
            A4: JSON.parse(JSON.stringify(state.previousState.A4)),
            currentCodeRow: JSON.parse(JSON.stringify(state.previousState.currentCodeRow)),
            previousState: JSON.parse(JSON.stringify(state.previousState.previousState)),
            paused: false,
            playing: false,
        }
    }
    return state;
};
function getResult(state) {

    var botName ={
        0: 'A1',
        1: 'B1',
        2: 'C1',
        3: 'D1',
    }

    var result = [];
    for (var i = 0; i < 4; i++)
        if(state.gameBoardRows[state[botName[i]][0]][state[botName[i]][0]] === botName[i][0])
            result.push('Робот ' + botName[i] +' на базе');
        else
            result.push('Робот ' + botName[i] +' не на базе (!)');

    result = 'Результат: \n' + result.join('\n');

    alert(result);
}
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