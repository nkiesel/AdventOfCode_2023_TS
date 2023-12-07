import {plus, readData, toInt} from '../utils'

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
    private cards: Record<string, number> = {}
    private jokers = 0
    private type

    constructor(private hand: string, public bid: number, private joker: boolean) {
        for (let i = 0; i < hand.length; i++) {
            const h = hand.charAt(i)
            if (this.joker && h === 'J') {
                this.jokers++
            } else {
                this.cards[h] = (this.cards[h] || 0) + 1
            }
        }

        const groups = Object.keys(this.cards).length
        if (groups === 1) {
            this.type = Type.FIVE_OF_A_KIND
        } else {
            const counts = Object.values(this.cards)
            switch (this.jokers) {
                case 5:
                case 4:
                    this.type = Type.FIVE_OF_A_KIND
                    break
                case 3:
                    this.type = Type.FOUR_OF_A_KIND
                    break
                case 2:
                    if (groups === 2) this.type = Type.FOUR_OF_A_KIND
                    else this.type = Type.THREE_OF_A_KIND
                    break
                case 1:
                    if (counts.includes(3)) this.type = Type.FOUR_OF_A_KIND
                    else if (groups === 2) this.type = Type.FULL_HOUSE
                    else if (counts.includes(2)) this.type = Type.THREE_OF_A_KIND
                    else if (groups === 3) this.type = Type.TWO_PAIRS
                    else this.type = Type.ONE_PAIR
                    break
                default:
                    if (counts.includes(4)) this.type = Type.FOUR_OF_A_KIND
                    else if (groups === 2) this.type = Type.FULL_HOUSE
                    else if (counts.includes(3)) this.type = Type.THREE_OF_A_KIND
                    else if (counts.filter(c => c == 2).length === 2) this.type = Type.TWO_PAIRS
                    else if (groups === 4) this.type = Type.ONE_PAIR
                    else this.type = Type.HIGH_CARD
                    break
            }
        }
    }

    public compare(other: Hand): number {
        if (this.type !== other.type) return this.type - other.type

        const order = this.joker ? 'AKQT98765432J' : 'AKQJT98765432'
        for (let i = 0; i < this.hand.length; i++) {
            const c = order.indexOf(this.hand.charAt(i)) - order.indexOf(other.hand.charAt(i))
            if (c != 0) return -c
        }
        return 0
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
