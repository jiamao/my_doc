
import { ESex } from './Enums';


export default abstract class Person {
    constructor(sex: ESex = ESex.Male) {
        this._sex = sex;
    }
    
    // 年龄 
    age: number;

    // 性别
    private _sex: ESex;
    public get sex(): ESex {
        return this._sex;
    }

    // say words
    say(words: string) {
        console.log(words);
    }

    // 抽象方法
    abstract eat(food: any): any;
}

export {
    Person
}