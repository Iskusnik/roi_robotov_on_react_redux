import React, { Component } from 'react';
import { connect } from 'react-redux';
import './componentsStyles.css';
import {tileNames, errorNames} from './GameConstants';
import {loadGameField, makeStep, resetBoard, stepBack} from "../actions/actionCreators";

const mapStateToProps = state => {
    return {
        gameState:{
            gameBoardRows: state.gameBoardRows,
            //y,x,food,fuel
            0: state.A1,
            1: state.B1,
            2: state.C1,
            3: state.D1,
            4: state.A2,
            5: state.B2,
            6: state.A3,
            7: state.A4,
        },

        codeBoardRows: state.codeBoardRows,
        selectedRow: state.currentCodeRow,
        N: state.N, //rows, y
        M: state.M, //columns, x
        pause: state.paused,
        play: state.playing,
    };
};
const roboNames = {
    0: 'A1',
    1: 'B1',
    2: 'C1',
    3: 'D1',
    4: 'A2',
    5: 'B2',
    6: 'A3',
    7: 'A4',
    'A1': 0,
    'B1': 1,
    'C1': 2,
    'D1': 3,
};
function mapDispatchToProps(dispatch) {
    return {
        loadGameField: (field, a1,b1,c1,d1) => dispatch(loadGameField(field, a1,b1,c1,d1)),
        makeStep:(field, a1,b1,c1,d1,a2,b2,a3,a4) => dispatch(makeStep(field, a1,b1,c1,d1,a2,b2,a3,a4)),
        resetBoard:()=>dispatch(resetBoard()),
        stepBack:()=>dispatch(stepBack()),
    };
}

export class GameButtonsMenu extends  Component{

    constructor() {
        super();
        //this.buttonsCommands = gameButtons;
    }

