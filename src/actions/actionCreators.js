import { GENERATE_CODE_FIELD, UPDATE_CODE_FIELD, CHANGE_CODE_BUTTON} from "./actionTypes";


export function generateCodeField(N, M){
    var boardRows = [];


    for (var i = 0; i < M; i++) {
        boardRows[i] = Array(N);
    }

    return({
        type: GENERATE_CODE_FIELD,
        payload: {
            N: N,
            M: M,
            boardRows: boardRows
        }
    })
}
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
            command: butCom
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