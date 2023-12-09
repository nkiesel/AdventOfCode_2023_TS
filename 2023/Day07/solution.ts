import { plus, readData, toInt } from '../utils'

const sample = [
    '32T3K 765',
    'T55J5 684',
    'KK677 28',
    'KTJJT 220',
    'QQQJA 483',
]

const Type = {
    'HIGH_CARD': 1,
    'ONE_PAIR': 2,
    'TWO_PAIRS': 3,
    'THREE_OF_A_KIND': 4,
    'FULL_HOUSE': 5,
    'FOUR_OF_A_KIND': 6,
    'FIVE_OF_A_KIND': 7,
}

class Hand {
    private readonly type: number
    private readonly value: number

    constructor(private hand: string, public bid: number, private joker: boolean) {
        this.type = this.getType(hand)
        this.value = this.getValue(hand)
    }

    private getType(hand: string): number {
        const cards: Record<string, number> = {}
        let jokers = 0
        for (let i = 0; i < hand.length; i++) {
            const h = hand.charAt(i)
            if (this.joker && h === 'J') {
                jokers++
            } else {
                cards[h] = (cards[h] ?? 0) + 1
            }
        }
        const grouped = Object.values(cards).sort((a, b) => b - a).join('')
        switch (jokers) {
            case 5: return Type.FIVE_OF_A_KIND
            case 4: return Type.FIVE_OF_A_KIND
            case 3:
                switch (grouped) {
                    case '2': return Type.FIVE_OF_A_KIND
                    default: return Type.FOUR_OF_A_KIND
                }
            case 2:
                switch (grouped) {
                    case '3': return Type.FIVE_OF_A_KIND
                    case '21': return Type.FOUR_OF_A_KIND
                    default: return Type.THREE_OF_A_KIND
                }
            case 1:
                switch (grouped) {
                    case '4': return Type.FIVE_OF_A_KIND
                    case '31': return Type.FOUR_OF_A_KIND
                    case '22': return Type.FULL_HOUSE
                    case '211': return Type.THREE_OF_A_KIND
                    default: return Type.ONE_PAIR
                }
            default:
                switch (grouped) {
                    case '5': return Type.FIVE_OF_A_KIND
                    case '41': return Type.FOUR_OF_A_KIND
                    case '32': return Type.FULL_HOUSE
                    case '311': return Type.THREE_OF_A_KIND
                    case '221': return Type.TWO_PAIRS
                    case '2111': return Type.ONE_PAIR
                    default: return Type.HIGH_CARD
                }
        }
    }


    private getValue(hand: string) {
        const order = (this.joker ? 'AKQT98765432J' : 'AKQJT98765432').reverse()
        return hand.split('').reduce((acc , c) => acc * order.length + order.indexOf(c), 1)
    }

    public compare(other: Hand): number {
        const c = this.type - other.type
        return c !== 0 ? c : this.value - other.value
    }
}

function parse(content: string[], joker: boolean): Hand[] {
    return content.map(line => {
        const [hand, bid] = line.split(' ')
        return new Hand(hand, toInt(bid), joker)
    })
}

function total(input: string[], joker: boolean): number {
    const parsed = parse(input, joker)
    parsed.sort((a, b) => a.compare(b))
    return parsed.map((hand, index) => (index + 1) * hand.bid).reduce(plus)
}

function part1(input: string[]): number {
    return total(input, false)
}

function part2(input: string[]): number {
    return total(input, true)
}

describe('Day 7', () => {
    const input = readData(__dirname)

    test('part 1', () => {
        expect(part1(sample)).toBe(6440)
        expect(part1(input)).toBe(249204891)
    })

    test('part 2', () => {
        expect(part2(sample)).toBe(5905)
        expect(part2(input)).toBe(249666369)
    })
})
