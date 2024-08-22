import { deleteDoc, doc, setDoc } from 'firebase/firestore/lite'
import { firebaseDB } from '../../firebase/config'
import { newNoteFirestore } from '../../firebase/providers'
import { fileUpload, loadNotes } from '../../helpers'
import { addNewEmptyNote, deleteNodeById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from './journalSlice'

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

export const startUploadingFile = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving())
    // await fileUpload(files[0])

    const fileUploadPromises = []
    for (const file of files) {
      fileUploadPromises.push(fileUpload(file))
    }

    const photosUrl = await Promise.all(fileUploadPromises)

    dispatch(setPhotosToActiveNote(photosUrl))
  }
}

export const startDeletingNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState()
    const { active: note } = getState.journal

    const docRef = await doc(firebaseDB, `${uid}/journal/notes/${note.id}`)
    await deleteDoc(docRef)

    // dispatch(deleteNodeById(note.id))
  }
}
