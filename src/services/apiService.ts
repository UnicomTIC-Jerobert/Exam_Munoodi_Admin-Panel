import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001'; // Our backend API

// Define the structure of a Question object for TypeScript
export interface Subject {
  id: string;
  name: string;
}

// src/services/api.ts
// ... (keep existing code, including Subject and Question interfaces)

// Define the type for the detailed response
export interface SubjectDetails {
  subjectName: string;
  availableYears: number[];
  mainTopics: string[];
}

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


export const getSubjects = async (): Promise<Subject[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/subjects`);
    return response.data;
  } catch (error) {
    console.error('Error fetching subjects:', error);
    return [];
  }
};

export const getSubjectDetails = async (subject: string): Promise<SubjectDetails> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/subjects/${subject}/details`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for subject ${subject}:`, error);
    // Re-throw the error to be caught by the component
    throw error;
  }
};

// Function to fetch questions by year
export const getQuestionsByYear = async (subject: string, year: number): Promise<Question[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/questions/${subject}/year/${year}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching questions for ${subject} year ${year}:`, error);
    throw error;
  }
};

// NEW: Fetches questions by topic
export const getQuestionsByTopic = async (subject: string, mainTopic: string): Promise<Question[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/questions/${subject}/topic/${mainTopic}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching questions for ${subject} topic ${mainTopic}:`, error);
    throw error;
  }
};