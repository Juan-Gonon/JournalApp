import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Google } from '@mui/icons-material'
import { Alert, Button, Grid, Link as LinkUI, TextField, Typography } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'
import { startGoogleSingIn, startLoginWithEmailPassword } from '../../store'
import { useMemo } from 'react'

const formData = {
  email: '',
  password: ''
}

export function LoginPage () {
  const dispatch = useDispatch()
  const { status, errorMessage } = useSelector((state) => state.auth)
  const { email, password, onInputChange } = useForm(formData)

  const isAuthentication = useMemo(() => status === 'checking', [status])

  const onSubmitForm = (e) => {
    e.preventDefault()
    dispatch(startLoginWithEmailPassword({ email, password }))
  }

  const onGoogleSingIn = () => {
    // console.log('onGoogleSingIn')
    dispatch(startGoogleSingIn())
  }

  return (
    <AuthLayout title='Login'>
      <form onSubmit={onSubmitForm} className='animate__animated animate__fadeIn animate__faster'>
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
              display={errorMessage ? '' : 'none'}
            >
              <Alert severity='error'>
                {
                  errorMessage
                }
              </Alert>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
            >
              <Button disabled={isAuthentication} type='submit' variant='contained' fullWidth>Login</Button>
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
            >
              <Button variant='contained' fullWidth onClick={onGoogleSingIn} disabled={isAuthentication}>
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
