export type ProjectDbRow = {
  id?: number;
  title: string;
  color_variant: string;
  is_billable: boolean;
  price_per_hour: number | null;
  user_id: string | undefined;
  inserted_at: Date;
};

export type ProjectDbRowSubset = Pick<
  ProjectDbRow,
  'title' | 'color_variant' | 'is_billable' | 'price_per_hour'
>;

export type TimeEntryDbRow = {
  id?: number | undefined;
  user_id: string | undefined;
  inserted_at: Date;
  start: Date;
  stop: Date | null;
  project_id: number | null;
  duration: number | null;
  is_billable: boolean;
  description: string | null;
};

export type TimeEntryDbRowSubset = Pick<
  TimeEntryDbRow,
  'start' | 'stop' | 'project_id' | 'duration' | 'description' | 'is_billable'
>;

export type QueryKey = 'projects' | 'active_time_entry' | 'username' | 'time_entries';

export type Row = ProjectDbRow | TimeEntryDbRow;
