import React, { useState, useEffect } from 'react';

import { v4 as uuidv4 } from 'uuid';
import Questioncard from './Questioncard';
import styled from 'styled-components';
import axios from 'axios';

const QuestionLayout = styled.div`
  max-width: 60%;
  padding: 5% 1%;
  margin: auto;
`;

const Questions = () => {
  const [allQuestions, setAllQuestions] = useState([]);
  useEffect(() => {
      axios.get("http://localhost:8080/question").then(res=>setAllQuestions(res.data.questions))
  }, []);
  return (
    <QuestionLayout>
      { allQuestions && allQuestions.map((qst) => {
        return (
          <Questioncard
            title={qst.title}
            description={qst.question}
            creator={qst.creator}
            id={qst._id}
          />
        );
      })}
    </QuestionLayout>
  );
};

export default Questions;