    handleMakeStep(){
        var {field, a1,b1,c1,d1,a2,b2,a3,a4,erCode} = this.calcNewState()

        //console.log(this.props.gameState["0"])

        if(erCode == '')
            this.props.makeStep(field, a1,b1,c1,d1,a2,b2,a3,a4);
        else{
            console.log(erCode);

            var result = 'ОШИБКА \n' + erCode.join('\n');

            alert(result);
            this.props.resetBoard();


        }
    }
    calcNewState(){
        var erCode = [''];
        var newGameState = JSON.parse(JSON.stringify(this.props.gameState));
        var line = this.props.codeBoardRows[this.props.selectedRow];

        for(var i = 0; i < 8; i++){

            var y = Object.assign({},this.props.gameState[i][0]);
            var x = Object.assign({},this.props.gameState[i][1]);

            if (y === -1 && line[i] !== '') {
                erCode.push(errorNames.unexpectedCommand + ' - ' + roboNames[i]);
            }
            else
                if (y !== -1 && line[i] !== ''){
                //0 - движение,
                // 1 - загрузка/разгрузка,
                // 2 - стык,
                // 3 - расстык,
                //-1 - бездействие
                var t = -1;

                //знак для загрузки/разгрузки
                var sign = 0;

                switch (line[i][0]) {
                    case '+': sign = 1; t = 1; break;
                    case '-': sign = -1; t = 1; break;
                    case 'с': t = 2; break;
                    case 'р': t = 3; break;
                    default: t = 0; break;
                }
                switch (t) {
                    case 0:{
                        if(i < 6){
                            if(line[i].length > 2 ||
                                (parseInt(line[i][1]) > 1 && i < 4) ||
                                parseInt(line[i][1]) > 3 ||
                                line[i][0] === '↖' ||
                                line[i][0] === '↗' ||
                                line[i][0] === '↘' ||
                                line[i][0] === '↙'
                            ) {
                                erCode.push(errorNames.wrongCommand + ' - ' + roboNames[i]);
                            }

                            var moveSize = parseInt(line[i][1]);
                            for(var cell = 0; cell < moveSize; cell++){
                                //y
                                if(line[i][0] === '↑'){
                                    newGameState[i][0] -= 1;
                                }
                                if(line[i][0] === '↓'){
                                    newGameState[i][0] += 1;
                                }
                                //x
                                if(line[i][0] === '→'){
                                    newGameState[i][1] += 1;
                                }
                                if(line[i][0] === '←'){
                                    newGameState[i][1] -= 1;
                                }

                                var xNew = newGameState[i][1];
                                var yNew = newGameState[i][0];

                                if(
                                    xNew >= this.props.M || xNew < 0 ||
                                    yNew >= this.props.N || yNew < 0
                                ) {
                                    erCode.push(errorNames.outOfMap + ' - ' + roboNames[i]);
                                }
                                else
                                    if(newGameState.gameBoardRows[yNew][xNew][0] === tileNames.mountain) {
                                        erCode.push(errorNames.roboMount + ' - ' + roboNames[i]);
                                    }
                            }
                        }
                        else if(i === 6){
                            if(
                                line[i].length > 4 ||
                                line[i][0] === '↖' ||
                                line[i][0] === '↗' ||
                                line[i][0] === '↘' ||
                                line[i][0] === '↙'
                            ) {
                                erCode.push(errorNames.wrongCommand + ' - ' + roboNames[i]);
                            }

                            var moveSize1 = parseInt(line[i][1]);
                            var moveSize2 = 0;
                            var xNew = 0;
                            var yNew = 0;

                            //первая часть движения
                            for(var cell = 0; cell < moveSize1; cell++){
                                //y
                                if(line[i][0] === '↑'){
                                    newGameState[i][0] -= 1;
                                }
                                if(line[i][0] === '↓'){
                                    newGameState[i][0] += 1;
                                }
                                //x
                                if(line[i][0] === '→'){
                                    newGameState[i][1] += 1;
                                }
                                if(line[i][0] === '←'){
                                    newGameState[i][1] -= 1;
                                }

                                xNew = newGameState[i][1];
                                yNew = newGameState[i][0];

                                if(
                                    xNew >= this.props.M || xNew < 0 ||
                                    yNew >= this.props.N || yNew < 0
                                ) {
                                    erCode.push(errorNames.outOfMap + ' - ' + roboNames[i]);
                                }
                                else
                                    if(newGameState.gameBoardRows[yNew][xNew][0] === tileNames.mountain) {
                                        erCode.push(errorNames.roboMount + ' - ' + roboNames[i]);
                                    }

                            }

                            if(
                                xNew >= this.props.M || xNew < 0 ||
                                yNew >= this.props.N || yNew < 0
                            ) {
                                erCode.push(errorNames.outOfMap + ' - ' + roboNames[i]);
                            }else//промежуточная проверка на поворот в яме
                                if(newGameState.gameBoardRows[yNew][xNew][0] === tileNames.hole) {
                                    erCode.push(errorNames.roboFall + ' - ' + roboNames[i]);
                                }
                            //вторая, если существует
                            if(line[i].length > 2){
                                if(
                                    line[i][2] === '↖' ||
                                    line[i][2] === '↗' ||
                                    line[i][2] === '↘' ||
                                    line[i][2] === '↙'
                                ) {
                                    erCode.push(errorNames.wrongCommand + ' - ' + roboNames[i]);
                                }
                                moveSize2 = parseInt(line[i][3]);
                                for(var cell = 0; cell < moveSize2; cell++){
                                    //y
                                    if(line[i][2] === '↑'){
                                        newGameState[i][0] -= 1;
                                    }
                                    if(line[i][2] === '↓'){
                                        newGameState[i][0] += 1;
                                    }
                                    //x
                                    if(line[i][2] === '→'){
                                        newGameState[i][1] += 1;
                                    }
                                    if(line[i][2] === '←'){
                                        newGameState[i][1] -= 1;
                                    }

                                    xNew = newGameState[i][1];
                                    yNew = newGameState[i][0];

                                    if(
                                        xNew >= this.props.M || xNew < 0 ||
                                        yNew >= this.props.N || yNew < 0
                                    ) {
                                        erCode.push(errorNames.outOfMap + ' - ' + roboNames[i]);
                                    }
                                    else
                                        if(newGameState.gameBoardRows[yNew][xNew][0] === tileNames.mountain) {
                                            erCode.push(errorNames.roboMount + ' - ' + roboNames[i]);
                                        }

                                }
                            }

                            //проверка на превышение длины движения роботом
                            if((moveSize2 + moveSize1) > 5){
                                erCode.push(errorNames.wrongCommand + ' - ' + roboNames[i]);
                            }
                        }
                        else if(i === 7){

                            var moveSize1 = parseInt(line[i][1]);
                            var moveSize2 = 0;
                            var moveSize3 = 0;
                            var xNew = 0;
                            var yNew = 0;

                            //первая часть движения
                            for(var cell = 0; cell < moveSize1; cell++){
                                //y
                                if(line[i][0] === '↑'){
                                    newGameState[i][0] -= 1;
                                }
                                if(line[i][0] === '↓'){
                                    newGameState[i][0] += 1;
                                }
                                //x
                                if(line[i][0] === '→'){
                                    newGameState[i][1] += 1;
                                }
                                if(line[i][0] === '←'){
                                    newGameState[i][1] -= 1;
                                }

                                //Диагонали
                                if(line[i][0] === '↖'){
                                    newGameState[i][1] -= 1;
                                    newGameState[i][0] -= 1;
                                }
                                if(line[i][0] === '↗'){
                                    newGameState[i][1] += 1;
                                    newGameState[i][0] -= 1;
                                }
                                if(line[i][0] === '↙'){
                                    newGameState[i][1] -= 1;
                                    newGameState[i][0] += 1;
                                }
                                if(line[i][0] === '↘'){
                                    newGameState[i][1] += 1;
                                    newGameState[i][0] += 1;
                                }
                                xNew = newGameState[i][1];
                                yNew = newGameState[i][0];

                                if(
                                    xNew >= this.props.M || xNew < 0 ||
                                    yNew >= this.props.N || yNew < 0
                                ) {
                                    erCode.push(errorNames.outOfMap + ' - ' + roboNames[i]);
                                }
                                else
                                    if(newGameState.gameBoardRows[yNew][xNew][0] === tileNames.mountain) {
                                        erCode.push(errorNames.roboMount + ' - ' + roboNames[i]);
                                    }

                            }

                            //промежуточная проверка на поворот в яме
                            if(
                                xNew >= this.props.M || xNew < 0 ||
                                yNew >= this.props.N || yNew < 0
                            ) {
                                erCode.push(errorNames.outOfMap + ' - ' + roboNames[i]);
                            }else
                                if(newGameState.gameBoardRows[yNew][xNew][0] === tileNames.hole) {
                                erCode.push(errorNames.roboFall + ' - ' + roboNames[i]);
                            }

                            //вторая, если существует
                            if(line[i].length > 2){

                                moveSize2 = parseInt(line[i][3]);
                                for(var cell = 0; cell < moveSize2; cell++){
                                    //y
                                    if(line[i][2] === '↑'){
                                        newGameState[i][0] -= moveSize2;
                                    }
                                    if(line[i][2] === '↓'){
                                        newGameState[i][0] += moveSize2;
                                    }
                                    //x
                                    if(line[i][2] === '→'){
                                        newGameState[i][1] += moveSize2;
                                    }
                                    if(line[i][2] === '←'){
                                        newGameState[i][1] -= moveSize2;
                                    }

                                    //Диагонали
                                    if(line[i][2] === '↖'){
                                        newGameState[i][1] -= 1;
                                        newGameState[i][0] -= 1;
                                    }
                                    if(line[i][2] === '↗'){
                                        newGameState[i][1] += 1;
                                        newGameState[i][0] -= 1;
                                    }
                                    if(line[i][2] === '↙'){
                                        newGameState[i][1] -= 1;
                                        newGameState[i][0] += 1;
                                    }
                                    if(line[i][2] === '↘'){
                                        newGameState[i][1] += 1;
                                        newGameState[i][0] += 1;
                                    }
                                    xNew = newGameState[i][1];
                                    yNew = newGameState[i][0];

                                    if(
                                        xNew >= this.props.M || xNew < 0 ||
                                        yNew >= this.props.N || yNew < 0
                                    ) {
                                        erCode.push(errorNames.outOfMap + ' - ' + roboNames[i]);
                                    }
                                    else
                                        if(newGameState.gameBoardRows[yNew][xNew][0] === tileNames.mountain) {
                                            erCode.push(errorNames.roboMount + ' - ' + roboNames[i]);
                                        }
                                }
                            }

                            if(
                                xNew >= this.props.M || xNew < 0 ||
                                yNew >= this.props.N || yNew < 0
                            ) {
                                erCode.push(errorNames.outOfMap + ' - ' + roboNames[i]);
                            }else//промежуточная проверка на поворот в яме
                                if(newGameState.gameBoardRows[yNew][xNew][0] === tileNames.hole) {
                                    erCode.push(errorNames.roboFall + ' - ' + roboNames[i]);
                                }

                            //вторая, если существует
                            if(line[i].length > 4){

                                moveSize3 = parseInt(line[i][5]);
                                for(var cell = 0; cell < moveSize2; cell++){
                                    //y
                                    if(line[i][4] === '↑'){
                                        newGameState[i][0] -= moveSize2;
                                    }
                                    if(line[i][4] === '↓'){
                                        newGameState[i][0] += moveSize2;
                                    }
                                    //x
                                    if(line[i][4] === '→'){
                                        newGameState[i][1] += moveSize2;
                                    }
                                    if(line[i][4] === '←'){
                                        newGameState[i][1] -= moveSize2;
                                    }

                                    //Диагонали
                                    if(line[i][4] === '↖'){
                                        newGameState[i][1] -= 1;
                                        newGameState[i][0] -= 1;
                                    }
                                    if(line[i][4] === '↗'){
                                        newGameState[i][1] += 1;
                                        newGameState[i][0] -= 1;
                                    }
                                    if(line[i][4] === '↙'){
                                        newGameState[i][1] -= 1;
                                        newGameState[i][0] += 1;
                                    }
                                    if(line[i][4] === '↘'){
                                        newGameState[i][1] += 1;
                                        newGameState[i][0] += 1;
                                    }
                                    xNew = newGameState[i][1];
                                    yNew = newGameState[i][0];

                                    if(
                                        xNew >= this.props.M || xNew < 0 ||
                                        yNew >= this.props.N || yNew < 0
                                    ) {
                                        erCode.push(errorNames.outOfMap + ' - ' + roboNames[i]);
                                    }
                                    else
                                    if(newGameState.gameBoardRows[yNew][xNew][0] === tileNames.mountain) {
                                        erCode.push(errorNames.roboMount + ' - ' + roboNames[i]);
                                    }
                                }
                            }

                            //проверка на превышение длины движения роботом
                            if((moveSize3 + moveSize2 + moveSize1) > 8){
                                erCode.push(errorNames.wrongCommand + ' - ' + roboNames[i]);
                            }
                        }


                        /*
                                                var xNew = newGameState[i][1];
                                                var yNew = newGameState[i][0];

                                                //проверка на выход за границы карты
                                                if(
                                                    xNew >= this.props.M || xNew < 0 ||
                                                    yNew >= this.props.N || yNew < 0
                                                ) {
                                                    erCode.push(errorNames.outOfMap + ' - ' + roboNames[i]);
                                                }

                                                console.log(i)
                                                console.log(yNew)
                                                console.log(xNew)
                                                console.log(newGameState.gameBoardRows[yNew][xNew])
                                                if(newGameState.gameBoardRows[yNew][xNew][0] === tileNames.mountain) {
                                                    erCode.push(errorNames.roboMount + ' - ' + roboNames[i]);
                                                }*/

                        break;
                    }
                    case 1:{

                        newGameState[i][3] = newGameState[i][3] + sign*parseInt(line[i][4]);

                        newGameState[i][2] = newGameState[i][2] + sign*parseInt(line[i][2]);



                        //Вне склада
                        if(
                            newGameState.gameBoardRows[y][x][0] !== tileNames.rocket &&
                            newGameState.gameBoardRows[y][x][0] !== tileNames.storage
                        ){
                            erCode.push(errorNames.outOfStorage + ' - ' + roboNames[i]);
                        }
                        else{
                            newGameState.gameBoardRows[y][x][1] -= sign*parseInt(line[i][2]);
                            newGameState.gameBoardRows[y][x][2] -= sign*parseInt(line[i][4]);

                            if(
                                newGameState.gameBoardRows[y][x][2] < 0 ||
                                newGameState.gameBoardRows[y][x][1] < 0
                            )
                                erCode.push(errorNames.emptyStorage + ' - ' + roboNames[i]);
                        }

                        //Перегрузка
                        if(
                            i < 3 && (newGameState[i][2] + newGameState[i][3]) > 1 ||
                            i < 6 && i >= 3 && (newGameState[i][2] + newGameState[i][3]) > 3 ||
                            i < 7 && i >= 6 && (newGameState[i][2] + newGameState[i][3]) > 5 ||
                            i === 7 && (newGameState[i][2] + newGameState[i][3]) > 8
                        ){
                            erCode.push(errorNames.overload + ' - ' + roboNames[i]);
                        }
//Перегрузка
                        if(
                            newGameState[i][2] < 0 ||
                            newGameState[i][3] < 0
                        ){
                            erCode.push(errorNames.empty + ' - ' + roboNames[i]);
                        }





                        break;
                    }

                    case 2:{
                        var j = -1;
                        for (var t = 0; t < 8; t++){
                            if(
                                this.props.gameState[t][0] === y &&
                                this.props.gameState[t][1] === x + 1
                            )
                                j = t;
                        }
                        if(j !== -1){
                            if(line[j] != ''){
                                console.log(i + ' ' + j)
                                erCode.push(errorNames.connectionErrorMove + ' - ' + roboNames[j]);
                            }
                            else
                                if(
                                    (newGameState[i][2] + newGameState[i][3]) !== 0 &&
                                    (newGameState[j][2] + newGameState[j][3]) !== 0
                                )
                                    erCode.push(errorNames.connectionErrorLoad + ' - ' + roboNames[i] + ' - ' + roboNames[j]);
                                else{

                                    var botLsize = 4, botRsize = 1, botNewSize = 0;

                                    if (i < 4)
                                        botLsize = 1;
                                    if (i > 3 && i < 6)
                                        botLsize = 2;
                                    if (i === 6)
                                        botLsize = 3;

                                    if (j > 3 && j < 6)
                                        botRsize = 2;
                                    if (j === 6)
                                        botRsize = 3;

                                    if(botLsize === 4)
                                        erCode.push(errorNames.wrongCommand + ' - ' + roboNames[i]);
                                    else {
                                        botNewSize = botLsize + botRsize;
                                        newGameState[i][0] = -1;
                                        newGameState[i][1] = -1;
                                        newGameState[j][0] = -1;
                                        newGameState[j][1] = -1;

                                        switch (botNewSize) {
                                            case 2:
                                                if(newGameState[4][0] === -1)
                                                    newGameState[4] = [y, x+1, 0, 0, roboNames[i] + '_' + roboNames[j]];
                                                else
                                                    newGameState[5] = [y, x+1, 0, 0, roboNames[i] + '_' + roboNames[j]];
                                                break;
                                            case 3:
                                                var name = '';
                                                if(i > 3)
                                                    name += '_' + newGameState[i][4];
                                                else
                                                    name += '_' + roboNames[i];

                                                if(j > 3)
                                                    name += '_' + newGameState[j][4];
                                                else
                                                    name += '_' + roboNames[j];

                                                newGameState[6]= [y, x+1, 0, 0, name];
                                                break;
                                            case 4:
                                                var name = '';
                                                if(i > 3)
                                                    name += '_' + newGameState[i][4];
                                                else
                                                    name += '_' + roboNames[i];

                                                if(j > 3)
                                                    name += '_' + newGameState[j][4];
                                                else
                                                    name += '_' + roboNames[j];

                                                newGameState[7]= [y, x+1, 0, 0, name];
                                                break;
                                        }
                                    }
                                }
                        }
                        else
                            erCode.push(errorNames.connectionErrorNone + roboNames[i]);











                        break;
                    }

                    case 3:{
                        if(x + 1 === newGameState.M)
                            erCode.push(errorNames.connectionErrorPlace + ' - ' + roboNames[i]);
                        else
                            if(this.props.gameState.gameBoardRows[y][x+1] !== '')
                                erCode.push(errorNames.connectionErrorPlace + ' - ' + roboNames[i]);
                            else
                                if(i < 3)
                                    erCode.push(errorNames.wrongCommand + ' - ' + roboNames[i]);
                                else
                                {
                                    //console.log(roboNames[newGameState[i][4].split('_')[0]]);
                                    //console.log(newGameState[i][4]);
                                    var bots = newGameState[i][4].split('_').filter(function(value){

                                        return value !== '';

                                    });
                                    var s = bots.length - 1;
                                    var newBot = roboNames[bots[0]];
                                    console.log(s);
                                    console.log(bots);


                                    newGameState[i] = [-1, -1, 0, 0];
                                    newGameState[newBot] = [y, x + 1, 0, 0];

                                    switch (s) {
                                        case 1: newGameState[roboNames[bots[1]]] = [y, x, 0, 0]; break;
                                        case 2: newGameState[4] = [y, x, 0, 0, bots[1] + '_' + bots[2]]; console.log(bots[1] + '_' + bots[2]); break;
                                        case 3: newGameState[6] = [y, x, 0, 0,  bots[1] + '_' + bots[2] + '_' + bots[3]]; break;
                                    }
                                }

                        break;
                    }
                }
            }
        }


        //Проверка на столкновение роботов и падение в яму
        for(var i = 0; i < 8; i++){
            var x = newGameState[i][1];
            var y = newGameState[i][0];


            if(
                x > -1 && y > -1 &&
                x < this.props.M && y < this.props.N
            )
                if(
                    newGameState.gameBoardRows[y][x] !== tileNames.storage ||
                    newGameState.gameBoardRows[y][x] !== tileNames.rocket
                ){
                    for(var j = i + 1; j < 8; j++) {
                            if(
                            x !== -1 &&
                            y === newGameState[j][0] &&
                            x === newGameState[j][1]
                        ){
                            erCode.push(errorNames.roboCollision + ' - ' + roboNames[i] + ' - ' + roboNames[j]);
                        }
                        else;
                    }
                }
                else{
                    if(newGameState.gameBoardRows[y][x] === tileNames.hole)
                        erCode.push(errorNames.roboFall + ' - ' + roboNames[i] + ' - ' + roboNames[j]);

                    //if(newGameState.gameBoardRows[y][x] === tileNames.mountain)
                    //    erCode.push(errorNames.roboMount + ' - ' + roboNames[i] + ' - ' + roboNames[j]);
                }
        }

        return {
            field:newGameState.gameBoardRows,
            a1: newGameState[0],
            b1: newGameState[1],
            c1: newGameState[2],
            d1: newGameState[3],
            a2: newGameState[4],
            b2: newGameState[5],
            a3: newGameState[6],
            a4: newGameState[7],
            erCode: erCode
        };
    }

