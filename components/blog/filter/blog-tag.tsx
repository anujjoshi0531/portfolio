import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { useMultiSelect } from "@/components/blog/hooks/useMultiSelect";

interface BlogFiltertagProps {
  value: string;
  tags: string[];
  onChange: (value: string) => void;
}

export const BlogFiltertag: React.FC<BlogFiltertagProps> = ({
  value,
  tags,
  onChange,
}) => {
  const { selection, toggleSelection } = useMultiSelect({
    value,
    logic: "and",
    onChange,
  });

  return (
    <div className="space-y-2">
      <Label className="text-muted-foreground">Tags</Label>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge
            key={tag}
            onClick={() => toggleSelection(tag)}
            variant={ selection.includes(tag) ? "default" : "outline" }>
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
};