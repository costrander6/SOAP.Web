import { useNavigate, useParams } from "react-router-dom";
import { getScanForRepo } from "../api/soapClient";
import { useEffect, useState } from "react";
import { WorkflowRunDetails } from "../models/WorkflowRunDetails";

export default function RepoResults() {
    const [repoScan, setRepoScan] = useState<WorkflowRunDetails | null>(null);
    const navigate = useNavigate();
    const { repo } = useParams<{ repo: string }>();

    if (!repo) {
        return (
            <div>
            <h1>{'error'}</h1>
            </div>
        );
    }

    useEffect(() => {
        getScanForRepo(repo, null).then(setRepoScan);
    }, [navigate]);

    if (!repoScan) return null;

    return (
        <div>
            <h1>{repo}</h1>
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