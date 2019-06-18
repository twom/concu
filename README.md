# concu
A simple method wrapper for concurrent (asynchronous) processing of data series in javascript.

# Introduction
The Concu library helps you processing series of data (typically an array) by chunking your data in smaller bits and concurrently processing these chunks. This is achieved by provider a thin wrapper around around [pLimit](https://github.com/sindresorhus/p-limit) and `Promise.all()`

Concu provides a great way of parellization of function calls. Most gains of parellelization can be be achieved for I/O intensive processing. 

As a bonus this allows also for sequential processing on large arrays by setting concurrency to 1.


# Usage

Typescript example

```javascript
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

```


# API

*concu(fun, chunkSize, concurrency, data, ...args)*

returns a Promise resolving to an array of individual results of each individual execution

_fun: (data: any[], ...args: any) => any_

function which accepts a data array and other possible arguments:
 
_chunkSize: number_

How many elements of the array to be processed
 
_concurrency: number_

how many executions in parallel
 
 _...args: any_
 
 optional arguments that will be passed to _fun_


# Acknowledgments

This work has been created at [Locai Solutions](https://www.locaisolutions.com) as part of the data import efforts.
