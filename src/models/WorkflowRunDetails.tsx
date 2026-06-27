type WorkflowRunDetails = {
    id: string
    repo: string
    branch: string
    commit: string
    timestamp: string
    createdAt: string
    scans: ScanResult[]
}