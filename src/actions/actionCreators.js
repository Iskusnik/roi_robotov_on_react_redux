import {UPDATE_CODE_FIELD, CHANGE_CODE_BUTTON, CHANGE_INPUT_VALUE, CHANGE_COMPOSE_MOVE, LOAD_GAME_FIELD, MAKE_STEP, RESET_BOARD} from "./actionTypes";



export function updateCodeField(X, Y){
    return({
        type: UPDATE_CODE_FIELD,
        payload: {
            X: X,
            Y: Y
        }
    })
}

export function changeCodeButton(butCom){
    return({
        type: CHANGE_CODE_BUTTON,
        payload: {
            buttonCommand: butCom
        }
    })
}

export function changeInputValue(value, id){
    return({
        type: CHANGE_INPUT_VALUE,
        payload: {
            sizeValue: value,
            id: id
        }
    })
}

export function changeComposeMove(butCom, id) {
    return({
        type: CHANGE_COMPOSE_MOVE,
        payload: {
            butCom: butCom,
            id: id
        }
    })
}

export function loadGameField(field) {
    return({
        type: LOAD_GAME_FIELD,
        payload: {
            field: field
        }
    })
}

export function makeStep(field, a1, b1, c1, d1) {
    return({
        type: MAKE_STEP,
        payload: {
            field: field,
            a1: a1,
            b1: b1,
            c1: c1,
            d1: d1
        }
    })
}

export function resetBoard() {
    return({
        type: RESET_BOARD,
    })
}
/*
export function changeField(x, y, value){
    var boardRows = [];


    for (var i = 0; i < M; i++) {
        boardRows[i] = Array(N);
    }

    return({
        type: GENERATE_FIELD,
        payload: {
            N: N,
            M: M,
            boardRows: boardRows
        }
    })
}*/