import {plus, readData} from '../utils'

const sample: string[] = `
0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45
`.trim().split('\n')

function predictNextValue(row: number[]): number {
    let nextValue = 0
    while (row.some((n) => n !== 0)) {
        for (let i = 0; i < row.length - 1; i++) row[i] = row[i + 1] - row[i]
        nextValue += row.pop()
    }
    return nextValue
}

function part1(input: string[]): number {
    return input.map((l) => l.numbers()).map((r) => predictNextValue(r)).reduce(plus)
}

function part2(input: string[]): number {
    return input.map((l) => l.numbers().reverse()).map((r) => predictNextValue(r)).reduce(plus)
}

describe('Day 9', () => {
    const input = readData(__dirname)

    test('part 1', () => {
        expect(part1(sample)).toBe(114)
        expect(part1(input)).toBe(1939607039)
    })

    test('part 2', () => {
        expect(part2(sample)).toBe(2)
        expect(part2(input)).toBe(1041)
    })
})
