[![CircleCI](https://circleci.com/gh/twom/concu/tree/master.svg?style=svg)](https://circleci.com/gh/twom/concu/tree/master)

# concu
A simple method wrapper for concurrent processing of an array in javascript.

# Introduction
The Concu library helps you processing series of data (typically an array) by chunking your data in smaller bits and concurrently processing these chunks.
This is typically useful if you have the possibility of processing data in parallel, however you want to have control over:
- how many concurrent executions
- size of the batch being processed

Limiting concurrency and batch size may be needed because of downstream I/O dependencies.

When opted for concurrency of 1, the method presents a simple sequential execution on partial data chunks.

The original focus was on helping to process large CSV files for which each row had a lot of IO, and each row could be processed independently of any other row.

# Internals
Concu is basically a simple wrapper around around [pLimit](https://github.com/sindresorhus/p-limit) and `Promise.all()`


# Usage

Typescript example

```javascript
import { concu } from "concu"

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

_fun: (data: any[], ...args: any[]) => any_

function which accepts a data array and other possible arguments.
 
_chunkSize: number_

How many elements of the array to be processed
 
_concurrency: number_

how many executions in parallel
 
 _...args: any[]_
 
 optional arguments that will be passed to _fun_


# Acknowledgments


This work has been created at [Locai Solutions](https://www.locaisolutions.com) as part of the data import efforts.
