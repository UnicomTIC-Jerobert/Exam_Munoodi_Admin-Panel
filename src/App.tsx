// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import { CssBaseline, Container, Typography } from '@mui/material';
import SubjectsPage from './pages/SubjectsPage';
import SubjectDetailPage from './pages/SubjectDetailPage'; // <-- Import the new page
import QuestionsByYearPage from './pages/QuestionsByYearPage';   // <-- Import
import QuestionsByTopicPage from './pages/QuestionsByTopicPage'; // <-- Import

// Placeholder components for future pages

function App() {
  return (
    <>
      <CssBaseline /> {/* MUI's CSS reset */}
      <Container maxWidth="lg">
        <Typography variant="h3" component="h1" sx={{ my: 2, textAlign: 'center' }}>
          Exam Munoodi - Admin Panel
        </Typography>
        <Routes>
          <Route path="/" element={<SubjectsPage />} />
          <Route path="/:subject" element={<SubjectDetailPage />} />
          <Route path="/:subject/year/:year" element={<QuestionsByYearPage />} />
          <Route path="/:subject/topic/:mainTopic" element={<QuestionsByTopicPage />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;