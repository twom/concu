# concu
A simple method wrapper for concurrent processing of data series

# Introduction
The concu library helps you processing series of data (typically an array) by chunking your data in smaller chunks and concurrently processing these chunks. 

This is a great way of parellization simple processing which have no side effects. Most gains of parellelization can be be achieved for I/O intensive processing.

It is a small wrapper around [pLimit](https://github.com/sindresorhus/p-limit)

# Usage

typescript example

```javascript
import { concu } from "concu"

// create an array with 10000 elements
const dataToProcess: number[] = [...Array(10000).keys()]


// Dummy method to just calculate the sum
const processData = (numbers: number[]): Promise<number> {
   return numbers.reduce( (sum, val) => sum+val ), 0);
}

const concurrency = 10; // number of parallel executions
const chunkSize = 100; // size of every chunk

const run = async () => {
   await concu(processData, concurrency, chunkSize, dataToProcess)
}

run().then( (result: number[]) => { 
   const sum = result.reduce( (total, value) => total + value), 0);
   console.log( sum );
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


