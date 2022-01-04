const prompt = require('prompt-sync')({ sigint: true });
var term = require('terminal-kit').terminal;

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Map {
    constructor(height, width, percentage = 0.1) {
        this.field = this.generateField()
        this.height = height;
        this.width = width;
        this.percentage = percentage;
    }

    generateField(height = 5, width = 5, percentage = 0.1) { //mode='hard'
        // new empty field array
        const field = [];
        // add height to field
        while (field.length < height) {
            field.push([])
        }
        console.log(field[field.length - 1].length)
            // add width & character to field
        while (field[field.length - 1].length < width) {
            for (let i = 0; i < field.length; i++) {
                // determine hole or * to fill in the tile
                let trap = Math.random()
                trap > percentage ? field[i].push(fieldCharacter) : field[i].push(hole)
            }
        }

        //assign hat 1 location
        let hatY = Math.floor(Math.random() * field.length);
        let hatX = Math.floor(Math.random() * field[0].length);
        // assign starting point
        let startY = Math.floor(Math.random() * field.length);
        let startX = Math.floor(Math.random() * field[0].length);
        field[startY][startX] = pathCharacter;

        // reassign hat if hat was on the starting point
        while (startY === hatY && startX === hatX) {
            hatY = Math.floor(Math.random() * field.length);
            hatX = Math.floor(Math.random() * field[0].length);
        }
        field[hatY][hatX] = hat;
        // assign hat 2 location
        // const assignHat = () => {
        //         hatY = Math.floor(Math.random() * field.length);
        //         hatX = Math.floor(Math.random() * field[0].length);
        //         field[hatY][hatX] = hat
        //     }
        // if (mode === 'hard') {
        //     hatY = Math.floor(Math.random() * field.length);
        //     hatX = Math.floor(Math.random() * field[0].length);
        //     if (field[hatY][hatX] !== hat && field[hatY][hatX] !== pathCharacter) {
        //         field[hatY][hatX] = hat
        //     } else {
        //         assignHat();
        //     }
        // }
        return field;
    }
}

const mazeSolver = (field) => {
    //Locate current coordinate
    let current;
    for (let i = 0; i < field.length; i++) {
        if (field[i].includes(pathCharacter)) {
            current = {
                y: i,
                x: field[i].indexOf(pathCharacter)
            }
        }
    }

    //check
    const isInBounds = () => {
        return (
            current.y >= 0 &&
            current.x >= 0 &&
            current.y < field.length &&
            current.x < field[0].length
        );
    }

    const goUp = () => {
        if (field[current.y][current.x] === '2') {
            field[current.y][current.x] = '3';
        } else if ((field[current.y][current.x] === pathCharacter || field[current.y][current.x] === fieldCharacter) && field[current.y][current.x] !== hat) {
            field[current.y][current.x] = '2';
        }
        current.y--;
        if (isInBounds() && field[current.y][current.x] !== hole) {
            return field[current.y][current.x]
        } else {
            current.y++;
            console.log('cannot go up anymore');
            return false
        }
    }
    const goDown = () => {
        if (field[current.y][current.x] === '2') {
            field[current.y][current.x] = '3'
        } else if ((field[current.y][current.x] === pathCharacter || field[current.y][current.x] === fieldCharacter) && field[current.y][current.x] !== hat) {
            field[current.y][current.x] = '2';
        }
        current.y++;
        if (isInBounds() && field[current.y][current.x] !== hole) { return field[current.y][current.x] } else {
            current.y--;
            console.log('cannot go down anymore');
            return false
        }
    }
    const goLeft = () => {
        if (field[current.y][current.x] === '2') {
            field[current.y][current.x] = '3'
        } else if ((field[current.y][current.x] === pathCharacter || field[current.y][current.x] === fieldCharacter) && field[current.y][current.x] !== hat) {
            field[current.y][current.x] = '2';
        }
        current.x--;
        if (isInBounds() && field[current.y][current.x] !== hole) { return field[current.y][current.x] } else {
            current.x++;
            console.log('cannot go left anymore');
            return false
        }
    }
    const goRight = () => {
        if (field[current.y][current.x] === '2') {
            field[current.y][current.x] = '3'
        } else if ((field[current.y][current.x] === pathCharacter || field[current.y][current.x] === fieldCharacter) && field[current.y][current.x] !== hat) {
            field[current.y][current.x] = '2';
        }
        current.x++;
        if (isInBounds() && field[current.y][current.x] !== hole) { return field[current.y][current.x] } else {
            current.x--;
            console.log('cannot go right anymore');
            return false
        }
    }

    const randomDirection = () => {
        let direction = Math.floor(Math.random() * 4);
        switch (direction) {
            case 0:
                return goUp();
            case 1:
                return goDown();
            case 2:
                return goLeft();
            case 3:
                return goRight();
        }
    }


    // let randomDirection = Math.floor
    console.log(current);
    // const startTime = System.currentTimeMillis();
    // while (field[current.y][current.x] !== hat || (System.currentTimeMillis() - startTime) < 10000) {
    //     if (goUp() === false && goDown() === false && goLeft() === false && goRight() === false) {
    //         console.log('this map has no exit!')
    //         return false;
    //     } else if (field[current.y][current.x] === hat) {
    //         console.log('it works!')
    //         return true;
    //     } else {
    //         console.log(randomDirection());
    //     }
    // }


    // while(field[current.y][current.x] !== hat) {
    //     if(randomDirection() && randomDirection !== hole) {
    //         randomDirection();
    //     } else 
    // }
}

