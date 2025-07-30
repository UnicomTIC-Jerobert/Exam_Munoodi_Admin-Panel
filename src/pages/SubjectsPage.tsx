// src/pages/DashboardPage.tsx
import React, { useEffect, useState } from 'react';
import type { Subject } from '../services/apiService';
import { getSubjects } from '../services/apiService'; // Assuming you add getSubjects to api.ts
import {
  Container,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  CircularProgress,
  Box
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Link as RouterLink } from 'react-router-dom';

const SubjectsPage: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setLoading(true);
        const data = await getSubjects();
        setSubjects(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch subjects. Is the API server running?');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" sx={{ mt: 4 }}>
        {error}
      </Typography>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Select a Subject
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {subjects.map((subject) => (
          <Grid key={subject.id} size={{ xs: 12, sm: 6, md: 5 }}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2" align="center">
                  {subject.name}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', mb: 1 }}>
                <Button
                  component={RouterLink}
                  to={`/${subject.id.toLowerCase()}`} // e.g., /physics
                  size="small"
                  variant="contained"
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SubjectsPage;