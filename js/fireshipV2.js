


const getFruit =  async name => {
    const fruits = {
        pineapple: "PIn",
        peach: "PEa",
        strawberry: "STr"
    }

    return fruits[name];
}

/* const makeSmoothie = async () => {
    return Promise.all([getFruit("pineapple"), getFruit("peach")])
        .then(data => console.log(data))
        .catch(error => `Failed to make smoothie: ${error}`)
}

makeSmoothie(); */

// or:

const makeSmoothie = async () => {
    const a = getFruit("pineapple");
    const b = getFruit("peach");

    const smoothie = await Promise.all([a,b]);

    return smoothie;
        
}

makeSmoothie()
    .then(data => console.log(data))
    .catch(error => console.error(error));