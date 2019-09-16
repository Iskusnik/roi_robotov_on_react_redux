export const CODE = 'CODE';
export const GAME = 'GAME';


export const tileNames = {
    empty: '',
    mountain:'m',
    hole:'h',
    rocket:'r',
    storage:'s',
    baseA:'A',
    baseB:'B',
    baseC:'C',
    baseD:'D'
};

export const errorNames = {
    outOfMap: "Робот вышел за границы карты",
    roboCollision: "Роботы столкнулись",
    roboFall: "Робот упал в расщелину",
    roboMount: "Робот столкнулся с горой",
    unexpectedCommand: "Нет робота для исполнения команды",
    wrongCommand: "Данная команда не может быть выполнена такой связкой роботов",
    overload: "Робот перегружен и не может взять дополнительынй груз",
    connectionErrorLoad: "Невозможно соединить/разъединить роботов - необходима разгрузка",
    connectionErrorPlace: "Невозможно разъединить роботов - необходима свободная клетка справа",
}

export const gameButtons = [
    'UP',
    'DOWN',
    'LEFT',
    'RIGHT',
    'COMPOSED',

    'LOAD',
    'UNLOAD',

    'SPLIT',
    'CONNECT',
    'CLEAR'
]

export const moveDir = {
    moveN:'UP',
    moveS:'DOWN',
    moveW:'LEFT',
    moveE:'RIGHT',
    moveNE:'UP_RIGHT',
    moveNW:'UP_LEFT',
    moveSE:'DOWN_RIGHT',
    moveSW:'DOWN_LEFT'
}