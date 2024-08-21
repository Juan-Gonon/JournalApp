import { newNoteFirestore } from '../../firebase/providers'

export const startNewNot = () => {
  return async (dispatch, getState) => {
    console.log('startNewNote')
    const { uid } = getState().auth
    // uid
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime()
    }

    newNoteFirestore({ uid, newNote })

    //! dispatch
  }
}
