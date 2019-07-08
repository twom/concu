import { concu } from "../index";
import { expect } from "chai";
import "mocha";


describe("Concu", async () => {
    it("Sum of array", async() => {
        // create an array with 10000 elements
        const array = Array(1000);
        const dataToProcess: number[] = [...array.keys()];
        // Simple reducer function to calculate the sum of an array
        const processData = (numbers: number[]): number => {
            return numbers.reduce( (sum, val) => sum+val, 0);
        };

        const concurrency = 10; // number of parallel executions
        const chunkSize = 100; // size of every chunk

        const results: any[] = await concu(processData, chunkSize, concurrency,  dataToProcess);
        const sum1 = results.reduce( (total, value) => total + value, 0);

        const sum2 = dataToProcess.reduce( (total, value) => total + value, 0);
        expect(sum1).to.equal(sum2);
        expect(results.length).to.equal(10);
    });

    it("Sum of array with 1 extra arg", async () => {
        // create an array with 10000 elements
        const array = Array(1000);
        const dataToProcess: number[] = [...array.keys()];
        // Simple reducer function to calculate the sum of an array
        const processData = (numbers: number[], factor: number): number => {
            return numbers.reduce( (sum, val) => sum + (val * factor), 0);
        };

        const concurrency = 10; // number of parallel executions
        const chunkSize = 100; // size of every chunk

        const results: any[] = await concu(processData, chunkSize, concurrency,  dataToProcess, 2);
        const sum1 = results.reduce( (total, value) => total + value, 0);

        const sum2 = dataToProcess.reduce( (total, value) => total + value, 0);
        expect(sum1).to.equal(2 * sum2);
        expect(results.length).to.equal(10);
    });

    it("Sum of array with 2 extra args", async () => {
        // create an array with 10000 elements
        const array = Array(1000);
        const dataToProcess: number[] = [...array.keys()];
        // Simple reducer function to calculate the sum of an array
        const processData = (numbers: number[], factor1: number, factor2: number): number => {
            return numbers.reduce( (sum, val) => sum + (val * factor1/factor2), 0);
        };

        const concurrency = 10; // number of parallel executions
        const chunkSize = 100; // size of every chunk

        const results: any[] = await concu(processData, chunkSize, concurrency,  dataToProcess, 4, 2);
        const sum1 = results.reduce( (total, value) => total + value, 0);

        const sum2 = dataToProcess.reduce( (total, value) => total + value, 0);
        expect(sum1).to.equal(2 * sum2);
        expect(results.length).to.equal(10);
    });


});
