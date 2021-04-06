import { ESex } from './Enums';
import { Person } from './Person';

export default class MalePerson extends Person {
    constructor(wife?: Person) {
        super(ESex.Male);

        this.wife = wife;
    }

    // 妻子
    wife?: Person;

    say(words: string) {
        super.say(`i am ${this.sex}`);
        super.say(words);

        if(this.wife) {
            super.say(`wife的年龄: ${this.wife.age}`);
        }
    }

    eat(food: any) {
        console.log(`eat ${food}`);
    }
}