    loadMap(e){
        var file = e.target.files[0];
        if (file !== undefined) {
            var reader = new FileReader();
            reader.onload = (e) => {
                var lines = e.target.result.split('\n');
                var infoLines = [];

                //console.log(N.toString() + M.toString())
                //Удаляем комментарии
                for (var line = 0; line < lines.length; line++) {
                    if (!lines[line].startsWith('//')){
                        infoLines.push(lines[line]);
                    }
                }
                var {gameField, a1, b1, c1, d1} = this.txtToMap(infoLines);

                console.log(a1);
                console.log(b1);
                console.log(c1);
                console.log(d1);
                this.props.loadGameField(gameField, a1, b1, c1, d1);
            };
            reader.readAsText(file);

        }
    }
    txtToMap(txt){
        var field = [];

        var N = 0, M = 0, mount = 0,  holes = 0, rockets = 0, storages = 0;
        var a1, b1, c1, d1;
        var NM = txt[0].split(" ");
        N = parseInt(NM[0]);
        M = parseInt(NM[1]);
        for (var i = 0; i < N; i++) {
            field[i] = Array(M).fill(tileNames.empty);
        }

        var line = 1;
        mount = parseInt(txt[line]);
        for (var i = 0; i < mount; i++) {
            line++;
            var {x, y} = this.splitXY(txt[line]);
            field[y][x] = tileNames.mountain;
        }

        line++;
        holes = parseInt(txt[line]);
        for (var i = 0; i < holes; i++) {
            line++;
            var {x, y} = this.splitXY(txt[line]);
            field[y][x] = tileNames.hole;
        }


        line++;
        rockets = parseInt(txt[line]);
        for (var i = 0; i < rockets; i++) {
            line++;
            var {x, y, fuel, food} = this.splitXY(txt[line], 'storage');
            field[y][x] = [tileNames.rocket, 0, 0, fuel, food];
        }
        line++;
        storages = parseInt(txt[line]);
        for (var i = 0; i < storages; i++) {
            line++;
            var {x, y, fuel, food} = this.splitXY(txt[line], 'storage');
            field[y][x] = [tileNames.storage, fuel, food];
        }
        for (var i = 0; i < 4; i++) {
            line++;
            var {x, y} = this.splitXY(txt[line]);
            switch (i) {
                case 0:
                    a1 = [y, x, 0, 0];
                    field[y][x] = tileNames.baseA;
                    break;
                case 1:
                    b1 = [y, x, 0, 0];
                    field[y][x] = tileNames.baseB;
                    break;
                case 2:
                    c1 = [y, x, 0, 0];
                    field[y][x] = tileNames.baseC;
                    break;
                case 3:
                    d1 = [y, x, 0, 0];
                    field[y][x] = tileNames.baseD;
                    break;
            }
        }

        return {
            gameField: field,
            a1: a1,
            b1: b1,
            c1: c1,
            d1: d1};
    }
    splitXY(line, tileType = 'tile'){
        if (tileType === 'tile'){
            var XY = line.split(" ");
            var Y = parseInt(XY[0]);
            var X = parseInt(XY[1]);
            //console.log(XY);
            return {x:X, y:Y};
        }
        if (tileType === 'storage'){
            var XY = line.split(" ");
            var Y = parseInt(XY[0]);
            var X = parseInt(XY[1]);
            var fuel = parseInt(XY[2]);
            var food = parseInt(XY[3]);
            //console.log(XY);
            return {x:X, y:Y, fuel:fuel, food:food};
        }
    }


