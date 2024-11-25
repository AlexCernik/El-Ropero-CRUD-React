import React, { useState, useEffect } from 'react';
import { List, ListItem, Typography, Box } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProductSearchBar = ({ query }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Si el query está vacío, limpiar los resultados
    if (!query) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/product/search/?q=${query}`);
        setResults(response.data);
      } catch (error) {
        toast.error('Error al buscar productos');
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchResults, 500);
    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <Box>
      {loading ? (
        <Typography>Buscando...</Typography>
      ) : (
        results.length > 0 ? (
          <List>
            {results.map((product, index) => (
              <ListItem key={index}>
                <Typography variant="body1">{product.name}</Typography>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No se encontraron productos.</Typography>
        )
      )}
    </Box>
  );
};

export default ProductSearchBar;
