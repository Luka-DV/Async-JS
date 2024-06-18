


const getFruit =  async name => {
        const fruits = {
            pineapple: "PIn",
            peach: "PEa",
            strawberry: "STr"
        }

        //for testing:

        return new Promise( resolve => {
            setTimeout( () => {
                resolve(fruits[name]);
            },500)
        })
    
        //return fruits[name];
}




/* const makeSmoothie = async () => {
    return Promise.all([getFruit("pineapple"), getFruit("peach")])
        .then(data => console.log(data))
        .catch(error => `Failed to make smoothie: ${error}`)
}

makeSmoothie(); */

// or:
/* 
const makeSmoothie = async () => {
    const a = getFruit("pineapple");
    const b = getFruit("peach");

    const smoothie = await Promise.all([a,b]);

    return smoothie;
        
}

makeSmoothie()
    .then(data => console.log(data))
    .catch(error => console.error(error));
 */

const fruits = ["pineapple", "peach", "strawberry"];

const fruitLoop1 = async () => {
    for(const fruit of fruits) {
        const emoji = await getFruit(fruit);  //getFruit is an async function that returns a promise
        const d = new Date();
        console.log(emoji, `${d.getSeconds()},${d.getMilliseconds()}`);
    }
}

//fruitLoop1();


const smoothie = fruits.map(f => getFruit(f));
console.log(smoothie) 

const fruitLoop2 = async () => {
    for await (const emoji of smoothie) { //waits for all the items to resolve and then loops immediately after
        const d = new Date();
        console.log(emoji, `${d.getSeconds()},${d.getMilliseconds()}`);
    }
}

fruitLoop2();

