
import { ESex, Person } from './Person';

export default class FemalePerson extends Person {
    constructor() {
        super(ESex.Female);
    }

    say(words: string) {
        super.say(`i am ${this.sex} person`);
        super.say(words);
    }
}