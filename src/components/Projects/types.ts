export type ProjectDbRow = {
  id?: number;
  title: string;
  color_variant: string;
  is_billable: boolean;
  price_per_hour: number | null;
  user_id: string | undefined;
  inserted_at: Date;
};
