import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  IconButton,
  Button,
  List,
  ListItem,
  TextField,
} from '@mui/material';
import { Delete, Add, Remove } from '@mui/icons-material';
import axios from 'axios';
import Loader from '../../components/Loader'

const Cart = () => {
  const [state, setState] = useState();

  useEffect(() => { getCart() }, []);

  const getCart = async () => {
    try {
      const token = localStorage.getItem('@token');
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/cart/items/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setState(data);
      console.log(data)
    } catch (e) {
      console.log(e.response.data)
    }
  }

  const remove_item_cart = async (product_id) => {
    try {
      const token = localStorage.getItem('@token');
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/cart/remove-item/`, { product_id: product_id }, { headers: { 'Authorization': `Token ${token}` } });
      setState(data);
    } catch (e) {
      console.log(e.response.data)
    }
  };

  const umpdate_quantity = async (product_id, path) => {
    try {
      const token = localStorage.getItem('@token');
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/cart/${path}-item/`, { product_id: product_id }, { headers: { 'Authorization': `Token ${token}` } });
      setState(data);
    } catch (e) {
      console.log(e.response.data)
    };
  }

  if (!state) return <Loader />
  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>Tu Carrito</Typography>

      {state.items.length === 0 ? (
        <Typography>No hay productos en tu carrito.</Typography>
      ) : (
        <>
          <List>
            {state.items.map((item) => (
              <ListItem key={item.product.id}>
                <Box display="flex" alignItems="center" width="100%">
                  <Typography variant="body1" flex={1}>{item.product.name}</Typography>
                  <Typography variant="body2" color="textSecondary">${item.price}</Typography>

                  <Box display="flex" alignItems="center">
                    <IconButton onClick={() => umpdate_quantity(item.product.id, 'minus')}>
                      <Remove />
                    </IconButton>
                    <TextField
                      value={item.quantity}
                      size="small"
                      variant="outlined"
                      inputProps={{ readOnly: true }}
                      style={{ width: '40px', textAlign: 'center' }}
                    />
                    <IconButton onClick={() => umpdate_quantity(item.product.id, 'sum')}>
                      <Add />
                    </IconButton>
                  </Box>

                  <IconButton onClick={() => remove_item_cart(item.product.id)}>
                    <Delete />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>

          <Box mt={2} display="flex" justifyContent="space-between">
            <Typography variant="h6">Total: ${state.final_price}</Typography>
            <Button variant="contained" color="primary" onClick={() => console.log('Ir a Pagar')}>
              Proceder a la Compra
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default Cart;
