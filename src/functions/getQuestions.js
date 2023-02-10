export default async function getQuestions() {
  const response = await fetch('https://opentdb.com/api.php?amount=5')
  const data = await response.json()
  return data.results
}
