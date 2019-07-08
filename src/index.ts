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
 *
 * @param call
 * @param chunkSize
 * @param concurrency
 * @param data
 * @param args
 */
export const concu = async (fn: (data:any [], ...args: any) => any, chunkSize: number, concurrency: number,
                      data: any[], ...args: any[]) => {
    return await Promise.all(
        generateChunkedCalls(fn, chunkSize, concurrency, data, ...args)
    )
}

