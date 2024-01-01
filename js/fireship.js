
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







