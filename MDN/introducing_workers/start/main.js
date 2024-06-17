
"use strict";

//new worker
const worker = new Worker("./generate.js");


//when "generate" is clicked, send message to worker. The msg command "generate" and also the "quota" - num of primes to generate.
document.querySelector("#generate").addEventListener("click", () => {
    const quota = document.querySelector("#quota").value;
    worker.postMessage({
        command: "generate",
        quota
    });
});


//when the worker sends a msg back (to the main thread), update the output div with a msg for the user
worker.addEventListener("message", message => {
    document.querySelector("#output").textContent = `Finished generating ${message.data} primes!`;
});

document.querySelector("#reload").addEventListener("click", () => {
    document.querySelector("#user-input").value = 'Try typing in here immediately after pressing "Generate primes"';
    document.location.reload();
  });

