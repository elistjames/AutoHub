export interface Filter {
  categoryFilter: string[],
  colorFilter: string[],
  priceRanges: {min: number, max: number}[],
  make: string,
  minYear: number,
  maxYear: number,
  minSeats: number,
  maxSeats: number,
}
