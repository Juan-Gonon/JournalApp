import { JournalLayout } from '../layout/JournalLayout'
import { NoteView, NothingSelectedView } from '../view'

export function JournalPage () {
  return (
    <JournalLayout>

      {/* <NothingSelectedView /> */}
      <NoteView />
    </JournalLayout>
  )
}
