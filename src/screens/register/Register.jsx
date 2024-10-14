import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, TextField, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; 

const Register = () => {
  const [registered, setRegistered] = useState();
  const navigate = useNavigate(); 

  const { control, handleSubmit, formState: { errors, isSubmitting }, getValues, setError } = useForm({
    defaultValues: {
      email: '',
      first_name: '',
      last_name: '',
      password: '',
      repeat_password: ''
    }
  });

  const onSubmit = async (data) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/signup/`, data);
      setRegistered(true);
      toast.success('Registro exitoso. Se ha enviado un correo de verificación.');

      
    } catch (e) {
      if (e?.response?.data) {
        let error = [];

        if (e.response.data.email) {
          error.push({
            field: 'email',
            message: e.response.data.email
          });
        }

        if (e.response.data.password) {
          error.push({
            field: 'password',
            message: e.response.data.password
          },
            {
              field: 'repeat_password',
              message: e.response.data.password
            });
        }

        if (error.length > 0) {
          error.forEach(({ field, message }) =>
            toast.error(message)
          );
          return;
        }
      }
    }
  };

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={12}>
        <div className="register-form">
          {
            registered ? (
              <Typography variant="h4">
                Se ha enviado un correo de verificación para que verifiques tu cuenta.
              </Typography>
            ) : (
              <>
                <Typography variant="h4">Registrarse</Typography>
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
                  <Grid container spacing={{ xs: 0, sm: 2 }}>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="first_name"
                        control={control}
                        rules={{
                          required: 'Nombre es requerido',
                          pattern: {
                            value: /^[a-zA-ZÀ-ÿ\s]*$/,
                            message: 'El nombre no puede contener números ni caracteres especiales'
                          }
                        }}
                        render={({ field }) => (
                          <TextField
                            label="Nombre"
                            {...field}
                            error={!!errors.first_name}
                            helperText={errors.first_name?.message}
                            fullWidth
                            margin="normal"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="last_name"
                        control={control}
                        rules={{
                          required: 'Apellido es requerido',
                          pattern: {
                            value: /^[a-zA-ZÀ-ÿ\s]*$/,
                            message: 'El apellido no puede contener números ni caracteres especiales'
                          }
                        }}
                        render={({ field }) => (
                          <TextField
                            label="Apellido"
                            {...field}
                            error={!!errors.last_name}
                            helperText={errors.last_name?.message}
                            fullWidth
                            margin="normal"
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
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
                  <Controller
                    name="repeat_password"
                    control={control}
                    rules={{
                      required: 'Repetir contraseña es requerido',
                      validate: value => value === getValues('password') || 'Las contraseñas no coinciden'
                    }}
                    render={({ field }) => (
                      <TextField
                        label="Repetir contraseña"
                        type="password"
                        {...field}
                        error={!!errors.repeat_password}
                        helperText={errors.repeat_password?.message}
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
                    {isSubmitting ? 'Registrando' : 'Registrarse'}
                  </Button>
                </form>
              </>
            )
          }
          <div className="login-link">
            <a href="/signin">¿Ya tienes una cuenta? Inicia Sesión</a>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default Register;
