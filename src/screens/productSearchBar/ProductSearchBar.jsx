// ProductSearchBar.js
import React, { useState, useEffect } from 'react';
import { TextField, List, ListItem, Typography } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProductSearchBar = ({ onSearchResults }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query === '') {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/products`, {
          params: { search: query },
        });
        setResults(response.data);
        onSearchResults(response.data); // Enviar los resultados al componente principal
      } catch (error) {
        toast.error('Error al buscar productos');
      } finally {
        setLoading(false);
      }
    };

    // Usar un temporizador para retrasar la búsqueda mientras el usuario escribe
    const timeoutId = setTimeout(fetchResults, 500);

    // Limpiar el temporizador cuando el componente se desmonte o la consulta cambie
    return () => clearTimeout(timeoutId);
  }, [query, onSearchResults]);

  return (
    <div className="product-search-bar">
      <TextField
        label="Buscar productos"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        fullWidth
        margin="normal"
      />
      {loading ? (
        <Typography>Buscando...</Typography>
      ) : (
        <List>
          {results.map((product, index) => (
            <ListItem key={index}>
              <Typography variant="body1">{product.name}</Typography>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default ProductSearchBar;
