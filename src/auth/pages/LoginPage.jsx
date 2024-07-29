import { Google } from '@mui/icons-material'
import { Button, Grid, Link as LinkUI, TextField, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export function LoginPage () {
  return (
    <Grid
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justifyContent='center'
      sx={{
        minHeight: '100vh',
        backgroundColor: 'primary.main',
        padding: 4
      }}
    >
      <Grid
        item className='box-shadow' xs={3} sx={{
          backgroundColor: 'white',
          padding: 3,
          borderRadius: 2
        }}
      >
        <Typography variant='h5'>
          <form>
            <Grid container>
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
                  <Button variant='contained' fullWidth>Login</Button>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={6}
                >
                  <Button variant='contained' fullWidth>
                    <Google />
                    <Typography sx={{
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
        </Typography>

      </Grid>
    </Grid>
  )
}
