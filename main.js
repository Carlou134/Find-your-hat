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
}

const myField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]);

myField.print();

while(true)
{
    const input = prompt('¿A dónde quieres moverte? (up, down, left, right): ');
    console.log('Tú escribiste: ' + input);
}


