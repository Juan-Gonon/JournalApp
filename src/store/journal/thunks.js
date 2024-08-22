import { doc, setDoc } from 'firebase/firestore/lite'
import { firebaseDB } from '../../firebase/config'
import { newNoteFirestore } from '../../firebase/providers'
import { fileUpload, loadNotes } from '../../helpers'
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setSaving, updateNote } from './journalSlice'

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

export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving())
    const { uid } = getState().auth
    const { active: note } = getState().journal
    const noteToFireStore = { ...note }
    delete noteToFireStore.id

    const docRef = await doc(firebaseDB, `${uid}/journal/notes/${note.id}`)
    await setDoc(docRef, noteToFireStore, { merge: true })

    dispatch(updateNote(note))
  }
}

export const startUploadingFile = (file = []) => {
  return async (dispatch) => {
    dispatch(setSaving())
    await fileUpload(file[0])
  }
}
