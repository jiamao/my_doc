
import Person from './Person';
import MalePerson from './MalePerson';
import FeMalePerson from './FeMalePerson';
import Teacher from './Teacher';
import MaleTeacher from './MaleTeacher';

const teacher = new MaleTeacher();
teacher.say('hello');

/*
const wife = new FeMalePerson();
const male = new MalePerson(wife);
male.say('hello');
*/

//const p = new Person();

// 里氏替换原则
function test(t: Teacher) {
    t.say('hello');
}
test(new Teacher());
test(new MaleTeacher());