const myField = [
    ['░', '░', '^'],
    ['O', '░', 'O'],
    ['*', '░', '░'],
];

mazeSolver(myField)

class StartLocation {
    constructor(field) {
        this.location = this.startingPoint(field)
    }

    startingPoint(field) {
        for (let i = 0; i < field.length; i++) {
            if (field[i].includes(pathCharacter)) {
                return {
                    y: i,
                    x: field[i].indexOf(pathCharacter)
                }
            }
        }
    }

    //method - ask direction
    question() {
        const way = prompt('Which way? ');
        switch (way.toLowerCase()) {
            case 'w':
                this.location.y--;
                break;
            case 's':
                this.location.y++;
                break;
            case 'a':
                this.location.x--;
                break;
            case 'd':
                this.location.x++;
                break;
            case 'e':
                console.log('See You :-)');
                break;
            default:
                console.log('Invalid Input. Please input the direction:\nUp - W \nDown - S \nLeft - A \nRight - D\nto exit the game, input \'E\'');
                this.question();
                break;
        }
    }
}

// class PlayingStatus {
//     constructor() {
//         this.status;
//     }
//     toggleStatus() {

//     }
// }


class Game {
    constructor(field = new Map(5, 5), location = new StartLocation(field.field)) {
        this.field = field
        this.location = location
            // y: location.location.y,
            // x: location.location.x
            // };
        this.level = 1;
        this.difficulty = 0.1;
    }

    //method - print field
    print() {
        let printField = []
        for (let i = 0; i < this.field.field.length; i++) {
            printField.push(this.field.field[i].join(''));
        }
        console.log(printField.join('\n') + '\n');
    }

