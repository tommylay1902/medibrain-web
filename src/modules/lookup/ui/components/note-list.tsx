import { NoteResponse } from "./note-view";
import TagList from "./tag-list";

const NoteList = ({ notes }: { notes: NoteResponse[] }) => {
  console.log(notes);
  return notes.map((note) => (
    <div key={note.id} className="p-3">
      <div className="flex justify-between">
        <h1 className="font-bold">{note.title}</h1>
        {/* TODO: format the ugly looking date  */}
        <h3 className="font-semibold">{note.creation_date}</h3>
      </div>
      <p>{note.content}</p>
      <TagList tags={note.tags} />
    </div>
  ));
};

export default NoteList;
