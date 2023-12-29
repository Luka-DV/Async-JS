"use strict";

const fetchPromise = fetch(
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
.then(data => console.log(data))
 */

console.log("Started request...");