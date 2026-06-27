import { Finding } from "./Finding"

export type ScanResult = {
    workflowRunId: string
    scanner: string
    findings: Finding[]
    createdAt: string
}