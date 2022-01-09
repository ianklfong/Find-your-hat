const prompt = require('prompt-sync')({ sigint: true });
//import termal-kit
const term = require('terminal-kit').terminal;

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

// const myField = [
//     ['░', '░', '^'],
//     ['O', '░', 'O'],
//     ['*', '░', '░'],
// ];
// mazeSolver(myField)


class Map {
    constructor(height = 7, width = 13, difficulty = 0.1) {
        this.field = this.generateField(height, width, difficulty);
    }

    generateField(height = 7, width = 13, difficulty = 0.1) {
        // first, define new empty field array
        const field = [];
        // add empty nested array to field depends on the height
        while (field.length < height) {
            field.push([])
        }
        // add character to the nested arraies depends on the width
        while (field[field.length - 1].length < width) {
            // determine hole or field to fill in the tile depends on the difficulty
            for (let i = 0; i < field.length; i++) {
                // define a random decimal from 0 - 0.9 for each tile
                let trap = Math.random()
                // if the decimal is bigger than the difficulty, fill field character, otherwise fill hole
                trap > difficulty ? field[i].push(fieldCharacter) : field[i].push(hole)
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
        const assignHat2 = () => {
                hatY = Math.floor(Math.random() * field.length);
                hatX = Math.floor(Math.random() * field[0].length);
                field[hatY][hatX] = hat
            }
        if (difficulty > 0.2) {
            hatY = Math.floor(Math.random() * field.length);
            hatX = Math.floor(Math.random() * field[0].length);
            if (field[hatY][hatX] !== hat && field[hatY][hatX] !== pathCharacter) {
                field[hatY][hatX] = hat
            } else {
                assignHat2();
            }
        }
        return field;
    }
}


//maze solver (still in development)
// const mazeSolver = (field) => {
//     //Locate current coordinate
//     let current;
//     for (let i = 0; i < field.length; i++) {
//         if (field[i].includes(pathCharacter)) {
//             current = {
//                 y: i,
//                 x: field[i].indexOf(pathCharacter)
//             }
//         }
//     }

//     //check
//     const isInBounds = () => {
//         return (
//             current.y >= 0 &&
//             current.x >= 0 &&
//             current.y < field.length &&
//             current.x < field[0].length
//         );
//     }

//     const goUp = () => {
//         if (field[current.y][current.x] === '2') {
//             field[current.y][current.x] = '3';
//         } else if ((field[current.y][current.x] === pathCharacter || field[current.y][current.x] === fieldCharacter) && field[current.y][current.x] !== hat) {
//             field[current.y][current.x] = '2';
//         }
//         current.y--;
//         if (isInBounds() && field[current.y][current.x] !== hole) {
//             return field[current.y][current.x]
//         } else {
//             current.y++;
//             console.log('cannot go up anymore');
//             return false
//         }
//     }
//     const goDown = () => {
//         if (field[current.y][current.x] === '2') {
//             field[current.y][current.x] = '3'
//         } else if ((field[current.y][current.x] === pathCharacter || field[current.y][current.x] === fieldCharacter) && field[current.y][current.x] !== hat) {
//             field[current.y][current.x] = '2';
//         }
//         current.y++;
//         if (isInBounds() && field[current.y][current.x] !== hole) { return field[current.y][current.x] } else {
//             current.y--;
//             console.log('cannot go down anymore');
//             return false
//         }
//     }
//     const goLeft = () => {
//         if (field[current.y][current.x] === '2') {
//             field[current.y][current.x] = '3'
//         } else if ((field[current.y][current.x] === pathCharacter || field[current.y][current.x] === fieldCharacter) && field[current.y][current.x] !== hat) {
//             field[current.y][current.x] = '2';
//         }
//         current.x--;
//         if (isInBounds() && field[current.y][current.x] !== hole) { return field[current.y][current.x] } else {
//             current.x++;
//             console.log('cannot go left anymore');
//             return false
//         }
//     }
//     const goRight = () => {
//         if (field[current.y][current.x] === '2') {
//             field[current.y][current.x] = '3'
//         } else if ((field[current.y][current.x] === pathCharacter || field[current.y][current.x] === fieldCharacter) && field[current.y][current.x] !== hat) {
//             field[current.y][current.x] = '2';
//         }
//         current.x++;
//         if (isInBounds() && field[current.y][current.x] !== hole) { return field[current.y][current.x] } else {
//             current.x--;
//             console.log('cannot go right anymore');
//             return false
//         }
//     }

//     const randomDirection = () => {
//         let direction = Math.floor(Math.random() * 4);
//         switch (direction) {
//             case 0:
//                 return goUp();
//             case 1:
//                 return goDown();
//             case 2:
//                 return goLeft();
//             case 3:
//                 return goRight();
//         }
//     }

//     while (field[current.y][current.x] !== hat) {
//         if (goUp() === false && goDown() === false && goLeft() === false && goRight() === false) {
//             console.log('this map has no exit!')
//             return false;
//         } else if (field[current.y][current.x] === hat) {
//             console.log('it works!')
//             return true;
//         } else { //random mouse
//             console.log(randomDirection());
//         }
//     }
// }





//function coponent - locate the starting point



function startingPoint(field) {
    // loop through each nested array
    for (let i = 0; i < field.length; i++) {
        // check which nested array is "pathCharacter(*)" located, then return as "y"
        if (field[i].includes(pathCharacter)) {
            return {
                y: i,
                // loop throught the nested array & check the index of "pathCharacter(*)", then returned as "x"
                x: field[i].indexOf(pathCharacter)
            }
        }
    }
}

class Game {
    constructor(height = 7, width = 13) {
        this.field = new Map(height, width, this.difficulty)
        this.location = startingPoint(this.field.field);
        this.gameStatus = null;
        this.level = 1;
        this.difficulty = 0.1;
    }

    //method - print the map
    print() {
        let printField = []
        for (let i = 0; i < this.field.field.length; i++) {
            printField.push(this.field.field[i].join(''));
        }
        console.log(printField.join('\n') + '\n');
    }

    //method - ask direction
    direction() {
        const way = prompt('Which way? ');
        switch (way.toLowerCase()) {
            // w = move up
            case 'w':
                this.location.y--;
                break;
            // s = move right
            case 's':
                this.location.y++;
                break;
            // a = move left
            case 'a':
                this.location.x--;
                break;
            // d = move down
            case 'd':
                this.location.x++;
                break;
            // e = exit
            case 'e':
                this.gameStatus = false;
                console.log('See You :-)');
                break;
            // other input = wrong input
            default:
                console.log('Invalid Input. Please input the direction:\nUp - W \nDown - S \nLeft - A \nRight - D\nto exit the game, input \'E\'');
                this.direction();
                break;
        }
    }

    //method - question: move on
    nextLevel() {
        const again = prompt('Wanna move to the next level? Y/N ')
        switch (again.toLocaleLowerCase()) {
            case 'y':
                this.field.field = this.field.generateField(7, 13, this.difficulty);
                this.play();
                break;
            case 'n':
                console.log('See You! :-)');
                break;
            default:
                console.log('Invalid Input. Please input \'Y\' for yes or \'N\' for no');
                this.nextLevel()
                break;
        }
    }

    //method - check if current is inside the boundary
    beyondBound() {
        return this.location.y < 0 || this.location.x < 0 || this.location.y >= this.field.field.length || this.location.x >= this.field.field[0].length
    }

    //method - check if current fell into the hole
    isHole() {
        return this.field.field[this.location.y][this.location.x] === hole
    }

    //method - check if current found the hat
    isHat() {
        return this.field.field[this.location.y][this.location.x] === hat
    }

    //method - check hat left
    hatLeft() {
        //define hat number
        let hatNum = 0;
        //loop through the height of field
        for (let y = 0; y < this.field.field.length; y++) {
            for (let x = 0; x < this.field.field[0].length; x++) {
                //if any tile hat, add 1 to hat number
                if (this.field.field[y][x] === hat) {
                    hatNum++
                }
            }
        }
        return hatNum
    }

    //method - the game
    play() {
        //set starting point as current x/y location
        this.location = startingPoint(this.field.field);
        //turn on gaming status
        this.gameStatus = true;
        //defines hat number variable
        let hatNum;
        //green message under level 4
        if (this.level <= 3) {
            term.bgGreen(`Welcome to level ${this.level}`)
            console.log('\n')
        } else { //red message above level 4
            term.bgRed(`Welcome to level ${this.level}`);
            console.log('\n')
        }
        console.log('Generating field...')
        setTimeout(() => {
            while (this.gameStatus === true) {
                //check how many hat(s) left
                hatNum = this.hatLeft();
                this.print();
                this.direction();
                //end the game if player steped beyond the bounds
                if (this.beyondBound()) {
                    console.log('You steped beyond the bound, gameover!');
                    this.gameStatus = false;
                    break;
                    
                } 
                //end the game if player fell into the hole
                else if (this.isHole()) {
                   console.log('You fell into the hole, gameover!');
                    this.gameStatus = false;
                } 
                //if player found the hat
                else if (this.isHat()) {
                    //hat(s) number -1
                    hatNum--;
                    //if player found all of the hat(s)
                    if(hatNum === 0){
                        term.bgBrightGreen('Yea, you found all of the hat(s)...');
                        console.log('\n')
                        this.gameStatus = false;
                        this.level++;
                        this.difficulty += 0.015;
                        if (this.level <= 10) {
                            this.nextLevel();
                        } else {
                            console.log('Congrats, You\'ve survived all of the levels')
                        }
                    } else { //tell player how many hat(s) left
                        console.log(hatNum + ' hat to go!')
                    }
                }
                // update current map after every step
                this.field.field[this.location.y][this.location.x] = pathCharacter;
            }
        }, 1500);
    }

    //method - start game
    startGame() {
        //instuction displayed before first round of the game
        console.log('Game is about to start. You are at the location \'*\', you need to find your hat \'^\' to win the game:\n\nPlease input the direction:\nUp - W \nDown - S \nLeft - A \nRight - D\n');
        //ask if the player understand
        const understand = prompt('Are you ready? Input \'Y\' to continue, or other key to exit ');
        switch (understand.toLowerCase()) {
            case 'y': //start the game
                this.play();
                break;
            default: //quit the game
                console.log('See You! :-)');
                break;
        }
    }

}



//let the game begins :-)
const newgame = new Game;
newgame.startGame();