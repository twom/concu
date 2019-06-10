/**
 * Generic method to generate a list of method calls on partitions of the data
 * @param call
 * @param chunkSize
 * @param concurrency
 * @param data
 * @param args
 */
export declare function generateChunkedCalls(call: (...args: any[]) => any, chunkSize: number, concurrency: number, data: any[], ...args: any[]): IterableIterator<any>;
export declare const concu: (call: (...args: any[]) => any, chunkSize: number, concurrency: number, data: any[], args: any[]) => Promise<any[]>;
