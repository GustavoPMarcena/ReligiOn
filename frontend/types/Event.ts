export type EventResponse = {
  id: string;
  title: string;
  description: string;
  publico: string;
  date: string; 
  latitude: string;
  longitude: number;
  userId: number;
  user?: {
    name: string;
  };
};

export type EventRequest = {
  title: string;
  description: string;
  publico: string;
  date: string; 
  latitude: number;
  longitude: number;
};
