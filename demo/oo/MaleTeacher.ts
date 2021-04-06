import { ESex } from './Enums';
import Teacher from './Teacher';
import MalePerson from './MalePerson';

export default class MaleTeacher extends Teacher<MalePerson> {
    constructor() {
        super(new MalePerson());
    }
}