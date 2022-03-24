export interface Filter {
  categoryFilter: string,
  colorFilter: string[],
  priceRanges: {min: number, max: number}[],
  make: string,
  minYear: number,
  maxYear: number,
  seats: number,
}
