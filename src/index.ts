const pLimit = require("p-limit");

/**
 * Generic method to generate a list of method calls on partitions of the data

 * @param fn
 * @param chunkSize
 * @param concurrency
 * @param data
 * @param args
 */
export function *generateChunkedCalls(fn: (data: any[], ...args: any) => any, chunkSize: number, concurrency: number,
                                      data: any[], ...args: any[])  {
    const limit = pLimit(concurrency);
    for (let i = 0; i * chunkSize < data.length; i++ ) {
        const dataChunked = data.slice(i * chunkSize, (i + 1) * chunkSize);
        yield limit(fn, dataChunked, ...args);
    }
}

/**
 * Main wrapper which returns an array of responses for each indvidual call
 * @param fn main processing function that needs to be applied to chunks of the array
 * @param chunkSize size of each chunk that will be processed by 1 fn instance
 * @param concurrency how many concurrent executions of 'fn' will run
 * @param data the data array which will be chunked and passed to fn
 * @param args any optional arguments that will be passed to each execution of fn
 *
 * Same return as Promise.all: an array wrapped in a promise
 */
export const concu = async (fn: (data:any [], ...args: any) => any, chunkSize: number, concurrency: number,
                      data: any[], ...args: any[]): Promise<any[]> => {
    return await Promise.all(
        generateChunkedCalls(fn, chunkSize, concurrency, data, ...args)
    )
}

