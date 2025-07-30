// src/pages/QuestionsByYearPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import QuestionsTable from '../components/QuestionsTable';
import { Typography } from '@mui/material';

const QuestionsByYearPage: React.FC = () => {
    const { subject, year } = useParams<{ subject: string; year: string }>();

    if (!subject || !year) {
        return <Typography>Error: Missing subject or year.</Typography>;
    }

    return (
        <div>
            <Typography variant="h5" sx={{ my: 2 }}>
                Questions for {subject.toUpperCase()} - Year {year}
            </Typography>
            <QuestionsTable subject={subject} year={parseInt(year, 10)} />
        </div>
    );
};

export default QuestionsByYearPage;