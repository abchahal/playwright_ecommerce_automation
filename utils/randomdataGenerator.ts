export class RandomDataGenerator {

    static generate4DigitEmpId(): number {

        return Math.floor(1000 + Math.random() * 9000);

    };

    static generateUniqueComment(prefix: string = "AutoTest"): string {
    const timestamp = Date.now(); // e.g. 1747234567890
    return `${prefix}_${timestamp}`; // e.g. AutoTest_1747234567890
}

}