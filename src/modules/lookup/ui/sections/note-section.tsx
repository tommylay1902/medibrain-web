import { Suspense } from "react";
import NoteView, { NoteResponse } from "../components/note-view";

const NoteSection = async () => {
  const loadNotes = fetch(
    `${process.env.NEXT_PUBLIC_MEDIBRAIN_API_BASE_URL}/note`,
  ).then((res) => res.json());

  return (
    <Suspense>
      <NoteSectionSuspense loadNotes={loadNotes} />
    </Suspense>
  );
};

const NoteSectionSuspense = async ({
  loadNotes,
}: {
  loadNotes: Promise<NoteResponse[]>;
}) => {
  return <NoteView loadNotes={loadNotes} />;
};

export default NoteSection;
