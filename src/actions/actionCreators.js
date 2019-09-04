import {UPDATE_CODE_FIELD, CHANGE_CODE_BUTTON, CHANGE_INPUT_VALUE} from "./actionTypes";



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