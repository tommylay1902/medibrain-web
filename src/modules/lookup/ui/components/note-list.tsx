import { NoteResponse } from "./note-view";
import TagList from "./tag-list";

const NoteList = ({ notes }: { notes: NoteResponse[] }) => {
  console.log(notes);
  return notes.map((note) => (
    <div key={note.id} className="p-3">
      <h1 className="font-bold">{note.title}</h1>
      <p>{note.content}</p>
      <TagList tags={note.tags} />
    </div>
  ));
};

export default NoteList;
