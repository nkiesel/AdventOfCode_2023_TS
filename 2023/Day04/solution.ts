import {readData, toInt} from '../utils'

const sample: string[] = `
Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
`.trim().split('\n')

interface Card {
    wins: number
    count: number
}

function parse(input: string[]): Card[] {
    const ints = (str: string) => Array.from(str.matchAll(/\d+/g)).map(m => toInt(m[0]))
    return input.map(line => {
        const [_, w, h] = line.match(/Card +\d+: (.+) \| (.+)/)
        const winning = ints(w)
        const having = new Set(ints(h))
        return { wins: winning.filter(num => having.has(num)).length, count: 1 }
    })
}

function part1(input: string[]) {
    const cards = parse(input)
    return cards.reduce((sum, card) => sum + (card.wins > 0 ? Math.pow(2,card.wins - 1) : 0), 0)
}

function part2(input: string[]) {
    const cards = parse(input)
    cards.forEach((card, index) => {
        for (let i = 1; i <= card.wins; i++) {
            cards[index + i].count += card.count
        }
    })
    return cards.reduce((sum, card) => sum + card.count, 0)
}

describe('Day 4', () => {
    const input = readData(__dirname)

    test('part 1', () => {
        expect(part1(sample)).toBe(13)
        expect(part1(input)).toBe(21959)
    })

    test('part 2', () => {
        expect(part2(sample)).toBe(30)
        expect(part2(input)).toBe(5132675)
    })
})
