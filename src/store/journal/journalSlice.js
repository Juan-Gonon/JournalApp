import { createSlice } from '@reduxjs/toolkit'

export const journalSlice = createSlice({
  name: 'journalSlice',
  initialState: {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null
    // active: {
    //   id: 'ABC123',
    //   title: '',
    //   body: '',
    //   date: 12345678,
    //   imageUrls: []
    // }
  },
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true
    },
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload)
      state.isSaving = false
    },
    setActiveNote: (state, action) => {
      state.active = action.payload
    },
    setNotes: (state, action) => {
      state.notes = action.payload
      // action.payload.forEach((note) => {
      //   state.notes.push(note)
      // })
    },
    setSaving: (state) => {
      state.isSaving = true
    },
    updateNote: (state, action) => {
      state.isSaving = false
      state.notes = state.notes.map((note) => {
        if (note.id === action.payload.id) {
          return action.payload
        }
        return note
      })
    },
    deleteNodeById: (state, action) => {

    }
  }
})

// Los creadores de acciones se generan para cada función reductora de casos
export const { savingNewNote, addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, deleteNodeById } = journalSlice.actions
