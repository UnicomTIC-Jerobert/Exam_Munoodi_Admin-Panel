// src/pages/QuestionsByTopicPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import QuestionsTable from '../components/QuestionsTable';
import { Typography } from '@mui/material';

const QuestionsByTopicPage: React.FC = () => {
  const { subject, mainTopic } = useParams<{ subject: string; mainTopic: string }>();

  if (!subject || !mainTopic) {
    return <Typography>Error: Missing subject or main topic.</Typography>;
  }
  
  return (
    <div>
      <Typography variant="h5" sx={{ my: 2 }}>
        Questions for {subject.toUpperCase()} - Topic: {mainTopic.toUpperCase()}
      </Typography>
      <QuestionsTable subject={subject} mainTopic={mainTopic} />
    </div>
  );
};

export default QuestionsByTopicPage;