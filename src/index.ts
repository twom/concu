const pLimit = require("p-limit");

/**
 * Generic method to generate a list of method calls on partitions of the data
 * @param call
 * @param chunkSize
 * @param concurrency
 * @param data
 * @param args
 */
export function *generateChunkedCalls(call: (...args: []) => any, chunkSize: number, concurrency: number,
                                      data: [], ...args: [])  {
    const limit = pLimit(concurrency);
    for (let i = 0; i * chunkSize < data.length; i++ ) {
        const dataChunked = data.slice(i * chunkSize, (i + 1) * chunkSize);
        yield limit(call, dataChunked, ...args);
    }
}

export const concu = async (call: (...args: []) => any, chunkSize: number, concurrency: number,
                      data: any[], args: any[]) => {
    return await Promise.all(
        generateChunkedCalls(call, chunkSize, concurrency, data, args)
    )
}
