"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { use } from "react";
import NoteList from "./note-list";

export interface NoteResponse {
  id: string;
  title: string;
  content: string;
  creation_date: string;
  tags: string[];
}

const NoteView = ({ loadNotes }: { loadNotes: Promise<NoteResponse[]> }) => {
  const notes: NoteResponse[] = use(loadNotes);

  return (
    <div className="flex flex-col flex-1">
      <h3 className="mx-5 font-bold text-center">Notes</h3>
      <ScrollArea className="mx-5 rounded-md h-45 border-black border">
        {notes && notes.length > 0 ? (
          <NoteList notes={notes} />
        ) : (
          <h2 className="flex justify-center justify-items-center items-center font-bold">
            No Notes Found
          </h2>
        )}
      </ScrollArea>
    </div>
  );
};

export default NoteView;
