# crafting-algorithm

Given a list of words and a string made up of those words (no spaces), return the original sentence in a list.
If there is more than one possible reconstruction, return any of them.
If there is no possible reconstruction, then return an empty array.

For example:
Given the set of words `'quick', 'brown', 'the', 'fox'`, and the `string` `"thequickbrownfox"`, you should return `['the', 'quick', 'brown', 'fox']`.
Given the set of words `'bed', 'bath', 'bedbath', 'and', 'beyond'`, and the `string` `"bedbathandbeyond"`, return either `['bed', 'bath', 'and', 'beyond]` or `['bedbath', 'and', 'beyond']`.


## Solution: 

My solution is based on `recurisivity`, generating a `set` of mathematical arrangements, starting with `k = 0` to `n`, `n` being the number of words given as input. 
After getting all the possible arrangements, I'm using the digits as indexes to match the words in the correct order and compare with the given `string`

Example: 

if the input has `3` words, then I'm generating the following arrangements:

`[
  [ 0 ],       [ 1 ],
  [ 2 ],       [ 0, 1 ],
  [ 0, 2 ],    [ 1, 0 ],
  [ 1, 2 ],    [ 2, 0 ],
  [ 2, 1 ],    [ 0, 1, 2 ],
  [ 0, 2, 1 ], [ 1, 0, 2 ],
  [ 1, 2, 0 ], [ 2, 0, 1 ],
  [ 2, 1, 0 ]
]`

# Input format

The input of the solution will be taken from `input.txt` file.

The first line of the file will be an integer number, `n`.

The following `n` lines will be a list of words, each `word` on a line.

The last line of the file will be the `string`

## How To Run

Run solution: `make`

Run unit test: `make test`
