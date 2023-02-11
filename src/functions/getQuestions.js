export default async function getQuestions() {
  const response = await fetch('https://the-trivia-api.com/api/questions')
  const data = await response.json()
  return data
}

// export default async function getQuestions() {
//   return fetch('https://the-trivia-api.com/api/questions')
//     .then((res) => res.json())
//     .then((data) => data)
// }
