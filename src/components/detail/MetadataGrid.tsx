import type { ReactNode } from 'react'

export interface MetadataItem {
  label: string
  value: ReactNode
}

interface MetadataGridProps {
  items: MetadataItem[]
}

export function MetadataGrid({ items }: MetadataGridProps) {
  return (
    <dl className="metadata-grid">
      {items.map((item) => (
        <div key={item.label}>
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}
