import { MultipleRepoRuns } from "../../models/MultipleRepoRuns"

interface IProps {
  data: MultipleRepoRuns
}

export default function AllRepoRunResults({ data }: IProps) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '1rem' }}>
            {data.workflowRuns.map(run => {
            const totalFindings = run.scans.reduce((acc, scan) => acc + scan.findings.length, 0)
            const date = run.timestamp.toLocaleString()
            return (
                <div
                key={run.id}
                onClick={() => console.log(`clicked ${run.repo}`)}
                style={{ background: 'var(--surface-2)', border: '0.5px solid var(--border)', borderRadius: '12px', padding: '1rem 1.5rem', cursor: 'pointer', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}
                >
                <div>
                    <div style={{ fontWeight: 500 }}>{run.repo}</div>
                    <div>
                    <span style={{ fontSize: '22px', fontWeight: 500 }}>{totalFindings}</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)', marginLeft: '4px' }}>{totalFindings == 1 ? 'finding' : 'findings'}</span>
                    </div>
                </div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Last run {date}</span>
                </div>
            )
            })}
        </div>
    )
}