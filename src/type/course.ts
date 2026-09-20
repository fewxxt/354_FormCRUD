export type Course = {
  id: string | number;
  code: string;
  title?: string;
  name?: string;
  credit: number | string;
  instructor: string;
};