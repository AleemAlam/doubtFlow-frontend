import React, { useState, useEffect } from 'react';
import Questioncard from './Questioncard';
import styled from 'styled-components';
import axios from 'axios';
import useAxios from '../../Hooks/axioshook';
import { CircularProgress } from '@material-ui/core';
import Homepage from '../Home/Homepage';

const QuestionLayout = styled.div`
  max-width: 60%;
  padding: 1% 1%;
  margin: auto;
`;

const Questions = () => {
  const { response, loading, error } = useAxios({ url: '/question' });

  return (
    <QuestionLayout>
      <Homepage />
      <h1>Top Questions</h1>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <h1 style={{ color: 'red' }}>Error</h1>
      ) : (
        response.questions.map((qst) => {
          return (
            <Questioncard
              title={qst.title}
              description={qst.question}
              creator={qst.creator.name}
              id={qst._id}
            />
          );
        })
      )}
    </QuestionLayout>
  );
};

export default Questions;
