const Question = ({ obj, handleClick }) => {
  console.table(obj.answers)
  return (
    <>
      <div className="question">{obj.question}</div>
      <span className="choice-wrapper">
        {obj?.answers.map((item, index) => {
          return (
            <div
              id={index}
              className="choice-style"
              onClick={handleClick}
              key={index}
            >
              {item.answer}
            </div>
          )
        })}
      </span>
    </>
  )
}

export default Question
