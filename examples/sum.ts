import { concu } from "../lib/"

// create an array with 10000 elements
const array = Array(1000);
const dataToProcess: number[] = [...array.keys()];


// Dummy method to just calculate the sum
const processData = (numbers: number[]): number => {
    return numbers.reduce( (sum, val) => sum+val, 0);
}

const concurrency = 10; // number of parallel executions
const chunkSize = 100; // size of every chunk

const run = async (): Promise<number[]> => {
    return await concu(processData, concurrency, chunkSize, dataToProcess)
};

run().then( (result: number[]) => {
    const sum = result.reduce( (total, value) => total + value, 0);
    console.log(sum);
});
