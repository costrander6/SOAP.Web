import { ScanResult } from "./ScanResult"

export type WorkflowRunDetails = {
    id: string
    repo: string
    branch: string
    commit: string
    timestamp: Date
    createdAt: string
    scans: ScanResult[]
}