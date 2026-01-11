export type EventResponse = {
  id: string;
  title: string;
  description: string;
  publico: string;
  date: string; 
  latitude: string;
  longitude: string;
  userId: string;
  user?: {
    name: string;
  };
};

export type EventRequest = {
  title: string;
  description: string;
  publico: string;
  date: string; // ISO string
  latitude: string;
  longitude: string;
};
