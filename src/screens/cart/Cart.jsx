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
  Link,
} from '@mui/material';
import { Delete, Add, Remove } from '@mui/icons-material';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader';

const Cart = () => {
  const [state, setState] = useState();
  const address = useSelector((state) => state.address);

  useEffect(() => {
    getCart();
  }, []);

  const getCart = async () => {
    try {
      const token = localStorage.getItem('@token');
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/cart/items/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setState(data);
    } catch (e) {
      console.log(e.response.data);
    }
  };

  const remove_item_cart = async (product_id) => {
    try {
      const token = localStorage.getItem('@token');
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/cart/remove-item/`,
        { product_id },
        { headers: { Authorization: `Token ${token}` } }
      );
      setState(data);
    } catch (e) {
      console.log(e.response.data);
    }
  };

  const update_quantity = async (product_id, path) => {
    try {
      const token = localStorage.getItem('@token');
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/cart/${path}-item/`,
        { product_id },
        { headers: { Authorization: `Token ${token}` } }
      );
      setState(data);
    } catch (e) {
      console.log(e.response.data);
    }
  };

  if (!state) return <Loader />;

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 4,
        mb: 4,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Tu Carrito
      </Typography>

      {/* Verificamos si hay dirección registrada */}
      {!address ? (
        <Box mt={2} p={2} border="1px solid #ddd" borderRadius={2}>
          <Typography variant="body1" gutterBottom>
            No tienes una dirección registrada. Por favor, agrega una antes de proceder.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            href="/address"
          >
            Agregar Dirección
          </Button>
        </Box>
      ) : (
        <Typography variant="body1" gutterBottom>
          Dirección de entrega: {address.street} {address.number}, {address.city}, {address.province}
        </Typography>
      )}

      {/* Mostramos el carrito */}
      {state.items.length === 0 ? (
        <Typography>No hay productos en tu carrito.</Typography>
      ) : (
        <>
          <List>
            {state.items.map((item) => (
              <ListItem key={item.product.id}>
                <Box display="flex" alignItems="center" width="100%">
                  {/* Imagen del producto */}
                  <Box mr={2} width={64} height={64}>
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '8px',
                      }}
                    />
                  </Box>

                  {/* Información del producto */}
                  <Typography variant="body1" flex={1}>
                    {item.product.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    ${item.product.price} {/* Mostrar el precio individual */}
                  </Typography>

                  {/* Controles de cantidad */}
                  <Box display="flex" alignItems="center">
                    <IconButton onClick={() => update_quantity(item.product.id, 'minus')}>
                      <Remove />
                    </IconButton>
                    <TextField
                      value={item.quantity}
                      size="small"
                      variant="outlined"
                      inputProps={{ readOnly: true }}
                      style={{ width: '40px', textAlign: 'center' }}
                    />
                    <IconButton onClick={() => update_quantity(item.product.id, 'sum')}>
                      <Add />
                    </IconButton>
                  </Box>

                  {/* Eliminar producto */}
                  <IconButton onClick={() => remove_item_cart(item.product.id)}>
                    <Delete />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>

          <Box mt={2} display="flex" justifyContent="space-between">
            <Typography variant="h6">
              Total: ${state.get_total_price?.final_price || 0}
            </Typography>
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
