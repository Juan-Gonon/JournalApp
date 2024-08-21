import { newNoteFirestore } from '../../firebase/providers'
import { loadNotes } from '../../helpers'
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes } from './journalSlice'

export const startNewNote = () => {
  return async (dispatch, getState) => {
    console.log('startNewNote')
    const { uid } = getState().auth
    dispatch(savingNewNote())
    // uid
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime()
    }

    const { ok, id } = await newNoteFirestore({ uid, newNote })
    if (!ok) return
    newNote.id = id

    //! dispatch
    dispatch(addNewEmptyNote(newNote))
    dispatch(setActiveNote(newNote))
  }
}

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth
    if (!uid) throw new Error('El UID del usuario no existe')

    const res = await loadNotes(uid)
    // console.log(res)
    dispatch(setNotes(res))
  }
}
