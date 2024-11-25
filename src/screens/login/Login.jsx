import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, TextField, Grid, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { toast,} from 'react-toastify';
import { setProfile } from '../../redux/main';

const Login = () => {
  const dispatch = useDispatch();

  const { control, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/signin/`, data);
      localStorage.setItem('@token', res.data.token);
      dispatch(setProfile(res.data));
      toast.success('Inicio de sesión exitoso');
    } catch (e) {
      if (e.response && e.response.status === 401) {
        setError('email', { type: 'manual', message: 'Usuario o contraseña incorrectos' });
        setError('password', { type: 'manual', message: 'Usuario o contraseña incorrectos' });
        toast.error('Usuario o contraseña incorrectos');
      } else if (e.response && e.response.data) {
        const errorData = e.response.data;
        if (errorData.email) {
          setError('email', { type: 'manual', message: errorData.email });
        }
        if (errorData.password) {
          setError('password', { type: 'manual', message: errorData.password });
        }
        toast.error('Error al iniciar sesión');
      } else {
        toast.error('Error inesperado. Por favor, intenta de nuevo.');
      }
    }
  };

  return (
    <>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <div className="register-form">
            <Typography variant="h4">Iniciar sesión</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="email"
                control={control}
                rules={{ required: 'Correo electrónico es requerido' }}
                render={({ field }) => (
                  <TextField
                    label="Correo electrónico"
                    {...field}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    fullWidth
                    margin="normal"
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                rules={{ required: 'Contraseña es requerida' }}
                render={({ field }) => (
                  <TextField
                    label="Contraseña"
                    type="password"
                    {...field}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    fullWidth
                    margin="normal"
                  />
                )}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                fullWidth
              >
                {isSubmitting ? 'Iniciando sesión' : 'Iniciar sesión'}
              </Button>
            </form>
              <div className="register-link">
                <a href="/signup">¿No tienes una cuenta? Regístrate</a>
              </div>
              <div className="register-link">
                <a href="/send-reset-password">¿Has olvidado tu contraseña?</a>
              </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
