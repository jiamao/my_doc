

import { ESex } from './Enums';
import { Person } from './Person';

export default class FemalePerson extends Person {
    constructor() {
        super(ESex.Female);
    }

    say(words: string) {
        super.say(`i am ${this.sex}`);
        super.say(words);
    }

    eat(food: any) {
        console.log(`eat ${food}`);
    }
}