import { beforeEach, describe, expect, it, vi } from 'vitest'
import { startNewNote } from '../../../src/store/journal/thunks'
import { addNewEmptyNote, savingNewNote, setActiveNote } from '../../../src/store/journal/journalSlice'
import { collection, deleteDoc, getDocs } from 'firebase/firestore/lite'
import { firebaseDB } from '../../../src/firebase/config'

describe('Pruebas en Journal Thunks', () => {
  const dispatch = vi.fn()
  const getState = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })
  it('startNewNote debe de crear uan nueva nota en blanco', async () => {
    const uid = 'TEST-UID'
    getState.mockReturnValue({
      auth: {
        uid
      }
    })
    await startNewNote()(dispatch, getState)

    expect(dispatch).toHaveBeenCalledWith(savingNewNote())
    expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote({
      body: '',
      title: '',
      id: expect.any(String),
      date: expect.any(Number)
    }))
    expect(dispatch).toHaveBeenCalledWith(setActiveNote({
      body: '',
      title: '',
      id: expect.any(String),
      date: expect.any(Number)
    }))

    // Borrar de firebase
    const collectionRef = collection(firebaseDB, `${uid}/journal/notes`)
    const docs = await getDocs(collectionRef)
    const deletePromises = []

    docs.forEach((doc) => {
      deletePromises.push(deleteDoc(doc.ref))
    })

    await Promise.all(deletePromises)
  })
})
