import React, { Component } from 'react';
import { connect } from 'react-redux';
import './componentsStyles.css';
import {tileNames, errorNames} from './GameConstants';
import {loadGameField, makeStep} from "../actions/actionCreators";

const mapStateToProps = state => {
    return {
        gameBoardRows: state.gameBoardRows,
        codeBoardRows: state.codeBoardRows,
        selectedRow: state.currentCodeRow,
        N: state.N, //columns
        M: state.M, //rows
        A1: state.A1,
        B1: state.B1,
        C1: state.C1,
        D1: state.D1,
        A2: state.A2,
        B2: state.B2,
        A3: state.A3,
        A4: state.A4,
        pause: state.paused,
        play: state.playing,
    };
};

function mapDispatchToProps(dispatch) {
    return {
        loadGameField: (field) => dispatch(loadGameField(field)),
        makeStep:(field) => dispatch(makeStep(field))
    };
}

export class GameButtonsMenu extends  Component{

    constructor() {
        super();
        //this.buttonsCommands = gameButtons;
    }

    handleMakeStep(){

    }
    //Есть ошибка - false
    //Нет ошибки - true
    errorCheck(){
        var line = this.props.codeBoardRows[this.props.selectedRow];

        return true
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

    render() {
        return(
            <input type="file" onChange={(e)=> this.loadMap(e)}/>
            )}


}


export default connect(mapStateToProps, mapDispatchToProps)(GameButtonsMenu);

