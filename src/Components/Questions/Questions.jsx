import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Questioncard from './Questioncard';
import styled from 'styled-components';

const QuestionLayout = styled.div`
  max-width: 60%;
  padding: 5% 1%;
  margin: auto;
`;

const Questions = () => {
  const [allQuesiotns, setAllQuesiotns] = React.useState([
    {
      id: uuidv4(),
      title: 'generating a custom Styling for python pygments',
      description:
        'I am currently using python pygments for my website to highlight some code and would like to adjust some of the colors used. So far I have tried the following approach:',
      answers: [
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt corporis dignissimos quas libero',
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt corporis dignissimos quas libero',
      ],
    },
    {
      id: uuidv4(),
      title:
        'Android Studio push git to github then use Jenkins to assemble Debug failed. Why?',
      description:
        "What went wrong: Execution failed for task ':app:processDebugResources.' ",
      answers: [
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt corporis dignissimos quas libero',
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt corporis dignissimos quas libero',
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt corporis dignissimos quas libero',
      ],
    },
    {
      id: uuidv4(),
      title: 'Program to traverse a matrix spirally.',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt corporis dignissimos quas libero quos odio aut, consequatur cum omnis ipsam quis quisquam commodi ab cumque tenetur. Nesciunt iure explicabo nostrum.',
      answers: [
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt corporis dignissimos quas libero',
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt corporis dignissimos quas libero',
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt corporis dignissimos quas libero',
      ],
    },
  ]);
  return (
    <QuestionLayout>
      {allQuesiotns.map((qst) => {
        return (
          <Questioncard
            title={qst.title}
            description={qst.description}
            id={qst.id}
          />
        );
      })}
    </QuestionLayout>
  );
};

export default Questions;
