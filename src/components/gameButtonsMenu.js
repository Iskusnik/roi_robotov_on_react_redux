import React, { Component } from 'react';
import { connect } from 'react-redux';
import './componentsStyles.css';
import {tileNames, errorNames} from './GameConstants';
import {loadGameField, makeStep, resetBoard} from "../actions/actionCreators";

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
        N: state.N, //columns
        M: state.M, //rows
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
};
function mapDispatchToProps(dispatch) {
    return {
        loadGameField: (field, a1,b1,c1,d1) => dispatch(loadGameField(field, a1,b1,c1,d1)),
        makeStep:(field, a1,b1,c1,d1,a2,b2,a3,a4) => dispatch(makeStep(field, a1,b1,c1,d1,a2,b2,a3,a4)),
        resetBoard:()=>dispatch(resetBoard()),
    };
}

export class GameButtonsMenu extends  Component{

    constructor() {
        super();
        //this.buttonsCommands = gameButtons;
    }

    handleMakeStep(){
        var {field, a1,b1,c1,d1,a2,b2,a3,a4,erCode} = this.calcNewState()

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
        var newGameState = Object.assign({}, this.props.gameState);
        var line = this.props.codeBoardRows[this.props.selectedRow];

        for (var i = 0; i < 8; i++){

            var y = newGameState[i][0];
            var x = newGameState[i][1];

            if (y === -1 && line[i] !== '') {
                erCode.push(errorNames.unexpectedCommand + ' - ' + roboNames[i]);
            }
            else{
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
                        if(i < 4){
                            if(line[i].length > 2) {
                                erCode.push(errorNames.wrongCommand + ' - ' + roboNames[i]);
                            }
                            //y
                            if(line[i][0] === '↑'){
                                newGameState[i][0] -= parseInt(line[i][1]);
                            }
                            if(line[i][0] === '↓'){
                                newGameState[i][0] += parseInt(line[i][1]);
                            }
                            //x
                            if(line[i][0] === '→'){
                                newGameState[i][1] += parseInt(line[i][1]);
                            }
                            if(line[i][0] === '←'){
                                newGameState[i][1] -= parseInt(line[i][1]);
                            }
                        }

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
                        var bot = -1;
                        for (var j = 0; j < 8; j++){
                            if(
                                this.props.gameState[j][0] === y &&
                                this.props.gameState[j][1] === x + 1
                            )
                                bot = j;
                        }
                        if(bot !== -1){
                            if(line[j] !== '')
                                erCode.push(errorNames.connectionErrorMove + ' - ' + roboNames[j]);
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
                                                if(1)
                                                newGameState[6] = [y, x+1, 0, 0, roboNames[i] + roboNames[j]];

                                                break;
                                            case 3:
                                                newGameState[6]= [y, x+1, 0, 0, ];

                                                break;
                                            case 4: break;
                                        }
                                    }
                                }
                        }
                        else
                            erCode.push(errorNames.connectionErrorPlace + ' - ' + roboNames[i]);











                        break;
                    }
                }
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


    handleReset(e){
        this.props.resetBoard()
    }
    render() {
        return(
            <div>
                <input name="fileMap" type="file" onChange={(e)=> this.loadMap(e)} title={"Загрузить карту"} />

                <button onClick={(e)=> this.handleMakeStep(e)}>
                    Сделать шаг
                </button>

                <button onClick={(e)=> this.handleReset(e)}>
                    В начало
                </button>
            </div>
        )}


}


export default connect(mapStateToProps, mapDispatchToProps)(GameButtonsMenu);

