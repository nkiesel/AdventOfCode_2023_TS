import { readData, times } from '../utils'
import { zip } from 'lodash'

const sample: string[] = `
Time:      7  15   30
Distance:  9  40  200
`.trim().split('\n')

interface Race {
    time: number
    distance: number
}

const better = (race: Race): number => {
    let count = 0
    for (let t = 1; t < race.time; t++) {
        if ((race.time - t) * t > race.distance) count++
    }
    return count
}

function parse1(input: string[]): Race[] {
    const times = input[0].numbers()
    const distances = input[1].numbers()
    return zip(times, distances).map<Race>(([time, distance]) => ({ time, distance }))
}

function part1(input: string[]): number {
    return parse1(input).map((r) => better(r)).reduce(times)
}

function parse2(input: string[]): Race {
    const time = input[0].numbers().join("").toNumber()
    const distance = input[1].numbers().join("").toNumber()
    return { time, distance }
}

function part2(input: string[]): number {
    return better(parse2(input))
}

describe('Day 6', () => {
    const input = readData(__dirname)

    test('part 1', () => {
        expect(part1(sample)).toBe(288)
        expect(part1(input)).toBe(281600)
    })

    test('part 2', () => {
        expect(part2(sample)).toBe(71503)
        expect(part2(input)).toBe(33875953)
    })
})
