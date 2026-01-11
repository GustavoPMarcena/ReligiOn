export type SermaoResponse = {
  id: string;
  title: string;
  content: string;
  date: string;
  mediaFile: string;
  userId: string;
  user?: {
    name: string;
  };
};