import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface TestimonialProps {
  content: string;
  author: string;
  role: string;
  avatarUrl: string;
}

export function TestimonialCard({ content, author, role, avatarUrl }: TestimonialProps) {
  return (
    <Card className="bg-zinc-900/50 border-zinc-800">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <p className="text-zinc-400 italic">"{content}"</p>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={avatarUrl} alt={author} />
              <AvatarFallback>{author[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-white">{author}</p>
              <p className="text-sm text-zinc-400">{role}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}