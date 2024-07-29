import { Button, Grid, Link as LinkUI, TextField, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { AuthLayout } from '../layout/AuthLayout'

export function RegisterPage () {
  return (
    <AuthLayout title='Crear cuenta'>
      <form>
        <Grid container>
          <Grid
            item xs={12} sx={{
              marginTop: 2
            }}
          >
            <TextField label='Nombre completo' type='text' placeholder='nombre' fullWidth />
          </Grid>
          <Grid
            item xs={12} sx={{
              marginTop: 2
            }}
          >
            <TextField label='correo' type='email' placeholder='correo@google.com' fullWidth />
          </Grid>
          <Grid
            item xs={12} sx={{
              marginTop: 2
            }}
          >
            <TextField label='password' type='email' placeholder='correo@google.com' fullWidth />
          </Grid>

          <Grid
            container
            spacing={2}
            sx={{
              marginBottom: 2,
              marginTop: 1
            }}
          >
            <Grid
              item
              xs={12}
              sm={6}
            >
              <Button variant='contained' fullWidth>Crear cuenta</Button>
            </Grid>

          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{ marginRight: 1 }}>¿Ya tienes una cuenta?</Typography>
            <LinkUI component={Link} color='inherit' to='/auth/login'>
              Ingresar
            </LinkUI>

          </Grid>

        </Grid>
      </form>

    </AuthLayout>

  )
}
