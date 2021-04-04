
import { ESex, Person } from './Person';

export default class MalePerson extends Person {
    constructor() {
        super(ESex.Male);
    }

    say(words: string) {
        super.say(`i am ${this.sex} person`);
        super.say(words);
    }
}