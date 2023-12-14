var fs = require('fs')
const attached_arr = []

fs.readFile('input3.txt', 'utf8', function (e, d) {
    const lines = d.split(/\n/g)
    const allResults = []
    lines.forEach((line, line_index) => {
        if (line === '') 
            return;
        const number_or_symbols = line.match(/(\d+)|(\D+)/g)
        const results = number_or_symbols.filter((part, part_index) => partOne(part, part_index, lines, line_index, number_or_symbols))
        allResults.push(results)
            
        const stars = line.split('')
        stars.forEach((char, char_index) => partTwo(char, char_index, lines, line_index, stars))
    })
    const allResultsAsNumbers = allResults.flat().map((n) => +n)
    console.debug('part 1:', allResultsAsNumbers.flat().reduce((t, n) => t + n))

    const newAttached = attached_arr.filter(i => i.length === 2)
    const totalsTwo = newAttached.map(i => i[0] * i[1])
    console.debug('part 2:', totalsTwo.reduce((t, n) => t + n))
})

function getIndexRangeOfNum(p, arr, idx) {
    const before = arr.slice(0, idx).join('')
    let start = before.length - 1
    let end = start + p.length + 2
    if (start < 0) {
        start = 0
    }
    return [start, end]
}


function checkSelected(line, range) {
    if (!line) return
    const start = line.slice(0, range[0])
    const num = line.slice(range[0], range[1])
    let hasSymbol = false
    num.split('').forEach((n) => {
        if (num.match(/\d+/) === null) {
            if (n !== '.') {
                hasSymbol = true
            }
        }
    })
    return hasSymbol
}

function extract(idx, string) {
    let num = []
    let prepend = []
    let append = []
    if (!string[idx].match(/\d/)) {
        return false
    } else {
        num.push(string[idx])
    }
    if (checkOffset(string, idx, -1) !== '') {
        prepend = [checkOffset(string, idx, -2), checkOffset(string, idx, -1)]
    }
    if (checkOffset(string, idx, 1) !== '') {
        append = [checkOffset(string, idx, 1), checkOffset(string, idx, 2)]
    }
    return [...prepend, ...num, ...append].join('')
}

function checkOffset(string, idx, offset) {
    if (string[idx + offset].match(/\d/)) {
        return string[idx + offset]
    } else {
        return ''
    }
}

function partTwo(char, char_index, lines, line_index, stars) {
    if (char.match(/\*/) === null) {
        return false
    }
    let attached = []

    const last_char_of_prev = stars[char_index - 1] && stars[char_index - 1]
    if (last_char_of_prev && last_char_of_prev.match(/\d/)) {
        const preNum = extract(char_index - 1, lines[line_index])
        attached.push(preNum)
    }

    const first_char_of_next = stars[char_index + 1] && stars[char_index + 1]
    if (first_char_of_next && first_char_of_next.match(/\d/)) {
        const postNum = extract(char_index + 1, lines[line_index])
        attached.push(postNum)
    }

    if (lines[line_index - 1][char_index].match(/\d/)) {
        const aboveNum = extract(char_index, lines[line_index - 1])
        attached.push(aboveNum)
    } else {
        if (lines[line_index - 1][char_index - 1].match(/\d/)) {
            const aboveNum = extract(
                char_index - 1,
                lines[line_index - 1]
            )
            attached.push(aboveNum)
        }

        if (lines[line_index - 1][char_index + 1].match(/\d/)) {
            const aboveNum = extract(
                char_index + 1,
                lines[line_index - 1]
            )
            attached.push(aboveNum)
        }
    }

    if (lines[line_index + 1]) {
        if (lines[line_index + 1][char_index].match(/\d/)) {
            const aboveNum = extract(char_index, lines[line_index + 1])
            attached.push(aboveNum)
        } else {
            if (lines[line_index + 1][char_index - 1].match(/\d/)) {
                const aboveNum = extract(
                    char_index - 1,
                    lines[line_index + 1]
                )
                attached.push(aboveNum)
            }

            if (lines[line_index + 1][char_index + 1].match(/\d/)) {
                const aboveNum = extract(
                    char_index + 1,
                    lines[line_index + 1]
                )
                attached.push(aboveNum)
            }
        }
    }

    attached_arr.push(attached)

    return attached_arr
}

function partOne(part, part_index, lines, line_index, number_or_symbols) {
    if (part.match(/\d+/) === null)
        return false

    const last_char_of_prev =
        number_or_symbols[part_index - 1] &&
        number_or_symbols[part_index - 1].charAt(
            number_or_symbols[part_index - 1] && number_or_symbols[part_index - 1].length - 1
        )
    if (last_char_of_prev && last_char_of_prev !== '.') 
        return true
    
    const first_char_of_next = number_or_symbols[part_index + 1] && number_or_symbols[part_index + 1].charAt(0)

    if (first_char_of_next && first_char_of_next !== '.')
        return true

    const idxRange = getIndexRangeOfNum(part, number_or_symbols, part_index)
    if (checkSelected(lines[line_index - 1], idxRange))
        return true

    const nextRange = checkSelected(lines[line_index + 1], idxRange)
    if (nextRange)
        return true

    return false
}