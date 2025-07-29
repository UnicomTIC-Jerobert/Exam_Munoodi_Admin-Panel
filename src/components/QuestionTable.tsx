import React from 'react';
import type { Question } from '../services/apiService';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';

interface QuestionTableProps {
    questions: Question[];
}

const QuestionTable: React.FC<QuestionTableProps> = ({ questions }) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Year</TableCell>
                        <TableCell>Q#</TableCell>
                        <TableCell>Subject</TableCell>
                        <TableCell>Main Topic</TableCell>
                        <TableCell>Sub-Topic</TableCell>
                        <TableCell>Complexity</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {questions.map((q) => (
                        <TableRow key={q['year#questionNum']}>
                            <TableCell>{q.year}</TableCell>
                            <TableCell>{q.questionNum}</TableCell>
                            <TableCell>{q.subject}</TableCell>
                            <TableCell>{q.mainTopic}</TableCell>
                            <TableCell>{q.subTopic}</TableCell>
                            <TableCell align="center">{q.complexity}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default QuestionTable;