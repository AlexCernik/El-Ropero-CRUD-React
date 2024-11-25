import * as React from 'react'
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import Divider from '@mui/material/Divider';

{/**Código extraido desde la página material.iu. Define la función Item para ser usada después dentro de las
  Grid. */}
{/**No debe sacarse a menos que se tengo otro código para Item que cumpla su misma función. */ }
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));



{/*Funcón que extrae información en las Item de la Grid desde la API */ }
const Product = () => {
  const [state, setState] = useState();
  let { id } = useParams();

  useEffect(() => { getProduct() }, []);

  {/*Códiog que realizar una conexión a la API de la página para extraer los datos de un producto seleccionado*/ }
  const getProduct = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/product/${id}/`);
      {/*Los datos se extraen por medio del id del producto seleccionado por el usuario desde la Card del Index. */ }
      setState(data);
    } catch {
      toast.error('Eror al iniciar sesión')
    }
  }

  const add_to_cart = async (product_id) => {
    try {
      const token = localStorage.getItem('@token');
      await axios.post(`${process.env.REACT_APP_API_URL}/cart/add-item/`, { product_id: product_id, quantity: 1 }, { headers: { 'Authorization': `Token ${token}` } });
      alert('Agregado al carrito.')
    } catch (e) {
      console.log(e.response.data)
    }
  };

  if (!state) return <Loader />
  return (
    <Box sx={{
      flexGrow: 1,
      width: '70%',
      backgroundColor: '#ffffff',
      margin: '5px auto',
      borderRadius: '5px',
      mt: 3,
      mb: 2
    }}>
      <Grid container spacing={0}>
        <Grid item xs={6} md={6}> {/*Muestra la imagen del producto en la Grid*/}
          <Item sx={{ backgroundColor: '#ffffff ', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: 'none' }}>
            <Card style={{ height: '360px', boxShadow: 'none', borderRadius: '5px' }}>
              <CardMedia
                loading='lazy'
                component='img'
                image={state.image}
                alt={state.name}
              />
            </Card>
          </Item>
        </Grid>
        <Grid item xs={6} md={6}>
          {/*Sección de la Grid que muestra los datos de 'name', 'price', 'offer_price' del producto*/}
          <Item sx={{ backgroundColor: '#ffffff', display: 'flex', justifyContent: 'left', alignItems: 'left', witdh: '100%', boxShadow: 'none' }}>
            <Stack>
              <CardContent style={{ padding: 8, height: '100%' }}>
                <Typography variant="body2" component="div" fontSize={30}>
                  {state.name}
                </Typography>
                <br />
                {!!state.offer_price ?
                  <>
                    <Stack direction='row' spacing={.5} alignItems='center'>
                      <Typography variant='caption' style={{ textDecoration: 'line-through' }}>
                        {parseFloat(state.offer_price).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
                      </Typography>
                      <Typography fontSize={14} color='#00b100' fontWeight={500}>
                        {parseFloat((((state.price - state.offer_price) / state.price) * 100).toFixed(0))}% OFF
                      </Typography>
                    </Stack>
                    <Typography fontSize={20} lineHeight={1.25} fontWeight={500}>
                      {parseFloat(state.offer_price).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
                    </Typography>
                  </>
                  :
                  <Typography fontSize={20} lineHeight={1.25} fontWeight={500}>
                    {parseFloat(state.price).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
                  </Typography>
                }
                <Typography fontSize={14}>
                  {state.stock} disponibles
                </Typography>
                <br />
                {/*Sección de la Grid que muestra los botones de compra y carrito.*/}
              </CardContent>
              <CardActions>
                <Button onClick={() => add_to_cart(state.id)} size="large" variant='contained'>
                  Agregar al Carrito
                </Button>
              </CardActions>
            </Stack>
          </Item>
        </Grid>
      </Grid>
      <Divider style={{ marginInline: 15, marginBlock: 15 }} />
      <Typography variant="h2" fontWeight='bold' component="div" fontSize={20} ml='15px'>
        Descipción
      </Typography>
      <Typography variant="body2" component="div" fontSize={16} ml='20px' mt='10px'>
        {state.description}
      </Typography>
    </Box>
  );
};





export default Product;