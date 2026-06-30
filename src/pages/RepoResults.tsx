import { useNavigate, useParams } from "react-router-dom";
import { getBranchesForRepo, getScanForRepo } from "../api/soapClient";
import { useEffect, useState } from "react";
import { WorkflowRunDetails } from "../models/WorkflowRunDetails";

export default function RepoResults() {
    const [repoScan, setRepoScan] = useState<WorkflowRunDetails | null>(null);
    const [branches, setBranches] = useState<string[]>([])
    const [selectedBranch, setSelectedBranch] = useState<string | null>(null)
    const { repo } = useParams<{ repo: string }>();

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
        <div>
            <h1>{repo}</h1>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            {repoScan.commit}
            </p>
            <select
            value={selectedBranch ?? 'main'}
            onChange={e => setSelectedBranch(e.target.value)}
            >
                {branches.map(branch => (
                    <option key={branch} value={branch}>{branch}</option>
                ))}
            </select>
            {repoScan.scans.length === 0 && <p>No scans found.</p>}
            {repoScan.scans.map(scan => (
            <div key={scan.workflowRunId + scan.scanner}>
                <h2>{scan.scanner}</h2>
                {scan.findings.length === 0 ? (
                <p style={{ color: 'var(--text-muted)' }}>No findings.</p>
                ) : (
                scan.findings.map((finding, i) => (
                    <div key={i} style={{ borderBottom: '0.5px solid var(--border)', padding: '8px 0' }}>
                    <div style={{ fontWeight: 500 }}>{finding.title}</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{finding.description}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        {finding.file}:{finding.lineStart}-{finding.lineEnd} — {finding.severity}
                    </div>
                    </div>
                ))
                )}
            </div>
            ))}
        </div>
    )
}