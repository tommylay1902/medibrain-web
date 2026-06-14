import { Badge } from "@/components/ui/badge";

const TagList = ({ tags }: { tags: string[] }) => {
  return (
    <div className="flex gap-x-2">
      {tags.map((tag) => (
        <Badge key={tag}>{tag}</Badge>
      ))}
    </div>
  );
};

export default TagList;
