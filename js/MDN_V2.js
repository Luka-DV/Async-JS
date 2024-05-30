

// Callback hell or "Pyramid of doom":

function doStep1(init, callback) {
    const result = init + 1;
    callback(result);
  }
  
  function doStep2(init, callback) {
    const result = init + 2;
    callback(result);
  }
  
  function doStep3(init, callback) {
    const result = init + 3;
    callback(result);
  }
  
  function doOperation() {
    doStep1(0, (result1) => {
      doStep2(result1, (result2) => {
        doStep3(result2, (result3) => {
          console.log(`result: ${result3}`);
        });
      });
    });
  }
  
// doOperation();
  
/* When we nest callbacks like this, it can also get very hard to handle errors: often you have to handle errors at each level of the "pyramid", instead of having error handling only once at the top level.

For these reasons, most modern asynchronous APIs don't use callbacks. Instead, the foundation of asynchronous programming in JavaScript is the Promise... */


// Promises
/* 
const fetchPromise = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
);

console.log(fetchPromise); //Promise state "pending" - means that the fetch operation is still going on

fetchPromise.then(response => { //handler function of the promises then() method //Passing in a Response object when/if the fetch operation succeeds
    console.log(`Received response: ${response.status}`);
});

console.log("Started request...");
 */

// Output:

// Promise { <state>: "pending" }
// Started request…
// Received response: 200


/* fetchPromise.then( response => {
    const jsonPromise = response.json();
    jsonPromise.then( data => {
        console.log(data[0].name);
    });
}); */


// baked beans
// bad code - nesting then() calls (similar to "callback hell")

//right way, promise chaining:

/* 
fetchPromise
    .then( response => {
        if(!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);

        }
        return response.json();
    })
    .then(data => {
        console.log(data[0].name);
    })
 */

// Catching errors:
// "...while the handler passed to then() is called when the asynchronous operation succeeds, the handler passed to catch() is called when the asynchronous operation fails."


/* 
const fecthPromiseFail = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/canstore/products.json",
);

fecthPromiseFail
    .then(response => {
        if(!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        //also:
          /*   return response.json().then( err => {
                throw new Error(`Network response was not OK: ${err.error}`)
            }) */ /*
        }
        return response.json();
    })
    .then(data => {
        console.log(data[0].name);
    })
    .catch(error => {
        console.log(`Could not get products: ${error}`);
    });
 */

// promises - three primary states: pending, fulfilled, rejecte
// settled > both fulfilled and rejected
// resolved > settled or "locked in" to follow the state of another promise


//Promise.all() > ...takes an array of promises and returns a single promise.
//when you have more promises but they dont depen on each other. 
// the promise is fulfilled (then()) if all the promises are fulfilled > then() is called with an array of all the responses
// rejected if any of the promises are rejected > catch() is called with the error thrown by the promise that rejected

const fetchPromise1 = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
);
const fetchPromise2 = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found",
);
const fetchPromise3 = fetch(
    "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json",
);

Promise.all([fetchPromise1, fetchPromise2, fetchPromise3])
    .then( responses => {
        for(const response of responses) {
            console.log(`${response.url}: ${response.status}`);
            //if(!response.ok) throw new Error( `Failed with status: ${response.status}`);
        }
    })
    .catch( error => {
        console.log(`Failed to fetch: ${error}`);
    })

// Output:
// https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json: 200
// https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found: 404
// https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json: 200