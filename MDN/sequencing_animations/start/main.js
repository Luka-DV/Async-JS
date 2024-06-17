const aliceTumbling = [
  { transform: 'rotate(0) scale(1)' },
  { transform: 'rotate(360deg) scale(0)' }
];

const aliceTiming = {
  duration: 2000,
  iterations: 1,
  fill: 'forwards'
}

const alice1 = document.querySelector("#alice1");
const alice2 = document.querySelector("#alice2");
const alice3 = document.querySelector("#alice3");


// 1. "callback hell":

/* 

alice1.animate(aliceTumbling, aliceTiming).finished
.then( () => {
  const animationFinished = alice2.animate(aliceTumbling, aliceTiming).finished;
  animationFinished.then( () => {
      alice3.animate(aliceTumbling, aliceTiming);
  });
});

 */

//2. promise chaining:

/* 
alice1.animate(aliceTumbling, aliceTiming).finished
.then( () => {
  return alice2.animate(aliceTumbling, aliceTiming).finished;
})
.then( () => {
  return alice3.animate(aliceTumbling, aliceTiming).finished;
})
.catch(error => {
  console.error(`Error in animation: ${error}`)
});

 */
//or:

/* 
alice1.animate(aliceTumbling, aliceTiming).finished
.then(() => alice2.animate(aliceTumbling, aliceTiming).finished)
.then(() => alice3.animate(aliceTumbling, aliceTiming).finished)
.catch(error => console.error(`Error in animation: ${error}`));

 */
// 3. asnyc/await form:

/* 
async function animateAlices() {
  try {
    const firstAnimFinish = await alice1.animate(aliceTumbling, aliceTiming).finished;
    const secondAnimFinish = await alice2.animate(aliceTumbling, aliceTiming).finished;
    const thirdAnimFinish = await alice3.animate(aliceTumbling, aliceTiming).finished;
  } 
  catch (error) {
    console.error(`Error in animation: ${error}`)
  }
}
 */

async function animateAlices() {
  try {
    await alice1.animate(aliceTumbling, aliceTiming).finished;
    await alice2.animate(aliceTumbling, aliceTiming).finished;
    await alice3.animate(aliceTumbling, aliceTiming).finished;
  } 
  catch (error) {
    console.error(`Error in animation: ${error}`)
  }
}

animateAlices();
