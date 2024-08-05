import { Google } from '@mui/icons-material'
import { Button, Grid, Link as LinkUI, TextField, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'

export function LoginPage () {
  const { email, password, onInputChange } = useForm({
    email: 'juan@gmail.com',
    password: '123456'
  })

  const onSubmitForm = (e) => {
    e.preventDefault()

    console.log({ email, password })
  }

  const onGoogleSingIn = () => {
    console.log('onGoogleSingIn')
  }

  return (
    <AuthLayout title='Login'>
      <form onSubmit={onSubmitForm}>
        <Grid container>
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
              <Button type='submit' variant='contained' fullWidth>Login</Button>
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
            >
              <Button variant='contained' fullWidth onClick={onGoogleSingIn}>
                <Google />
                <Typography
                  variant='p' sx={{
                    marginLeft: 1
                  }}
                >Google
                </Typography>
              </Button>
            </Grid>

          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <LinkUI component={Link} color='inherit' to='/auth/register'>
              Crear una cuenta
            </LinkUI>

          </Grid>

        </Grid>
      </form>

    </AuthLayout>

  )
}
