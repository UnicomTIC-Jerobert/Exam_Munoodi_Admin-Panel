// src/pages/SubjectDetailPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import type { SubjectDetails } from '../services/apiService';
import { getSubjectDetails } from '../services/apiService';
import {
    Container,
    Typography,
    Box,
    CircularProgress,
    Paper,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Divider,
} from '@mui/material';

import Grid from '@mui/material/Grid';
const SubjectDetailPage: React.FC = () => {
    // useParams hook from react-router-dom gets the ':subject' from the URL
    const { subject } = useParams<{ subject: string }>();

    const [details, setDetails] = useState<SubjectDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!subject) return;

        const fetchDetails = async () => {
            try {
                setLoading(true);
                const data = await getSubjectDetails(subject);
                setDetails(data);
                setError(null);
            } catch (err) {
                setError(`Failed to fetch details for ${subject}.`);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [subject]); // This effect re-runs whenever the 'subject' URL parameter changes

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error || !details) {
        return (
            <Typography color="error" align="center" sx={{ mt: 4 }}>
                {error || 'Subject details not found.'}
            </Typography>
        );
    }

    // Capitalize the first letter for display
    const subjectDisplayName = subject!.charAt(0).toUpperCase() + subject!.slice(1);

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                {subjectDisplayName}
            </Typography>

            <Grid container spacing={4}>
                {/* Column for Years */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper elevation={3}>
                        <Box sx={{ p: 2, backgroundColor: 'primary.main', color: 'primary.contrastText' }}>
                            <Typography variant="h6">View Questions by Year</Typography>
                        </Box>
                        <List>
                            {details.availableYears.map((year, index) => (
                                <React.Fragment key={year}>
                                    <ListItem disablePadding>
                                        <ListItemButton component={RouterLink} to={`/${subject}/year/${year}`}>
                                            <ListItemText primary={`Year ${year}`} />
                                        </ListItemButton>
                                    </ListItem>
                                    {index < details.availableYears.length - 1 && <Divider />}
                                </React.Fragment>
                            ))}
                        </List>
                    </Paper>
                </Grid>

                {/* Column for Topics */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper elevation={3}>
                        <Box sx={{ p: 2, backgroundColor: 'secondary.main', color: 'secondary.contrastText' }}>
                            <Typography variant="h6">View Questions by Main Topic</Typography>
                        </Box>
                        <List>
                            {details.mainTopics.map((topic, index) => (
                                <React.Fragment key={topic}>
                                    <ListItem disablePadding>
                                        <ListItemButton component={RouterLink} to={`/${subject}/topic/${topic.toLowerCase()}`}>
                                            <ListItemText primary={topic} />
                                        </ListItemButton>
                                    </ListItem>
                                    {index < details.mainTopics.length - 1 && <Divider />}
                                </React.Fragment>
                            ))}
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default SubjectDetailPage;