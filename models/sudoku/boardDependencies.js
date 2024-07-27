// Array to store square dependencies (to help with iteration)
const dependencies = new Array(9).fill(0).map(() => new Array(9).fill(0).map(() => new Array()));
for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
        // Same-column dependencies
        for (let rr = 0; rr < 9; rr++) {
            if (r != rr) {
                dependencies[r][c].push([rr, c]);
            }
        }
        // Same-row dependecies
        for (let cc = 0; cc < 9; cc++) {
            if (c != cc) {
                dependencies[r][c].push([r, cc]);
            }
        }
        // 3x3 section dependencies
        let i = Math.floor(r / 3) * 3;
        let j = Math.floor(c / 3) * 3;
        for (let rr = i; rr < i+3; rr++) {
            for (let cc = j; cc < j+3; cc++) {
                if (r != rr && c != cc) {
                    dependencies[r][c].push([rr, cc]);
                }
            }
        }
    }
}

module.exports = dependencies;