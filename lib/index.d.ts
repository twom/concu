/**
 * Generic method to generate a list of method calls on partitions of the data
 * @param fn
 * @param chunkSize
 * @param concurrency
 * @param data
 * @param args
 */
export declare function generateChunkedCalls(fn: (data: any[], ...args: any) => any, chunkSize: number, concurrency: number, data: any[], ...args?: any[]): IterableIterator<any>;
/**
 *
 * @param call
 * @param chunkSize
 * @param concurrency
 * @param data
 * @param args
 */
export declare const concu: (fn: (data: any[], ...args: any) => any, chunkSize: number, concurrency: number, data: any[], args?: any[] | undefined) => Promise<any[]>;
