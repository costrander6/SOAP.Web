import { useNavigate } from "react-router-dom"
import { Finding } from "../../models/Finding"
import { MultipleRepoRuns } from "../../models/MultipleRepoRuns"

interface IProps {
  data: MultipleRepoRuns
}

type FindingCount  = {
    critical: number
    high: number
    medium: number
    low: number
    uncategorized: number
}

function getFindingServerityCounts(findings: Finding[], findingCount: FindingCount): FindingCount {
    findings.forEach(finding => {
        switch (finding.severity) {
            case "CRITICAL": findingCount.critical++; break;
            case "HIGH": findingCount.high++; break;
            case "MEDIUM": findingCount.medium++; break;
            case "LOW": findingCount.low++; break;
            case "UNCATEGORIZED": findingCount.uncategorized++; break;
        }
    });

    return findingCount;
}

const badgeStyle: Record<string, React.CSSProperties> = {
  CRITICAL: { background: '#FCEBEB', color: '#A32D2D' },
  HIGH:     { background: '#FAEEDA', color: '#854F0B' },
  MEDIUM:   { background: '#E6F1FB', color: '#185FA5' },
  LOW:      { background: '#EAF3DE', color: '#3B6D11' },
  UNCATEGORIZED: { background: 'var(--surface-1)', color: 'var(--text-secondary)', border: '0.5px solid var(--border)' },
};

const pillBase: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: '4px',
  fontSize: '12px', fontWeight: 500, padding: '2px 8px', borderRadius: '20px',
};

export default function AllRepoRunResults({ data }: IProps) {
    const navigate = useNavigate();
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '1rem' }}>
            {data.workflowRuns.map(run => {
            const totalFindings = run.scans.reduce((acc, scan) => acc + scan.findings.length, 0)
            let findingCount: FindingCount = {critical: 0, high: 0, medium: 0, low: 0, uncategorized: 0}
            run.scans.forEach(scan => findingCount = getFindingServerityCounts(scan.findings, findingCount))
            const date = run.timestamp.toLocaleString()
            return (
                <div
                key={run.id}
                onClick={() => navigate(`/repo/${encodeURIComponent(run.repo)}`)}
                style={{ background: 'var(--surface-2)', border: '0.5px solid var(--border)', borderRadius: '12px', padding: '1rem 1.5rem', cursor: 'pointer', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}
                >
                <div>
                    <div style={{ fontWeight: 500 }}>{run.repo}</div>
                    <div style={{ display: 'flex', gap: '6px', marginTop: '6px', flexWrap: 'wrap' }}>
                        {findingCount.critical > 0 && <span style={{ ...pillBase, ...badgeStyle.CRITICAL }}>{findingCount.critical} critical</span>}
                        {findingCount.high > 0 && <span style={{ ...pillBase, ...badgeStyle.HIGH }}>{findingCount.high} high</span>}
                        {findingCount.medium > 0 && <span style={{ ...pillBase, ...badgeStyle.MEDIUM }}>{findingCount.medium} medium</span>}
                        {findingCount.low > 0 && <span style={{ ...pillBase, ...badgeStyle.LOW }}>{findingCount.low} low</span>}
                        {findingCount.uncategorized > 0 && <span style={{ ...pillBase, ...badgeStyle.UNCATEGORIZED }}>{findingCount.uncategorized} uncategorized</span>}
                        {totalFindings === 0 && <span style={{ ...pillBase, ...badgeStyle.UNCATEGORIZED }}>0 findings</span>}
                    </div>
                </div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Last run {date}</span>
                </div>
            )
            })}
        </div>
    );
}