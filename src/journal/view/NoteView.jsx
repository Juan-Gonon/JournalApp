import { SaveOutlined } from '@mui/icons-material'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { ImageGallery } from '../components'
import { useForm } from '../../hooks'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useMemo } from 'react'
import { setActiveNote } from '../../store/journal'

export function NoteView () {
  const dispatch = useDispatch()
  const { active: note } = useSelector((state) => state.journal)
  const { body, title, date, onInputChange, formState } = useForm(note)
  const dateString = useMemo(() => {
    const newDate = new Date(date)
    return newDate.toUTCString()
  }, [date])

  useEffect(() => {
    dispatch(setActiveNote(formState))
  }, [dispatch, formState])

  const onSaveNote = () => {

  }

  return (
    <Grid
      container
      direction='row'
      justifyContent='space-between'
      sx={{ mb: 1 }}
      alignItems='center'
      className='animate__animated animate__fadeIn animate__faster'
    >
      <Grid item>
        <Typography fontSize={30} fontWeight='light'>{dateString}</Typography>
      </Grid>
      <Grid item>
        <Button onClick={onSaveNote} color='primary' sx={{ padding: 2 }}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type='text'
          variant='filled'
          fullWidth
          placeholder='Ingrese un titulo'
          label='Título'
          sx={{ border: 'none', mb: 1 }}
          name='title'
          value={title}
          onChange={onInputChange}
        />

        <TextField
          type='text'
          variant='filled'
          fullWidth
          multiline
          placeholder='¿Qué sucedió el día de hor?'
          minRows={5}
          name='body'
          value={body}
          onChange={onInputChange}
        />

        {/* Image gallery */}
        <ImageGallery />

      </Grid>
    </Grid>
  )
}
