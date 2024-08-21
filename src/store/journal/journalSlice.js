import { createSlice } from '@reduxjs/toolkit'

export const journalSlice = createSlice({
  name: 'journalSlice',
  initialState: {
    isSaving: true,
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
    addNewEmptyNote: (state, action) => {

    },
    setActiveNote: (state, action) => {

    },
    setNotes: (state, action) => {

    },
    setSaving: (state) => {

    },
    updateNote: (state, action) => {

    },
    deleteNodeById: (state, action) => {

    }
  }
})

// Los creadores de acciones se generan para cada función reductora de casos
export const { addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, deleteNodeById } = journalSlice.actions
