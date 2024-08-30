import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import { ImageGallery } from '../components'
import { useForm } from '../../hooks'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useMemo, useRef } from 'react'
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFile } from '../../store/journal'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'

export function NoteView () {
  const dispatch = useDispatch()
  const { active: note, messageSaved, isSaving } = useSelector((state) => state.journal)
  const { body, title, date, onInputChange, formState } = useForm(note)
  const dateString = useMemo(() => {
    const newDate = new Date(date)
    return newDate.toUTCString()
  }, [date])

  useEffect(() => {
    dispatch(setActiveNote(formState))
  }, [dispatch, formState])

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire('Nota actualizada', messageSaved, 'success')
    }
  }, [messageSaved])

  const onSaveNote = () => {
    dispatch(startSaveNote())
  }

  const onFileInputChange = ({ target }) => {
    // console.log(e.target.files)
    if (target.files === 0) return
    dispatch(startUploadingFile(target.files))
    // console.log(target.files)
  }

  const fileInputRef = useRef()

  const onDelete = () => {
    dispatch(startDeletingNote())
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
        <input
          type='file' multiple onChange={onFileInputChange} style={{
            display: 'none'
          }}
          ref={fileInputRef}
        />
        <IconButton
          color='primary'
          disabled={isSaving}
          onClick={() => fileInputRef.current.click()}
        >
          <UploadOutlined />
        </IconButton>
        <Button disabled={isSaving} onClick={onSaveNote} color='primary' sx={{ padding: 2 }}>
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
        <Grid container justifyContent='end'>
          <Button
            onClick={onDelete}
            sx={{
              mt: 2
            }}
            color='error'
          >
            <DeleteOutline />
          </Button>
        </Grid>
        {/* Image gallery */}
        {
          note?.imgURL && <ImageGallery images={note?.imgURL} />
        }

      </Grid>
    </Grid>
  )
}
