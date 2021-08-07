import React, { useState, useEffect } from 'react';
import Questioncard from './Questioncard';
import styled from 'styled-components';
import axios from 'axios';

const QuestionLayout = styled.div`
  max-width: 60%;
  padding: 1% 1%;
  margin: auto;
`;

const Questions = () => {
  const [allQuestions, setAllQuestions] = useState([]);
  useEffect(() => {
      axios.get("http://localhost:8080/question").then(res=>setAllQuestions(res.data.questions))
  }, []);
  return (
    <QuestionLayout>
        <h1>Top Questions</h1>
      { allQuestions && allQuestions.map((qst) => {
        return (
          <Questioncard
            title={qst.title}
            description={qst.question}
            creator={qst.creator.name}
            id={qst._id}
          />
        );
      })}
    </QuestionLayout>
  );
};

export default Questions;
