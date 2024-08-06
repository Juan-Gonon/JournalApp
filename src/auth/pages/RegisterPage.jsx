import { Button, Grid, Link as LinkUI, TextField, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'

const formData = {
  email: 'juan@gmail.com',
  password: '123456',
  displayName: 'Juan'
}

export function RegisterPage () {
  const { displayName, formState, email, password, onInputChange } = useForm(formData)

  const onSubmitForm = (e) => {
    e.preventDefault()

    console.log(formState)
  }

  return (
    <AuthLayout title='Crear cuenta'>
      <form onSubmit={onSubmitForm}>
        <Grid container>
          <Grid
            item xs={12} sx={{
              marginTop: 2
            }}
          >
            <TextField
              label='Nombre completo'
              type='text'
              placeholder='nombre'
              fullWidth
              name='displayName'
              value={displayName}
              onChange={onInputChange}
            />
          </Grid>
          <Grid
            item xs={12} sx={{
              marginTop: 2
            }}
          >
            <TextField
              label='correo'
              type='email'
              placeholder='correo@google.com'
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
            />
          </Grid>
          <Grid
            item xs={12} sx={{
              marginTop: 2
            }}
          >
            <TextField
              label='password'
              type='password'
              placeholder='correo@google.com'
              fullWidth
              name='password'
              value={password}
              onChange={onInputChange}
            />
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
              <Button type='submit' variant='contained' fullWidth>Crear cuenta</Button>
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
