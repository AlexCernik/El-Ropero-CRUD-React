import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Stack,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { MapPin, Search, ShoppingCart } from 'lucide-react';
import Drawer from './Drawer';
import ProductSearchBar from '../screens/productSearchBar/ProductSearchBar';
import 'react-multi-carousel/lib/styles.css';

const Header = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  return (
    <Box component='nav' py={2}>
      <Container maxWidth='lg' sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
        <Grid container spacing={{ xs: 0.5, sm: 1 }} justifyContent='space-between'>
          <Grid xs={10.5} sm={10.8} md={11.2} order={{ xs: 2, sm: 3 }}>
            <Stack spacing={{ xs: 1, sm: 2 }} width='100%' direction='row'>
              <OutlinedInput
                id='search'
                size='small'
                style={{
                  width: '100%',
                  backgroundColor: '#e6e6e6',
                }}
                endAdornment={
                  <InputAdornment position='end'>
                    <Search />
                  </InputAdornment>
                }
                placeholder='Buscar producto'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              <IconButton>
                <ShoppingCart color='#e6e6e6' />
              </IconButton>

              <Drawer />
            </Stack>

            {/* Mostrar ProductSearchBar solo si hay una consulta */}
            {query && (
              <ProductSearchBar
                query={query}
                onSearchResults={setSearchResults}
              />
            )}
          </Grid>

          <Grid order={{ xs: 3, sm: 3 }} xs={12}>
            <Stack spacing={{ xs: 0.5, sm: 1 }} mt={{ xs: 1, sm: 0 }} direction='row' alignItems='center'>
              <Stack spacing={{ xs: 0.5, sm: 1 }} direction='row' alignItems='center'>
                <MapPin color='#FFFFFF' />
                <Stack spacing={{ xs: 0.5, sm: 0 }} direction={{ xs: 'row', sm: 'column' }}>
                  <Typography opacity={0.6} color='#e6e6e6' fontSize={{ xs: 14, sm: 12 }}>Enviar a</Typography>
                  <Typography color='#fff' fontWeight={{ xs: 500, sm: 600 }} fontSize={14}>Pcia. Roque Sáenz, Chaco.</Typography>
                </Stack>
              </Stack>
            </Stack>
          </Grid>

          <Grid order={1} xs={1.5} sm={1} md={0.8}>
            <Typography color='#fff' fontSize={26} fontFamily='Timing'>ER</Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Header;
