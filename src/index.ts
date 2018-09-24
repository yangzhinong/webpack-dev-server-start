import { util as tcol_util, Dictionary } from "./lib/typescript-collections";
import { toString } from './lib/typescript-collections/arrays';


$(document).ready(function(){
   console.log('Hello')

    class Car {
        constructor(public company:string, public type:string, public year:number){}
        toString(){
            return tcol_util.makeString(this);
        }
    }
    console.log(new Car("BWN", "A", 2016).toString());

    class Person {
        constructor(public name:string,public yearOfBirth:number, city?:string){}

        // toString(){
        //     return this.name + "_" + this.yearOfBirth;
        // }
    }

    var dict= new Dictionary<Person,Car>((p)=> { return p.name});

    dict.setValue(new Person("john",1970,"dd"), new Car("honda", "city",2002));
    dict.setValue(new Person("gavin",1984), new Car("ferrari","F50",2006));

    console.log("Orig");

    console.log(dict);
    //debugger;
    dict.setValue(new Person("john", 1970, "sydney"), new Car("honda", "accord", 2006));
    dict.setValue(new Person("john",1972,"yzn"), new Car("nissan","micra",2010));

    console.log("Updated");
    console.dir(dict);
    console.log(dict.keys());
    console.log(dict.values())

});

