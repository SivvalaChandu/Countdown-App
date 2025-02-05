export type Event = {
  id: string;
  title: string;
  date: Date;
};

export type progressBar = {
  daysLeftYear: number;
  progress: number;
};

export type EventCardsProps = {
  events: Event[];
  deleteEvent: (id: string) => void;
  currentTime: Date;
};

export type EventCardProps = Event & {
  delete: (id: string) => void;
  currentTime: Date;
};

export type NewEventAddProps = {
  addEvent: (newEvent: Event) => void;
};
