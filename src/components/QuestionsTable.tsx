// src/components/QuestionsTable.tsx
import React, { useEffect, useState } from 'react';
import type { Question } from '../services/apiService';
import { getQuestionsByYear, getQuestionsByTopic } from '../services/apiService';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Typography,
    Box
} from '@mui/material';

// Define the props the component will accept
interface QuestionsTableProps {
    subject: string;
    year?: number;       // Year is optional
    mainTopic?: string;  // mainTopic is optional
}

const QuestionsTable: React.FC<QuestionsTableProps> = ({ subject, year, mainTopic }) => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                setLoading(true);
                let data: Question[];

                // Decide which API function to call based on the provided props
                if (year) {
                    data = await getQuestionsByYear(subject, year);
                } else if (mainTopic) {
                    data = await getQuestionsByTopic(subject, mainTopic);
                } else {
                    // Handle case where neither year nor topic is provided, if necessary
                    data = [];
                    setError("No year or topic specified.");
                }

                setQuestions(data);
                if (data.length === 0 && !error) {
                    setError("No questions found for this selection.");
                } else {
                    setError(null);
                }
            } catch (err) {
                setError('Failed to fetch questions. Is the API server running?');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [subject, year, mainTopic]); // Re-run effect if any of these props change

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>;
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="questions table">
                <TableHead>
                    <TableRow>
                        <TableCell>Year</TableCell>
                        <TableCell>Q#</TableCell>
                        <TableCell>Main Topic</TableCell>
                        <TableCell>Sub Topic</TableCell>
                        <TableCell align="center">Complexity</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {questions.map((question) => (
                        <TableRow hover key={question['year#questionNum']}>
                            <TableCell>{question.year}</TableCell>
                            <TableCell>{question.questionNum}</TableCell>
                            <TableCell>{question.mainTopic}</TableCell>
                            <TableCell>{question.subTopic}</TableCell>
                            <TableCell align="center">{question.complexity}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default QuestionsTable;