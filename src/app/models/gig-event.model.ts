export interface GigEvent {
  readonly id: string;
  readonly isoDate: string;
  readonly dayNumber: string;
  readonly monthShort: string;
  readonly monthFull: string;
  readonly weekday: string;
  readonly dateDisplay: string;
  readonly time: string | null;
  readonly venue: string;
  readonly city: string;
  readonly note?: string;
}

export type VenueFilter =
  | 'ALL'
  | "Paddy's Point"
  | 'Saxo'
  | 'The Robins'
  | 'Puerta Falsa';
