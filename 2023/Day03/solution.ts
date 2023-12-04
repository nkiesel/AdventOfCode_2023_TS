import {readData, toInt} from '../utils'

const sample: string[] = `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`.trim().split('\n')

interface Part {
    value: number
    x: number[]
    y: number
}

function parse(input: string[]): Part[] {
    const parts: Part[] = []
    input.forEach((row, y) => {
        [...row.matchAll(/\d+/g)].forEach(m => {
            const x = [...Array(m[0].length)].map((_, i) => m.index + i)
            parts.push({value: toInt(m[0]), x, y})
        })
    })
    return parts
}

function part1(input: string[]) {
    const parts = new Set(parse(input))
    let total = 0;
    input.forEach((row, y) => {
        Array.from(row.matchAll(/[^\d.]/g)).forEach(m => {
            const x = m.index
            Array.from(parts)
                .filter((p) => [
                    [x - 1, y - 1], [x, y - 1], [x + 1, y - 1],
                    [x - 1, y], [x + 1, y],
                    [x - 1, y + 1], [x, y + 1], [x + 1, y + 1]
                ].some(([px, py]) => p.x.includes(px) && py === p.y))
                .forEach((p) => {
                    total += p.value
                    parts.delete(p)
                })
        })
    })
    return total
}

function part2(input: string[]): number {
    const parts = parse(input)
    let total = 0
    input.forEach((row, y) => {
        Array.from(row.matchAll(/\*/g)).forEach(m => {
            const x = m.index
            const nums = parts.filter((p) => [
                [x - 1, y - 1], [x, y - 1], [x + 1, y - 1],
                [x - 1, y], [x + 1, y],
                [x - 1, y + 1], [x, y + 1], [x + 1, y + 1]
            ].some(([px, py]) => p.x.includes(px) && py === p.y))
            if (nums.length === 2) {
                total += nums[0].value * nums[1].value
            }
        })
    })
    return total
}

describe('Day 3', () => {
    const input = readData(__dirname)

    test('part 1', () => {
        expect(part1(sample)).toBe(4361)
        expect(part1(input)).toBe(546563)
    })

    test('part 2', () => {
        expect(part2(sample)).toBe(467835)
        expect(part2(input)).toBe(91031374)
    })
})

/*
A variation of my Kotlin solution.  Learning a lot about Typescript like `2 in [5, 6, 7]` is valid Typescript but
`true` because `in` for arrays checks if the value is included in the indices of the array and not the values of the
array, and thus I must use `[5, 6, 7jes].includes(2)`.

Part 1 uses a set instead of an array because it is easier to remove items from sets.  For part 2, it is possible
that a part number is used for 2 gears (e.g. `...12*34*56...` should add 12*34 and 34*56), and thus can use an array.
*/
