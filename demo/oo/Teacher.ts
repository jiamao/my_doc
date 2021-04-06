
import { Person } from './Person';

export default class Teacher<T extends Person> extends Person {
    constructor(base:T) {
        super();
        this.base = base;
    }

    base?: T;

    say(words: string) {
        super.say(`i am teacher`);
        if(this.base) {
            this.base?.say(words);
        }
        else {
            super.say(words);
        }
    }

}