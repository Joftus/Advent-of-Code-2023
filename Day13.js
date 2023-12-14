const fs = require('fs')



//#region PART 1
fs.readFile('input13.txt', (err, data) => {
    const lines = data.toString().replaceAll('\r', '').split('\n');
    const puzzles = [];
    let pattern_count = 0;
    lines.forEach(line => {
        if (!puzzles[pattern_count])
            puzzles[pattern_count] = []

        if (!line.length) 
            pattern_count++
        else 
            puzzles[pattern_count].push(line);
    })

    const transpose = puzzle => {
        const result = Array(puzzle[0].length).fill("");
        for (const row of puzzle)
            [...row].forEach((c, i) => result[i] += c);
        return result;
    }

    checkHorizontal = (pattern, row) => {
        for (let i = row - 1, j = row; i >= 0 && j < pattern.length; i--, j++) {
            if (pattern[i] !== pattern[j]) 
                return false;
        }
        return true;
    }


    let total = 0;
    puzzles.forEach(pattern => {
        for (let i = 1; i < pattern.length; i++) {
            if (checkHorizontal(pattern, i)) {
                total += 100 * i;
                return;
            }
        }

        const transposed = transpose(pattern);
        for (let i = 1; i < transposed.length; i++) {
            if (checkHorizontal(transposed, i)) {
                total += i;
                return;
            }
        }
    })

    console.log('part 1:', total);
})
//#endregion



//#region PART 2
fs.readFile('input13.txt', (err, data) => {
    const lines = data.toString().replaceAll('\r', '').split('\n');
    const puzzles = [];
    let pattern_count = 0;
    lines.forEach(line => {
        if (!puzzles[pattern_count])
            puzzles[pattern_count] = []

        if (!line.length) 
            pattern_count++
        else 
            puzzles[pattern_count].push(line);
    })

    const transpose = puzzle => {
        const result = Array(puzzle[0].length).fill("");
        for (const row of puzzle)
            [...row].forEach((c, i) => result[i] += c);
        return result;
    }

    checkHorizontal = (pattern, row) => {
        let smudgeRow = NaN;
        for (let i = row - 1, j = row; i >= 0 && j < pattern.length; i--, j++) {
            const pi = pattern[i], pj = pattern[j];
            for (let k = 0; k < pi.length; k++) {
                if (pi[k] !== pj[k]) {
                    if (!isNaN(smudgeRow)) 
                        return false;
                    smudgeRow = i;
                }
            }
        }
        if (!isNaN(smudgeRow)) 
            return true;
    }

    let total = 0;
    puzzles.forEach(pattern => {
        for (let i = 1; i < pattern.length; i++) {
            if (checkHorizontal(pattern, i)) {
                total += 100 * i;
                return;
            }
        }

        const transposed = transpose(pattern);
        for (let i = 1; i < transposed.length; i++) {
            if (checkHorizontal(transposed, i)) {
                total += i;
                return;
            }
        }
    })

    console.log('part 2:', total);
})
//#endregion PART 2