"use strict";

// +++1+++ Using the fetch() API

/* const fetchPromise = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
);

console.log(fetchPromise);

fetchPromise.then( response => {
    console.log(`Received response: ${response.status}`);
})

/* fetchPromise.then( response => {
    console.log(`Received response: ${response.status}`)
    return response.json()
})
.then(data => console.log(data)) */

//console.log("Started request...");


// +++2+++ Chaining promises


//BAD: nested callbacks aka "callback hell":

/* const fetchPromise = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
);

fetchPromise.then(res => {
    const jsonPromise = res.json();
    jsonPromise.then(data => {
        console.log(data);
        console.log(data[0].name);
    })
}); */

//GOOD:

/* 
const fetchPromise = fetch(
    "bad-scheme://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
  );

fetchPromise
    .then(res => {
        if(!res.ok) {
            throw new Error(`HTTP error: ${res.status}`);
        }
        console.log(res.status)
        return res.json();
    })
    .then(data => {
        console.log(data[0].name);
    })
    .catch(err => {
        console.error(`Could not get products: ${err}`);
    });
 */


// +++3+++ Promise terminology


/* First, a promise can be in one of three states:

> pending: the promise has been created, and the asynchronous function it's associated with has not succeeded or failed yet. This is the state your promise is in when it's returned from a call to fetch(), and the request is still being made.
> fulfilled: the asynchronous function has succeeded. When a promise is fulfilled, its then() handler is called.
> rejected: the asynchronous function has failed. When a promise is rejected, its catch() handler is called.
Sometimes, we use the term settled to cover both fulfilled and rejected.
A promise is resolved if it is settled, or if it has been "locked in" to follow the state of another promise. */


// ++++4++++ Combining multiple promises


/* const fetchPromise1 = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
  );
const fetchPromise2 = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found",
);
const fetchPromise3 = fetch(
    "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json",
  ); */

/* 
Promise.all([fetchPromise1, fetchPromise2, fetchPromise3])
    .then(responses => {
        for(let res of responses) {
            console.log(`${res.url}: ${res.status}`)
        }
    })
    .catch(err => {
        console.error(`Failed to fetch: ${err}`);
    }); 

*/

/* Promise.any([fetchPromise1, fetchPromise2, fetchPromise3])
    .then(res => {
        console.log(`${res.url}: ${res.status}`)
    })
    .catch(err => {
        console.error(`Failed to fetch: ${err}`);
    }); */


// ++++5++++ async and await

//simple async function:

async function myFunction() {
    //some code;
}

/* async function fetchProducts() {
    try {
        const response = await fetch ("https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json");
        if(!response.ok) {
            throw new Error(`HTTP error: ${response.status}`)
        }

        const data = await response.json();
        console.log(data);
        console.log(data[0].name);

    } catch(error) {
        console.error(`Could not het products: ${error}`)
    }
}

fetchProducts(); */


//this is also possible:

async function fetchProducts() {
    try {
        const response = await fetch ("https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json");
        if(!response.ok) {
            throw new Error(`HTTP error: ${response.status}`)
        }

        const data = await response.json();
        return data;

    } catch(error) {
        console.error(`Could not het products: ${error}`)
    }
}

const promise = fetchProducts();

promise.then(data => console.log(data[1].name));

//you cant do ie:

//const promise = fetchProducts();
//console.log(promise[0].name); // "promise" is a Promise object, so this will not work

