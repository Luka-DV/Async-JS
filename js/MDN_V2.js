

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


// PROMISES

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

// promises - three primary states: pending, fulfilled, rejected
// settled > both fulfilled and rejected
// resolved > settled or "locked in" to follow the state of another promise

//PROMISE.ALL
//Promise.all() > ...takes an array of promises and returns a single promise.
//when you have more promises but they dont depend on each other. 
// the promise is fulfilled (then()) if all the promises are fulfilled > then() is called with an array of all the responses in order
// rejected if any of the promises are rejected > catch() is called with the error thrown by the promise that rejected
/* 
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
        console.error(`Failed to fetch: ${error}`);
    }) 
 */
// Output:
// https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json: 200
// https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found: 404
// https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json: 200

//with a badly formed URL: "Failed to fetch: TypeError: Failed to fetch"

//PROMISE.ANY

//Promise.any() >...same as Promise.all(), but ut is fulfilled as soon as any promise is fulfilled or all are rejected
/* 
const fetchPromise1b = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
);
const fetchPromise2b = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found",
);
const fetchPromise3b = fetch(
    "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json",
);

Promise.any([fetchPromise1b, fetchPromise2b, fetchPromise3b])
    .then(response => {
        console.log(`${response.url}: ${response.status}`);
    })
    .catch(err => {
        console.error(`Failed to fetch: ${err}`);
    });
 */

// ASYNC AND AWAIT

//function:

async function myFunction() {
    //async function
};

// inside you can use the await keyword before a call to a function that returns a promise - the code waits here until the promise is settled (fulfilled/rejected)

//enables to write async code like sync code, the above fetch example rewritten:

//orig:
/* 
const fetchPromise = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
);

fetchPromise
    .then(response => {
        if(!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
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

//async: //NOTE: async funcitons always return a promise!

async function fetchProducts() {
    try {
        const response = await fetch( //will return a Response or throw an error
            "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
        );
        if(!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json(); //will return the parsed JSON object or throw an error

        console.log(console.log(data[1].name));
        
    } catch(error) {
        console.log(`Could not get products: ${error}`);
    }
}

// fetchProducts();

//example of using the async function if you are returning the data:

async function fetchProducts2() {
    const response = await fetch(
        "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
    );
    if(!response.ok) {
        throw new Error(`HTTP: error: ${response.status}`);
    }
    const data = await response.json();
    console.log(data[2].name)
    return data;
}

const promise = fetchProducts2(); //promise holds a promise


promise
    .then(data => {
        console.log(data[2].name);
    })
    .catch(error => {
        console.error(`Could not get products: ${error}`);
    })

//just like a promise chain, await forces asynchronous operations to be completed in series. This is necessary if the result of the next operation depends on the result of the last one, but if that's not the case then something like Promise.all() will be more performant.


// Implementing an alarm API:

/* 
const output = document.querySelector("#output");
const button = document.querySelector("#set-alarm");

function setAlarm() {
    setTimeout(() => {
        output.textContent = "Wake up!"
    }, 1000);
}

button.addEventListener("click", setAlarm);
 */

//using classes:

/* class alarmClockClass {
    constructor() {
        this._output = document.querySelector("#output");
        this._button = document.querySelector("#set-alarm");
    }

    get output() {
        return this._output;
    }

    get button() {
        return this._button;
    }

    setAlarm() {
        setTimeout(() => {
            this._output.textContent = "Wake up!"
        }, 1000)
    }
    
} */

class alarmClockClass {
    
       #output = document.querySelector("#output");
       #button = document.querySelector("#set-alarm");


    get output() {
        return this.#output;
    }

    get button() {
        return this.#button;
    }

    setAlarm() {
        setTimeout(() => {
            this.#output.textContent = "Wake up!"
        }, 1000)
    }
    
}

const alarmClock = new alarmClockClass();
alarmClock.button.addEventListener("click", () => {
    alarmClock.setAlarm();
});