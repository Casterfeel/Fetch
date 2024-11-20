import React, { useEffect, useState } from 'react';
import { TextField, CircularProgress, Box, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

function ComboBox() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setAuthors(data);
      } catch (error) {
        console.error('Ошибка в получении данных:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: 300,
        margin: 'auto',
        marginTop: '50px',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: 3,
        backgroundColor: '#f5f5f5'
      }}
    >
      <Typography variant="h6" gutterBottom textAlign="center">
        Выберите автора
      </Typography>
      <Autocomplete
        options={authors}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Authors"
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              },
            }}
          />
        )}
        sx={{
          '& .MuiAutocomplete-popupIndicator': {
            color: '#1976d2', 
          },
          '& .MuiAutocomplete-listbox': {
            maxHeight: '200px', 
            overflowY: 'auto',
          },
        }}
      />
    </Box>
  );
}

export default ComboBox;
