const main = require('./main');
const fs = require('fs/promises');

const expect = (result) => ({
  toEqual: (expectedOutput) => {
    if (JSON.stringify(result) === JSON.stringify(expectedOutput)) {
      console.log('\x1b[32m', 'TEST PASSED');
    } else {
      console.log('\x1b[31m', 'TEST FAILED');
      console.log('\x1b[32m', 'EXPECTED: ', JSON.stringify(expectedOutput));
      console.log('\x1b[31m', 'ACTUAL: ', JSON.stringify(result));
    }
    console.log('\x1b[0m');
  },
});

const testMainFile = async (input) => {
  try {
    await fs.writeFile('./input.txt', input, 'utf8');
    return main();
  } catch (err) {
    console.error(err);
  }
};

(async () => {
  let input;
  let expectedOutput;
  let result;

  console.log();
  console.log('---------- TEST 1 ----------');
  // 4
  // quick
  // brown
  // the
  // fox
  // thequickbrownfox
  input = '4\nquick\nbrown\nthe\nfox\nthequickbrownfox';
  expectedOutput = [['the', 'quick', 'brown', 'fox']];
  result = await testMainFile(input);

  expect(result).toEqual(expectedOutput);

  console.log();

  console.log('---------- TEST 2 ----------');
  // 5
  // bed
  // bath
  // bedbath
  // and
  // beyond
  // bedbathandbeyond
  input = '5\nbed\nbath\nbedbath\nand\nbeyond\nbedbathandbeyond';
  expectedOutput = [
    ['bedbath', 'and', 'beyond'],
    ['bed', 'bath', 'and', 'beyond'],
  ];
  result = await testMainFile(input);

  expect(result).toEqual(expectedOutput);

  console.log();

  console.log('---------- TEST 3 ----------');
  // 8
  // bath
  // bedbathandbeyond
  // ond
  // bedbath
  // and
  // bey
  // bed
  // beyond
  // bedbathandbeyond
  input =
    '8\nbath\nbedbathandbeyond\nond\nbedbath\nand\nbey\nbed\nbeyond\nbedbathandbeyond';
  expectedOutput = [
    ['bedbathandbeyond'],
    ['bedbath', 'and', 'beyond'],
    ['bedbath', 'and', 'bey', 'ond'],
    ['bed', 'bath', 'and', 'beyond'],
    ['bed', 'bath', 'and', 'bey', 'ond'],
  ];
  result = await testMainFile(input);

  expect(result).toEqual(expectedOutput);

  console.log();

  console.log('---------- TEST 4 ----------');
  // 9
  // bath
  // nd
  // ond
  // bedbath
  // and
  // bey
  // a
  // bed
  // beyond
  // bedbathandbeyond
  input =
    '9\nbath\nnd\nond\nbedbath\nand\nbey\na\nbed\n beyond\nbedbathandbeyond';

  expectedOutput = [
    ['bedbath', 'and', 'beyond'],
    ['bedbath', 'and', 'bey', 'ond'],
    ['bedbath', 'a', 'nd', 'beyond'],
    ['bed', 'bath', 'and', 'beyond'],
    ['bedbath', 'a', 'nd', 'bey', 'ond'],
    ['bed', 'bath', 'and', 'bey', 'ond'],
    ['bed', 'bath', 'a', 'nd', 'beyond'],
    ['bed', 'bath', 'a', 'nd', 'bey', 'ond'],
  ];
  result = await testMainFile(input);

  expect(result).toEqual(expectedOutput);

  console.log();
})();
