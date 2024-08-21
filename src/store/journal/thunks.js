import { collection, doc, setDoc } from 'firebase/firestore/lite'
import { firebaseDB } from '../../firebase/config'

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

    const newDoc = doc(collection(firebaseDB, `${uid}/journal/notes`))

    const setDocResp = await setDoc(newDoc, newNote)
    console.log({
      newDoc,
      setDocResp
    })

    //! dispatch
  }
}
