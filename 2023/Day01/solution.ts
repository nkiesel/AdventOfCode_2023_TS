import {readData} from '../utils'

const sample1: string[] = `
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
`.trim().split('\n')

const sample2: string[] = `
two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
`.trim().split('\n')


function part1(input: string[]): number {
    return three(input, false)
}

function part2(input: string[]): number {
    return three(input, true)
}

function three(input: string[], withLetters: boolean): number {
    let map: { [key: string]: number } = {}
    for (let i = 1; i <= 9; i++) {
        map[i.toString()] = i
    }
    if (withLetters) {
        map = {
            ...map,
            one: 1,
            two: 2,
            three: 3,
            four: 4,
            five: 5,
            six: 6,
            seven: 7,
            eight: 8,
            nine: 9,
        }
    }

    const pattern = Object.keys(map).join("|")
    const p1 = new RegExp(pattern)
    const p2 = new RegExp(pattern.reverse())

    function calibration(line: string): number {
        const first = map[line.match(p1)![0]]!
        const last = map[line.reverse().match(p2)![0].reverse()]!
        return first * 10 + last
    }

    return input.reduce((sum, line) => sum + calibration(line), 0)
}


describe('Day 1', () => {
    const input = readData(__dirname)

    test('part 1', () => {
        expect(part1(sample1)).toBe(142)
        expect(part1(input)).toBe(53080)
    })

    test('part 2', () => {
        expect(part2(sample2)).toBe(281)
        expect(part2(input)).toBe(53268)
    })
})

/*
This was converted from an earlier Kotlin version that also used regexes. The trick for finding the last match I
use here is to reverse both the line and the pattern and then use the first match (which again must be reversed).
I was surprised that `String.reverse()` is neither available in standard libs nor in Lodash. Thus, added the
recommended implementation found by googling as a String prototype function.
*/
