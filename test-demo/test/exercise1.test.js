
const exercise1 = require('../exercise1');

describe('fizzBuzz', () => {
    it("should throw an exception if input isn't a number", () => {
        expect(() => {
            exercise1.fizzBuzz(1).toThrow();
        });
    });

    it('should return FizzBuzz if input is devisible by 3 and 5', () => {
        const result =  exercise1.fizzBuzz(15);
        expect(result).toBe('FizzBuzz');
    });

    it('should return Fizz if input is only devisible by 3', () => {
        const result = exercise1.fizzBuzz(6);
        expect(result).toBe('Fizz');
    });

    it('should return Buzz if input is only devisible by 5', () => {
        const result = exercise1.fizzBuzz(5);
        expect(result).toBe('Buzz');
    });

    it("should return itself if input isn't devisible by 3 or 5", () => {
        const result = exercise1.fizzBuzz(2);
        expect(result).toBe(2);
    })
});
