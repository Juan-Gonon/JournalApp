import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth'
import { FirebaseAuth, firebaseDB } from './config'
import { collection, doc, setDoc } from 'firebase/firestore/lite'

const googleProvider = new GoogleAuthProvider()

export const singInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider)
    // const credentials = GoogleAuthProvider.credentialFromResult(result)

    const { displayName, email, photoURL, uid } = result.user

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid
    }
  } catch (error) {
    // console.log(error)
    // const errorCode = error.errorCode
    const errorMessage = error.message

    return {
      ok: false,
      errorMessage
    }
  }
}

export const registerUserEmailPassword = async ({ email, password, displayName }) => {
  try {
    const res = await createUserWithEmailAndPassword(FirebaseAuth, email, password)

    const { uid, photoURL } = res.user
    // console.log(res)
    // usuario actual FirebaseAuth.currentUser
    console.log(FirebaseAuth.currentUser)
    await updateProfile(FirebaseAuth.currentUser, { displayName })

    return {
      ok: true,
      uid,
      photoURL,
      displayName,
      email
    }
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message
    }
  }
}

export const loginWithEmailPassword = async ({ email, password }) => {
  try {
    const res = await signInWithEmailAndPassword(FirebaseAuth, email, password)

    const { uid, displayName, photoURL } = res.user

    return {
      ok: true,
      uid,
      displayName,
      photoURL
    }
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message
    }
  }
}

export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut()
}

export const newNoteFirestore = async ({ uid, newNote }) => {
  try {
    const newDoc = await doc(collection(firebaseDB, `${uid}/journal/notes`))
    const setDocResp = await setDoc(newDoc, newNote)

    if (setDocResp) throw new Error('Error add note firestore')

    // console.log({
    //   newDoc,
    //   setDocResp
    // })

    return true
  } catch (error) {
    return false
  }
}
