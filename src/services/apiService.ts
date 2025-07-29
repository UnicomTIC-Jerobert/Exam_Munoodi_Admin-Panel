import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001'; // Our backend API

// Define the structure of a Question object for TypeScript
export interface Question {
    subject: string;
    'year#questionNum': string;
    year: number;
    questionNum: number;
    mainTopic: string;
    subTopic: string;
    complexity: number;
    questionText?: string; // Optional for now
    options?: string[];   // Optional for now
    correctOptionIndex: number;
}

// Function to fetch questions by year
export const getQuestionsByYear = async (year: number): Promise<Question[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/questions/year/${year}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching questions for year ${year}:`, error);
        return []; // Return an empty array on error
    }
};