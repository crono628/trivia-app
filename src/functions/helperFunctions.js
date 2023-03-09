export async function getQuestions() {
  try {
    const response = await fetch('https://the-trivia-api.com/api/questions')
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export function shuffleArray(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex
  // while there remain elements to shuffle
  while (0 !== currentIndex) {
    // pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // and swap it with the current element
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

export function locateCurrentQ(array) {
  const nullIndex = array.findIndex((element) => element === null)
  return nullIndex !== -1 ? nullIndex : array.length
}
