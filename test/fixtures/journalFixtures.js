export const initialStateJournal = {
  isSaving: false,
  messageSaved: '',
  notes: [],
  active: null
}

export const demoNoteEmpty = {
  title: '',
  body: '',
  date: new Date().getTime()
}

export const listNotes = [
  {
    id: 'ABC123',
    title: 'Nota en test',
    body: 'Esto es una nota en test',
    date: new Date().getTime()
  },
  {
    id: 'DEF456',
    title: 'Nota en test 2',
    body: 'Esto es una nota en test',
    date: new Date().getTime()
  }
]
