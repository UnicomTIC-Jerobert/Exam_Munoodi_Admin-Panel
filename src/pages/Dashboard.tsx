import React, { useState, useEffect } from 'react';
import QuestionTable from '../components/QuestionTable';
import { getQuestionsByYear } from '../services/apiService';
import type { Question } from '../services/apiService';
import { Container, Typography, CircularProgress, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const Dashboard: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedYear, setSelectedYear] = useState<number>(2016); // Default year

    useEffect(() => {
        const fetchQuestions = async () => {
            setLoading(true);
            const data = await getQuestionsByYear(selectedYear);
            setQuestions(data);
            setLoading(false);
        };

        fetchQuestions();
    }, [selectedYear]); // Re-run effect when selectedYear changes

    // Create a list of years for the dropdown
    const years = [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];

    return (
        <Container>
            <Typography variant="h4" gutterBottom sx={{ mt: 4, mb: 4 }}>
                A/L Question Dashboard
            </Typography>

            <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel id="year-select-label">Select Year</InputLabel>
                <Select
                    labelId="year-select-label"
                    value={selectedYear}
                    label="Select Year"
                    onChange={(e) => setSelectedYear(e.target.value as number)}
                >
                    {years.map(year => (
                        <MenuItem key={year} value={year}>{year}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            {loading ? (
                <CircularProgress />
            ) : (
                <QuestionTable questions={questions} />
            )}
        </Container>
    );
};

export default Dashboard;