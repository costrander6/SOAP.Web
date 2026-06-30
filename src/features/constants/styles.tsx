export const badgeStyle: Record<string, React.CSSProperties> = {
  CRITICAL:      { background: 'var(--badge-critical-bg)', color: 'var(--badge-critical-text)' },
  HIGH:          { background: 'var(--badge-high-bg)',     color: 'var(--badge-high-text)' },
  MEDIUM:        { background: 'var(--badge-medium-bg)',   color: 'var(--badge-medium-text)' },
  LOW:           { background: 'var(--badge-low-bg)',      color: 'var(--badge-low-text)' },
  UNCATEGORIZED: { background: 'var(--surface-1)', color: 'var(--text-secondary)', border: '0.5px solid var(--border-strong)' },
}

export const pillBase: React.CSSProperties = {
    display: 'inline-flex', fontSize: '11px', fontWeight: 500,
    padding: '2px 8px', borderRadius: '20px', whiteSpace: 'nowrap',
}