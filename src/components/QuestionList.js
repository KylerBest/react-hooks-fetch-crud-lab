import React, { useEffect } from "react";
import QuestionItem from "./QuestionItem"

function QuestionList({questions, setQuestions}) {
  
  function handleDeleteQuestion(id){
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE"
    })
      .then(r => r.json())
      .then(() => {
        const updatedQuestions = questions.filter(question => question.id !== id)
        setQuestions(updatedQuestions)
      })
  }

  function handleEditQuestion(id, index){
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        correctIndex: index
      })
    })
      .then(r => r.json())
      .then(json => console.log(json))
  }

  useEffect(() => {

    fetch("http://localhost:4000/questions")
      .then(r => r.json())
      .then(json => setQuestions(json))

  }, [])

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{
        questions.map(q => <QuestionItem question={q} key={q.id} onDelete={handleDeleteQuestion} onEdit={handleEditQuestion} />)
      }</ul>
    </section>
  );
}

export default QuestionList;
