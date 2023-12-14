const fs = require('fs')
const TEST_DATA = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`



fs.readFile('input12.txt', (err, data) => {
    //const lines = TEST_DATA.split(/\n/g);
    const lines = data.toString().split(/\n/g)

    const memoize = func => {
        const stored = new Map();
    
        return (...args) => {
            const k = JSON.stringify(args);
            if (stored.has(k))
                return stored.get(k);
            const result = func(...args);
            stored.set(k, result);
            return result;
        };
    }
    
    const sum = (...nums) => {
        let tot = 0;
        for (const x of nums) {
            if (typeof x === 'number')
                tot += x;
            else {
                for (const y of x)
                    tot += y;
            }
        }
        return tot;
    }

    const countWays = memoize((line, runs) => {
        if (line.length === 0)
            return !runs.length ? 1 : 0
        if (runs.length === 0) {
            for (let i = 0; i < line.length; i++) {
                if (line[i] === '#')
                    return 0;
            }
            return 1;
        }
    
        if (line.length < sum(runs) + runs.length - 1)
            return 0;
        if (line[0] === '.')
            return countWays(line.slice(1), runs);
        if (line[0] === '#') {
            const [run, ...leftovers] = runs;
            for (let i = 0; i < run; i++) {
                if (line[i] === '.') 
                    return 0;
            }
            if (line[run] === '#')
                return 0;
    
            return countWays(line.slice(run + 1), leftovers);
        }

        return (
            countWays('#' + line.slice(1), runs) + countWays('.' + line.slice(1), runs)
        );
    });
    
    let part_1 = 0, part_2 = 0;
    for (const line of lines) {
        const [str, nums_raw] = line.split(' ');
        const nums = nums_raw.split(',').map(_ => parseInt(_));

        part_1 += countWays(str, nums);
        part_2 += countWays(
            [str, str, str, str, str].join('?'), 
            [...nums, ...nums, ...nums, ...nums, ...nums]
        );
    }
    
    console.debug('part_1:', part_1);
    console.debug('part_2:', part_2 );
})
//#endregion PART 1