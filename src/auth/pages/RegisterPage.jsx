import { Alert, Button, Grid, Link as LinkUI, TextField, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'
import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startCreatingUserWithEmailPassword } from '../../store/auth'

const formData = {
  email: '',
  password: '',
  displayName: ''
}

const formValidations = {
  email: [(value) => value.includes('@'), 'El email debe de tener una @'],
  password: [(value) => value.length >= 6, 'El password debe de tener más de 6 letras.'],
  displayName: [(value) => value.length >= 1, 'El nombre es obligatorio']
}

export function RegisterPage () {
  const { status, errorMessage } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [formSubmitted, setFormSubmitted] = useState(false)
  const { displayName, formState, email, password, onInputChange, isFormValid, displayNameValid, emailValid, passwordValid } = useForm(formData, formValidations)
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status])

  const onSubmitForm = (e) => {
    e.preventDefault()
    if (isFormValid) return
    setFormSubmitted(true)
    dispatch(startCreatingUserWithEmailPassword(formState))
  }

  return (
    <AuthLayout title='Crear cuenta'>
      {/* <h1>FormValid: {!isFormValid ? 'valido' : 'incorrecto'} </h1> */}
      <form onSubmit={onSubmitForm} className='animate__animated animate__fadeIn animate__faster'>
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
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
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
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
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
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
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
              <Button disabled={isCheckingAuthentication} type='submit' variant='contained' fullWidth>Crear cuenta</Button>
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
