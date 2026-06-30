import { useNavigate, useParams } from "react-router-dom";
import { getBranchesForRepo, getScanForRepo } from "../api/soapClient";
import { useEffect, useState } from "react";
import { WorkflowRunDetails } from "../models/WorkflowRunDetails";
import { badgeStyle, pillBase } from "../features/constants/styles";

export default function RepoResults() {
    const [repoScan, setRepoScan] = useState<WorkflowRunDetails | null>(null);
    const [branches, setBranches] = useState<string[]>([])
    const [selectedBranch, setSelectedBranch] = useState<string | null>(null)
    const { repo } = useParams<{ repo: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        if (!repo) return;
        getBranchesForRepo(repo).then(data => {
            setBranches(data.branches);
        })
    }, [repo])

    useEffect(() => {
        if (!repo) return;
        getScanForRepo(repo, selectedBranch).then(setRepoScan);
    }, [repo, selectedBranch])

    if (!repo) {
        return (
            <div>
            <h1>{'error'}</h1>
            </div>
        );
    }

    if (!repoScan) return null;

    return (
  <div style={{ padding: '2rem', maxWidth: '800px' }}>
    <div style={{ marginBottom: '2rem' }}>
      <button onClick={() => navigate('/')} style={{ fontSize: '13px', color: 'var(--text-secondary)', background: 'none', border: 'none', padding: 0, cursor: 'pointer', marginBottom: '1rem' }}>
        ← Back
      </button>
      <div style={{ fontSize: '22px', fontWeight: 500, marginBottom: '4px' }}>{repo}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '12px', color: 'var(--text-secondary)', background: 'var(--surface-1)', border: '0.5px solid var(--border)', borderRadius: '20px', padding: '2px 10px' }}>{repoScan.branch}</span>
        <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{repoScan.commit}</span>
      </div>
    </div>

    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2rem' }}>
      <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Branch</span>
      <select value={selectedBranch ?? 'main'} onChange={e => setSelectedBranch(e.target.value)} style={{ width: '180px' }}>
        {branches.map(branch => <option key={branch} value={branch}>{branch}</option>)}
      </select>
    </div>

    {repoScan.scans.length === 0 && <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>No scans found.</p>}

    {repoScan.scans.map(scan => (
      <div key={scan.workflowRunId + scan.scanner + scan.createdAt} style={{ marginBottom: '2rem' }}>
        <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
          {scan.scanner}
        </div>
        {scan.findings.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>No findings.</p>
        ) : (
          <div style={{ border: '0.5px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
            {scan.findings.map((finding, i) => (
              <div key={i} style={{ padding: '12px 16px', borderBottom: i < scan.findings.length - 1 ? '0.5px solid var(--border)' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '2px' }}>{finding.title}</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '4px' }}>{finding.description}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                    {finding.file}:{finding.lineStart}-{finding.lineEnd}
                  </div>
                </div>
                <span style={{ ...pillBase, ...(badgeStyle[finding.severity] ?? badgeStyle.UNCATEGORIZED) }}>
                  {finding.severity.toLowerCase()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
)
}