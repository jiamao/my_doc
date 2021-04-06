
import { Person } from './Person';

export default class Teacher extends Person {
    constructor() {
        super();
    }

    say(words: string) {
        super.say(`i am teacher`);        
        super.say(words);
    }


    eat(food: any) {
        console.log(`eat ${food}`);
    }
}