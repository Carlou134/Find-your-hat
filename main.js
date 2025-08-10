const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(fieldCharacters)
    {
        this._fieldCharacters = fieldCharacters;
    }

    print()
    {
        for(let i = 0; i < this._fieldCharacters.length; i++)
        {
            console.log(this._fieldCharacters[i].join(" "));
        }
    }

    positionPlayer()
    {
        for(let i = 0; i < this._fieldCharacters.length; i++)
        {
            for(let j = 0; j < this._fieldCharacters[i].length; j++)
            {
                if(this._fieldCharacters[i][j] === pathCharacter)
                {
                    return {i, j};
                }
            }
        }
        return 0;
    }

    isOutsideField(move)
    {
        let posPlayer = this.positionPlayer();
        switch(move)
        {
            case 'up':
                if(posPlayer.i - 1 < 0) return true;
                else return false;
            case 'down':
                if(posPlayer.i + 1 > this._fieldCharacters.length) return true;
                else return false;
            case 'left':
                if(posPlayer.j - 1 < 0) return true;
                else return false;
            case 'right':
                if(posPlayer.j + 1 > this._fieldCharacters[this._fieldCharacters.length - 1]) return true;
                return false;
        }
    }

    movePlayer(move)
    {
        let posPlayer = this.positionPlayer();
        switch(move)
        {
            case 'up':
                this._fieldCharacters[posPlayer.i - 1][posPlayer.j] = pathCharacter;
                this._fieldCharacters[posPlayer.i][posPlayer.j] = fieldCharacter;
                break;
            case 'down':
                this._fieldCharacters[posPlayer.i + 1][posPlayer.j] = pathCharacter;
                this._fieldCharacters[posPlayer.i][posPlayer.j] = fieldCharacter;
                break;
            case 'left':
                this._fieldCharacters[posPlayer.i][posPlayer.j - 1] = pathCharacter;
                this._fieldCharacters[posPlayer.i][posPlayer.j] = fieldCharacter;
                break;
            case 'right':
                this._fieldCharacters[posPlayer.i][posPlayer.j + 1] = pathCharacter;
                this._fieldCharacters[posPlayer.i][posPlayer.j] = fieldCharacter;
                break;
        }
    }

    _nextPos(move) {
        const { i, j } = this.positionPlayer();
        if (move === 'up')    return { i: i - 1, j };
        if (move === 'down')  return { i: i + 1, j };
        if (move === 'left')  return { i, j: j - 1 };
        if (move === 'right') return { i, j: j + 1 };
        return null;
    }

    checkEnd(move) {
        const next = this._nextPos(move);
        if (!next) return 'invalid';
        const { i, j } = next;

        if (this.isOutsideField(move)) return 'out';

        const tile = this._fieldCharacters[i][j];
        if (tile === hat) return 'win';
        if (tile === hole) return 'lose';
        return null; 
    }

    static generateField(height, width, percentage){
        const randomField = [];
        const numberHoles = Math.floor((height * width) * percentage);

        for(let i = 0; i < height; i++)
        {
            let columns = [];
            for(let j = 0; j < width; j++)
            {
                columns.push(fieldCharacter);
            }
            randomField.push(columns);
        }

        for(let i = 1; i <= numberHoles; i++)
        {
            let posX = Math.floor(Math.random() * width);
            let posY = Math.floor(Math.random() * height);
            randomField[posY][posX] = hole;
        }

        randomField[0][0] = pathCharacter;
        let hatRow = 0;
        let hatColumn = 0;

        do
        {
            hatRow = Math.floor(Math.random() * height);
            hatColumn = Math.floor(Math.random() * width);
        } while(randomField[hatRow][hatColumn] === hole || 
            randomField[hatRow][hatColumn] === pathCharacter);

        randomField[hatRow][hatColumn] = hat;
        return randomField;
    }
}

console.log(Field.generateField(4,4,0.2));

const myField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]);


while(true)
{
    myField.print();
    const input = prompt('¿A dónde quieres moverte? (up, down, left, right): ').toLowerCase();
    const status = myField.checkEnd(input);
    
    if(status === 'invalid'){
        console.log("Palabra invalida!");
    }
    else if(status === 'out')
    {
        console.log("Te saliste del campo!!!");
    }
    else if(status === 'win')
    {
        myField.movePlayer(input);
        myField.print();
        console.log("Ganaste!");
        break;
    }
    else if(status === 'lose')
    {
        console.log("Perdiste!");
        break;
    }
    else
    {
        myField.movePlayer(input);
    }

}