    //method - run game
    play() {
        this.location.location = this.location.startingPoint(this.field.field)
        let currentlyPlaying = true;
        if (this.level <= 3) {
            term.bgGreen(`Welcome to level ${this.level}\n`)
        } else {
            term.bgRed(`Welcome to level ${this.level}\n`);
        }
        setTimeout(() => { console.log('\nGenerating field...') }, 700);
        setTimeout(() => {
            while (currentlyPlaying === true) {
                this.print();
                this.location.question();
                console.log(this.location)
                    // check if current is inside the bound
                if (this.location.location.y < 0 || this.location.location.x < 0 || this.location.location.y >= this.field.field.length || this.location.location.x >= this.field.field[0].length) { // this.field[this.location.y][this.location.x] === undefined
                    console.log('You steped beyond the bound, loser!');
                    currentlyPlaying = false;
                    break;
                    // check if current is hat
                } else if (this.field.field[this.location.location.y][this.location.location.x] === hole) {
                    console.log('You fell into the hole');
                    currentlyPlaying = false;
                    // check if current is hat
                } else if (this.field.field[this.location.location.y][this.location.location.x] === hat) { //this.field[this.location.y][this.location.x] === hat
                    term.bgBrightGreen('Yea, you found all of the hat(s)...');
                    currentlyPlaying = false;
                    this.level++;
                    this.difficulty += 0.015;
                    const again = prompt('\nWanna move to the next level? Y/N ')
                    switch (again.toLocaleLowerCase()) {
                        case 'y':
                            this.field.field = this.field.generateField(5, 10, this.difficulty);
                            this.play();
                            break;
                    }
                }
                // update current
                this.field.field[this.location.location.y][this.location.location.x] = pathCharacter;
            }
        }, 1500);
    }



    //method - start game
    startGame() {
        console.log(this.field.field)
        console.log(this.location.location)
        console.log('Game is about to start. You are at the location \'*\', you need to find your hat \'^\' to win the game:\n\nPlease input the direction:\nUp - W \nDown - S \nLeft - A \nRight - D\n');
        const understand = prompt('Are you ready? Input \'Y\' to continue, or other key to exit ');
        switch (understand.toLowerCase()) {
            case 'y':
                this.play();
                break;
            default:
                console.log('See You! :-)');
                break;
        }
    }

}




const newgame = new Game;
newgame.startGame();









class Field {
    constructor(field) {
        this.field = field;
        this.location = {
            y: null,
            x: null
        }
        this.level = 1;
        this.difficulty = 0.1;
    }

    //method - print field
    print() {
        let printField = []
        for (let i = 0; i < this.field.length; i++) {
            printField.push(this.field[i].join(''));
        }
        console.log(printField.join('\n') + '\n');
    }


    startingPoint() {
        for (let i = 0; i < this.field.length; i++) {
            if (this.field[i].includes(pathCharacter)) {
                this.location.y = i;
                this.location.x = this.field[this.location.y].indexOf(pathCharacter);
            }
        }
    }

    // //method - find start index Y
    // startY() {
    //     for (let i = 0; i < this.field.length; i++) {
    //         if (this.field[i].includes(pathCharacter)) {
    //             return i
    //         }
    //     }
    // }

    // //method - find start index X
    // startX() {
    //     return this.field[this.startY()].indexOf(pathCharacter)
    // }

    //method - check hat left
    hatLeft() {
        let hatNum = 0
        for (let y = 0; y < this.field.length; y++) {
            for (let x = 0; x < this.field[0].length; x++) {
                if (this.field[y][x] === hat) {
                    hatNum++
                }
            }
        }
        return hatNum
    }

    //method - ask direction
    question() {
        const way = prompt('Which way? ');
        switch (way.toLowerCase()) {
            case 'w':
                this.location.y--;
                break;
            case 's':
                this.location.y++;
                break;
            case 'a':
                this.location.x--;
                break;
            case 'd':
                this.location.x++;
                break;
            case 'e':
                console.log('See You :-)');
                break;
            default:
                console.log('Invalid Input. Please input the direction:\nUp - W \nDown - S \nLeft - A \nRight - D\nto exit the game, input \'E\'');
                this.question();
                break;
        }
    }

    //method - start game
    startGame() {
        console.log('Game is about to start. You are at the location \'*\', you need to find your hat \'^\' to win the game:\n\nPlease input the direction:\nUp - W \nDown - S \nLeft - A \nRight - D\n');
        const understand = prompt('Are you ready? Input \'Y\' to continue, or other key to exit ');
        switch (understand.toLowerCase()) {
            case 'y':
                this.play();
                break;
            default:
                console.log('See You! :-)');
                break;
        }
    }

