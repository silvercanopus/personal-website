const dependencies = require('./boardDependencies');

test("Dependencies list data type", () => {
    // Check that 'dependencies' has the correct type and dimension
    expect(Array.isArray(dependencies)).toBe(true);
    expect(dependencies.length).toBe(9);
    for (let row = 0; row < 9; row++) {
        expect(Array.isArray(dependencies[row])).toBe(true);
        expect(dependencies[row].length).toBe(9);
        for (let col = 0; col < 9; col++) {
            expect(Array.isArray(dependencies[row][col])).toBe(true);
            for (let index of dependencies[row][col]) {
                expect(Array.isArray(index)).toBe(true);
                expect(index.length).toBe(2);
                for (let i = 0; i < 2; i++) {
                    expect(Number.isInteger(index[i])).toBe(true);
                    expect(0 <= index[i] && index[i] < 9).toBe(true);
                }
            }
        }
    }
});

test("Dependencies list correctness", () => {
    // Check that every dependency in 'dependencies' is a correct dependency
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            for (const [r,c] of dependencies[row][col]) {
                let correct = false;
                // Either one of these conditions must be true
                correct = correct || 
                          (row == r) ||
                          (col == c) ||
                          ((Math.floor(row/3) == Math.floor(r/3)) && (Math.floor(col/3) == Math.floor(c/3)));
                expect(correct).toBe(true);
            }
        }
    }
})

test("Dependencies list completeness", () => {
    // Check that every correct dependency is included in the list
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            // Define a helper function
            const included = function (x, y) {
                for (const [r,c] of dependencies[row][col]) {
                    if (x == r && y == c) {
                        return true;
                    }
                }
                return false;
            }
            // Same column
            for (let r = 0; r < 9; r++) {
                if (r != row) {
                    expect(included(r, col)).toBe(true);
                }
            }
            // Same row
            for (let c = 0; c < 9; c++) {
                if (c != col) {
                    expect(included(row, c)).toBe(true);
                }
            }
            // Same 3x3 section
            const i = Math.floor(row / 3) * 3;
            const j = Math.floor(col / 3) * 3;
            for (let r = i; r < i+3; r++) {
                for (let c = j; c < j+3; c++) {
                    if (r != row && c != col) {
                        expect(included(r, c)).toBe(true);
                    }
                }
            }
        }
    }
})