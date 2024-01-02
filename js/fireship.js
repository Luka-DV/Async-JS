
/* 
function sayHello() {

    setTimeout(() => {
        console.log("Hello!")
    },3000)

    setTimeout( () => {
        console.log("Hello again!!!")
    },2000)
}

sayHello(); */


//Fireship


//  Example 1+

/* 
//Log1
console.log("Synchronous 1");

// L2
setTimeout(() => console.log("Timeout 2"), 0);

// L3
Promise.resolve().then( () => console.log("Promise"));

// L4
console.log("Synchronous 4")
 */
// Order: L1, L4, L3, L4

// Order: tasks, microtasks, asynctasks (setTimeout, -Interval)


//  Example 2++
/* 
const promise = fetch("https://jsonplaceholder.typicode.com/todos/1");

promise
    .then(res => res.json())
    .then(user => {
        throw new Error("Mama mia!"); //this always throws an Error, that the "catch" then catches
        return user;
    })
    .then(user => console.log(":P", user.title))
    .catch(err => {
        console.error(":( ", err)
    })

console.log("Synchronous")
 */

// Example 3+++
/* 
const tick = Date.now();
const log = v => console.log(`${v} \n Elapsed: ${Date.now() - tick} ms`);

const codeBlocker = () => {

    // Blocking code:
    
    // let i = 0;
    // while(i < 1000000000) { i++;}

    // return "Billion loops done :3 "


    //with just a new Promise, the while loop still runs on the main thread, only the resolving of the value happens as a microtask!

    // return new Promise( (resolve, reject) => {

    //    let i = 0;
    //    while(i < 1000000000) {i++;}

    //    resolve("Billion loops done :3")
    //})


    //Non-blocking code:

    return Promise.resolve().then( () => {
        
        let i = 0;
        while(i < 1000000000) {i++;}

        return "Billion loops done :3";
    })
}

log("Synchronous 1");

//1: log(codeBlocker()); log1, log2, log3

//2: codeBlocker().then(log); log1, log3(but after 600ms!), log2

//3:
codeBlocker().then(log); // log1, log3, log2(after 600ms)

log("Synchronous 2");
 */


// Example 4 

// Basic

const getFruit = async name =>  {
    const fruits = {
        pineapple: "🍍",
        peach: "🍑",
        strawberry: "🍓"
    }

    return fruits[name];
}

// getFruit("peach").then(console.log)


// Async + Await

//We wait for a, before resolving b (no concurrency):
/* const makeSmoothie = async () => {
    const a = await getFruit("pineapple");
    const b = await getFruit("strawberry");

    return [a,b];
}

makeSmoothie().then(console.log);
 */


//concurrency:
const makeSmoothie = async () => {
    const a = getFruit("pineapple");
    const b = getFruit("strawberry");

    const smoothie = await Promise.all([a, b]);

    return smoothie;
}

//makeSmoothie().then(console.log);


// Example 5 

// Error handling


const badSmoothie = async() => {

    try{
        const a = getFruit("pineapple");
        const b = getFruit("strawberry");

        const smoothie = await Promise.all([a, b]);

        throw "BROKEN!";

        return smoothie;

    } catch(err) {
        console.log("NAPACA: ", err); //err == throw value
        return "You will get through this..."
        //throw "It's broken!!";
    }
}

//badSmoothie().then(console.log);

/* badSmoothie()
    .then(val => console.log( {val} ))
    .catch(err => console.log( {err} ))
 */

// Example 6 

// Sugar aka Tips:

const tick = Date.now();
const log = v => console.log(`${v} \n Elapsed: ${Date.now() - tick} ms`);

/* const fruits = ["peach", "pineapple", "strawberry"];
const smoothie = fruits.map( async v => {
    const emoji = await getFruit(v)
    log(emoji);
    return emoji;
});

console.log("Smoothie: ", smoothie) */

/* 

// The code would work like this actually:

const makeSmoothie2 = async () => {
    const fruits = ["peach", "pineapple", "strawberry"];
    const smoothie = await Promise.all(fruits.map(async v => {
        const emoji = await getFruit(v);
        log(emoji);
        return emoji;
    }));
    console.log("Smoothie: ", smoothie);
};

makeSmoothie2();
 */

const fruits = ["peach", "pineapple", "strawberry"];


//this loop pauses each step of the loop and "awaits" the promsie to be resolved.
const fruitLoop1 = async () => {
    for(const fruit of fruits) {
        const emoji = await getFruit(fruit);
        log(emoji);
    }
}

//fruitLoop1();


const smoothie = fruits.map(f => getFruit(f));

const fruitLoop2 = async () => {
    for await (const emoji of smoothie) { //waits for all the items to resolve and then loops immediately after
        log(emoji);
    }
}

fruitLoop2();


// in IF statements:

const fruitInspection = async () => {
    if(await getFruit("peach") === "🍑") {
        console.log("looks peachy!")
    }
}

fruitInspection();

