import * as fs from 'fs'
import * as path from 'path'

export {}

declare global {
    interface String {
        reversed(): string
        numbers(): number[]
        toNumber(): number
    }
    interface Array<T> {
        chunkedBy(predicate: (t: T, index?: number) => boolean): T[][]
    }
}

String.prototype.reversed = function (): string {
    return this.split("").reverse().join("")
}

String.prototype.numbers = function (): number[] {
    return Array.from(this.matchAll(/\d+/g)).map(m => toInt(m[0]))
}

String.prototype.toNumber = function (): number {
    return parseInt(this, 10)
}

Array.prototype.chunkedBy = function <T>(predicate: (item: T, index?: number) => boolean): T[][] {
    const result: T[][] = [[]]
    for (const [index, item] of this.entries()) {
        if (predicate(item, index)) {
            result.push([])
        } else {
            result[result.length - 1].push(item)
        }
    }
    return result
}

export const readData = (dir: string): string[] => fs
    .readFileSync(path.join(dir, 'input'), 'utf8')
    .split('\n')
    .slice(0, -1)

export const plus = (acc: number, n: number): number => acc + n
export const times = (acc: number, n: number): number => acc * n
export const toInt = (n: string): number => parseInt(n, 10)