    handleAnimation(e){
        if(this.props.selectedRow !== 1)
            this.props.stepBack();
        else
            alert('Невозможно сделать шаг назад')
    }
    handleMakeAllSteps(e){
        if(this.props.selectedRow !== 1)
            this.props.stepBack();
        else
            alert('Невозможно сделать шаг назад')
    }

    handleStepBack(e){
        if(this.props.selectedRow !== 1)
            this.props.stepBack();
        else
            alert('Невозможно сделать шаг назад')
    }
    handleReset(e){
        this.props.resetBoard()
    }
    render() {
        return(
            <div>
                <div>
                    <label>
                        Карта:
                        <input name="fileMap" type="file" onChange={(e)=> this.loadMap(e)} title={"Загрузить карту"} />
                    </label>
                    <label>
                        Алгоритм:
                        <input name="fileMap" type="file" onChange={(e)=> this.loadMap(e)} title={"Загрузить карту"} />
                    </label>
                </div>

                <button onClick={(e)=> this.handleReset(e)}>
                    В начало
                </button>

                <button onClick={(e)=> this.handleStepBack(e)}>
                    Сделать шаг назад
                </button>

                <button onClick={(e)=> this.handleMakeStep(e)}>
                    Сделать шаг вперёд
                </button>

                <button onClick={(e)=> this.handleAnimation(e)}>
                    Запустить выполнение алгоритма
                </button>

                <button onClick={(e)=> this.handleMakeAllSteps(e)}>
                    Выполнить алгоритм
                </button>
            </div>
        )}


}


export default connect(mapStateToProps, mapDispatchToProps)(GameButtonsMenu);

