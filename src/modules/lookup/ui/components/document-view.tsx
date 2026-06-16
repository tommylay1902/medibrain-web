"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowUpRightIcon, Loader2 } from "lucide-react"; // or any spinner component
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Response = {
  content: string;
  fid: string;
  title: string;
  keywords: string;
};

const DocumentView = () => {
  const params = useSearchParams();
  const [results, setResults] = useState<string[]>([]);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);

  const search = params.get("search")?.trim();

  useEffect(() => {
    if (!search || search === "" || search.length === 0) return;

    console.log("enter");

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setResults([]);
    setIsStreaming(true);

    const source = new EventSource(
      `${process.env.NEXT_PUBLIC_MEDIBRAIN_API_BASE_URL}/document/query?search=${search}`,
      {},
    );

    source.onmessage = (e) => {
      if (e.data === "[DONE]") {
        setIsStreaming(false);
        source.close();
        return;
      } else {
        setResults((prev) => [...prev, e.data]);
      }
    };
    source.onerror = () => {
      setIsStreaming(false);
      source.close();
    };

    return () => {
      setIsStreaming(false);
      setResults([]);
      source.close();
    };
  }, [search, params]);

  return (
    <div className="">
      <h3 className="mx-5 font-bold">Documents</h3>
      <ScrollArea className="mx-5 rounded-md h-84 border-black border">
        {isStreaming && results.length === 0 ? (
          <p className=" text-muted-foreground animate-pulse">Thinking...</p>
        ) : results.length === 0 ? (
          <h2 className="flex justify-center items-center font-bold">
            No documents found please try another search
          </h2>
        ) : (
          <div>
            {results.map((r: string, i: number) => (
              <span key={i} className="animate-fadein">
                {r}
              </span>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default DocumentView;
