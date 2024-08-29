import { describe, expect, it } from 'vitest'
import { addNewEmptyNote, journalSlice, savingNewNote, setActiveNote, setNotes, setSaving, updateNote } from '../../../src/store/journal/journalSlice'
import { demoNoteEmpty, initialStateJournal, listNotes } from '../../fixtures/journalFixtures'

describe('JournalSlice', () => {
  it('debe de ser el journalSlice', () => {
    expect(journalSlice.name).toBe('journalSlice')
  })

  it('debe de tener un estado inicial igual a initialState', () => {
    const state = journalSlice.reducer(initialStateJournal, {})
    expect(state).toEqual(initialStateJournal)
  })

  it('debe de estar guardando una nueva nota', () => {
    const state = journalSlice.reducer(initialStateJournal, savingNewNote())

    expect(state).toEqual(
      {
        ...initialStateJournal,
        isSaving: true
      }
    )
  })

  it('debe de agregar una nota vacía', () => {
    const state = journalSlice.reducer(initialStateJournal, addNewEmptyNote(demoNoteEmpty))
    expect(state).toEqual({
      ...initialStateJournal,
      notes: [{ ...demoNoteEmpty }]
    })
  })

  it('debe de estar la nota activa', () => {
    const state = journalSlice.reducer(initialStateJournal, setActiveNote({
      ...demoNoteEmpty,
      id: 'ABC123'
    }))

    expect(state).toEqual({
      ...initialStateJournal,
      active: {
        ...demoNoteEmpty,
        id: 'ABC123'
      }
    })
  })

  it('debe de guardar una nota', () => {
    const state = journalSlice.reducer(initialStateJournal, setNotes(listNotes))

    expect(state).toEqual({
      ...initialStateJournal,
      notes: [...listNotes]
    })
  })

  it('debe de estar guardado la nota', () => {
    const state = journalSlice.reducer(initialStateJournal, setSaving())

    expect(state).toEqual({
      ...initialStateJournal,
      isSaving: true
    })
  })

  it('debe de actualizar la nota', () => {
    const stateInitial = {
      ...initialStateJournal,
      notes: [...listNotes]
    }
    const updateNoteInList = {
      id: 'ABC123',
      title: 'Nota en test, update test',
      body: 'Esto es una nota en test actualizado',
      date: new Date().getTime()
    }

    const newNotes = [
      updateNoteInList,
      listNotes[1]
    ]
    const state = journalSlice.reducer(stateInitial, updateNote(updateNoteInList))

    expect(state).toEqual({
      ...stateInitial,
      notes: newNotes,
      messageSaved: 'Nota en test, update test, actualizada correctamente'
    })
  })
})
