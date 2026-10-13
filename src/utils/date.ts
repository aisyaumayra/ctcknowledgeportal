const displayDateFormatter = new Intl.DateTimeFormat('en', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

export function formatDisplayDate(date: string) {
  return displayDateFormatter.format(new Date(`${date}T00:00:00`))
}
