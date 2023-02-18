export default async function getQuestions() {
  try {
    const response = await fetch('https://the-trivia-api.com/api/questions')
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}