    //method - run game
    play() {
        this.startingPoint();
        // this.location.y = this.startY();
        // this.location.x = this.startX();
        let currentlyPlaying = true;
        let hatNum = this.hatLeft();
        if (this.level <= 3) {
            term.bgGreen(`Welcome to level ${this.level}\n`)
        } else {
            term.bgRed(`Welcome to level ${this.level}\n`);
        }
        setTimeout(() => { console.log('\nGenerating field...') }, 700);
        setTimeout(() => {
            while (currentlyPlaying === true) {
                this.print();
                this.question();
                // check if current is inside the bound
                if (this.location.y < 0 || this.location.x < 0 || this.location.y >= this.field.length || this.location.x >= this.field[0].length) { // this.field[this.location.y][this.location.x] === undefined
                    console.log('You steped beyond the bound, loser!');
                    currentlyPlaying = false;
                    break;
                    // check if current is hat
                } else if (this.field[this.location.y][this.location.x] === hole) {
                    console.log('You fell into the hole');
                    currentlyPlaying = false;
                    // check if current is hat
                } else if (this.field[this.location.y][this.location.x] === hat) { //this.field[this.location.y][this.location.x] === hat
                    hatNum--;
                    if (hatNum !== 0) {
                        console.log(`You have ${hatNum} left`)
                    } else if (hatNum === 0) {
                        term.bgBrightGreen('Yea, you found all of the hat(s)...');
                        currentlyPlaying = false;
                        this.level++;
                        this.difficulty += 0.015;
                        const again = prompt('\nWanna move to the next level? Y/N ')
                        switch (again.toLocaleLowerCase()) {
                            case 'y':
                                this.field = Field.generateField(5, 10, this.difficulty);
                                this.play();
                                break;
                        }
                    }
                }
                // update current
                this.field[this.location.y][this.location.x] = pathCharacter;
            }
        }, 1500);
    }

    // static method - generate field
    static generateField(height, width, percentage = 0.1) { //mode='hard'
        // new empty field array
        const field = [];
        // add height to field
        while (field.length < height) {
            field.push([])
        }
        console.log(field[field.length - 1].length)
            // add width & character to field
        while (field[field.length - 1].length < width) {
            for (let i = 0; i < field.length; i++) {
                // determine hole or * to fill in the tile
                let trap = Math.random()
                trap > percentage ? field[i].push(fieldCharacter) : field[i].push(hole)
            }
        }

        //assign hat 1 location
        let hatY = Math.floor(Math.random() * field.length);
        let hatX = Math.floor(Math.random() * field[0].length);
        // assign starting point
        let startY = Math.floor(Math.random() * field.length);
        let startX = Math.floor(Math.random() * field[0].length);
        field[startY][startX] = pathCharacter;

        // reassign hat if hat was on the starting point
        while (startY === hatY && startX === hatX) {
            hatY = Math.floor(Math.random() * field.length);
            hatX = Math.floor(Math.random() * field[0].length);
        }
        field[hatY][hatX] = hat;
        // assign hat 2 location
        // const assignHat = () => {
        //         hatY = Math.floor(Math.random() * field.length);
        //         hatX = Math.floor(Math.random() * field[0].length);
        //         field[hatY][hatX] = hat
        //     }
        // if (mode === 'hard') {
        //     hatY = Math.floor(Math.random() * field.length);
        //     hatX = Math.floor(Math.random() * field[0].length);
        //     if (field[hatY][hatX] !== hat && field[hatY][hatX] !== pathCharacter) {
        //         field[hatY][hatX] = hat
        //     } else {
        //         assignHat();
        //     }
        // }
        return field;
    }
}

// const ranField = new Field(Field.generateField(5, 10, 0.1))
// console.log(Field.generateField(5,5,0.1))
// ranField.startGame();