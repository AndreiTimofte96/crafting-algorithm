const fs = require('fs/promises');

const readData = async () => {
  try {
    const fileName = './input.txt';
    const data = await fs.readFile(fileName, 'utf8');
    return data;
  } catch (err) {
    console.log(err);
  }
};

const isSolutionValid = (k, solution) => {
  for (let index = 0; index < k; index++) {
    if (solution[index] === solution[k]) return false;
  }
  return true;
};

const bktFn = (k, p, n, solution, arrangements) => {
  if (k === p + 1) {
    arrangements.push([...solution]);
    return;
  }

  for (let index = 0; index < n; index++) {
    solution[k] = index;

    if (isSolutionValid(k, solution)) {
      bktFn(k + 1, p, n, solution, arrangements);
    }
  }
};

const generateArrangements = (n) => {
  let allArrangements = [];

  for (let p = 0; p < n; p++) {
    const arrangements = [];

    bktFn(0, p, n, [], arrangements);
    allArrangements = allArrangements.concat(arrangements);
  }
  return allArrangements;
};

const solve = (words, string, allArrangements) => {
  const results = [];

  allArrangements.forEach((arrangement) => {
    const possibleResult = arrangement.reduce((prev, curr) => {
      prev += words[curr];
      return prev;
    }, '');

    if (possibleResult === string) {
      const result = arrangement.map((index) => words[index]);
      results.push(result);
    }
  });

  return results;
};

const main = async () => {
  const data = await readData();

  const inputLines = data.split('\n');
  const wordsCount = Number(inputLines[0]);
  const words = inputLines.slice(1, wordsCount + 1).map((item) => item.trim());
  const string = inputLines.at(-1).trim();

  const allArrangements = generateArrangements(words.length);

  return solve(words, string, allArrangements);
};

(async () => {
  const result = await main();
  console.log(result);
})();

module.exports = main;
