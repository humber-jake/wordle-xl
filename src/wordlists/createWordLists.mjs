import * as fs from 'node:fs/promises';

async function createWordLists(wordLength) {
    try {

      let guesses = await fs.readFile('./guessesinput.txt', { encoding: 'utf8' });
      let answers = await fs.readFile('./answersinput.txt', { encoding: 'utf8' });

      guesses = guesses.split('\n')
      answers = answers.split('\n')
    //   remove plurals by checking if the word ends with S, then removing if the array contains that word without the S
      .filter((word, i) => {
          if(word[word.length-1] === 's'){
              return !answers.includes(word.slice('end', word.length-1))
          }
          return true;
      })

      let guessWords = guesses.filter(i => i.length === wordLength && !i.includes("'"))
      let answerWords = answers.filter(i => i.length === wordLength && !i.includes("'"))

      console.log(guessWords);
      console.log(answerWords);

      fs.writeFile(`${wordLength}-letter-guesses.js`, `export default ${JSON.stringify(guessWords)}`)
      fs.writeFile(`${wordLength}-letter-answers.js`, `export default ${JSON.stringify(answerWords)}`)

    } catch (err) {
      console.log(err);
    }
  }

  createWordLists(5);
  createWordLists(6);
  createWordLists(7);
  createWordLists(8);