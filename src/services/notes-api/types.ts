export type Note = {
  id: string,
  date: string,
  title: string,
  tags: string[], // tags id,
  content: any
}

export type PayloadNote = {
  startDate: string;
  endDate: string;
  tags: string[]; // tags id,
  title: string;
  content: string;
  page: number;
  limit: number;
}

export type ResponseNote = {
  data: Note[]
}