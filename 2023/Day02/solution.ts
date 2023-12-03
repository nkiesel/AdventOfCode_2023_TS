import {add, readData, toInt} from '../utils'

const sample: string[] = `
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
`.trim().split('\n')

type Cube = 'red' | 'green' | 'blue'

class Reveal {
    red: number = 0
    green: number = 0
    blue: number = 0
}

interface Game {
    id: number,
    reveals: Reveal[]
}

const parse = (input: string[]): Game[] =>
    input.map((line) => {
        const parts = line.split(/[:;]/)
        const id = toInt(parts[0].split(' ')[1])
        const reveals: Reveal[] = []
        for (const p of parts.slice(1)) {
            const draws = p.match(/\w+/g)
            const r = new Reveal()
            for (let i = 0; i < draws.length; i += 2) {
                r[draws[i + 1] as Cube] = toInt(draws[i])
            }
            reveals.push(r)
        }
        return {id, reveals}
    })

function part1(input: string[]): number {
    return parse(input)
        .filter((g) => g.reveals.every((r) => r.red <= 12 && r.green <= 13 && r.blue <= 14))
        .map((g) => g.id)
        .reduce(add)
}

function part2(input: string[]): number {
    return parse(input)
        .map((g) =>
            Math.max(...g.reveals.map((r) => r.red))
            * Math.max(...g.reveals.map((r) => r.green))
            * Math.max(...g.reveals.map((r) => r.blue))
        )
        .reduce(add)
}

describe('Day 2', () => {
    const input = readData(__dirname)

    test('part 1', () => {
        expect(part1(sample)).toBe(8)
        expect(part1(input)).toBe(2377)
    })

    test('part 2', () => {
        expect(part2(sample)).toBe(2286)
        expect(part2(input)).toBe(71220)
    })
})

/*
I was trying _not_ to use classes in TS because most of our corporate TS code also does not use classes. But then
I could not get the default values for Reveal set to 0 when using "type" or "interface".  Will be interesting to see
better TS solutions.
*/
