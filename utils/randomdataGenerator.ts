export class RandomDataGenerator {

    static generate4DigitEmpId(): number {

        return Math.floor(1000 + Math.random() * 9000);

    }

}