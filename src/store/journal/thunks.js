import { newNoteFirestore } from '../../firebase/providers'

export const startNewNote = () => {
  return async (dispatch, getState) => {
    console.log('startNewNote')
    const { uid } = getState().auth
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
  }
}
