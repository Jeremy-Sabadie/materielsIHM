export interface Contrat {
  id: number; // Correspond à `id` (clé primaire, entier auto-incrémenté)
  name: string | null; // Correspond à `name` (VARCHAR(255), peut être NULL)
  startDate: string | null; // Correspond à `start_date` (DATE, peut être NULL)
  endDate: string | null; // Correspond à `end_date` (DATE, peut être NULL)
}
