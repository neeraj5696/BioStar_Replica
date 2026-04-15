import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FileText, Users as Download, RefreshCw, } from 'lucide-react'
import Header from '../components/Header'
import '../App.css'

const token = localStorage.getItem('lebhai')

const backendurl = import.meta.env.VITE_BACKEND_URL as string
const getAuthHeader = () => ({ Authorization: `Bearer ${token}` })


interface ReportRow { [key: string]: string | number }

interface Filters {
    startDate: string
    endDate: string
    selectedEmployeeId: string
    selectedDepartmentId: string
    selectedWorkGroupId: string
    tableName: string
}

const Enrolled_employees = () => {

    const [reportData, setReportData] = useState<ReportRow[]>([])
    const [loading, setLoading] = useState(false)

    const [filters, setFilters] = useState<Filters>({
        startDate: '', endDate: '',
        selectedEmployeeId: '', selectedDepartmentId: '',
        selectedWorkGroupId: '', tableName: '',
    })

    useEffect(() => {

        fetchReport()
    }, [])



    const fetchReport = async () => {
        setLoading(true)
        try {

            const res = await axios.get(`${backendurl}/api/Report/access-groups`, {
                headers: getAuthHeader()
            })
            setReportData(res.data)

        }
        catch (err) {
            console.error('Full error object:', err)
            alert('Failed to generate report')
        }
        finally {
            setLoading(false)
        }
    }

    const resetFilters = () => {
        setFilters({ startDate: '', endDate: '', selectedEmployeeId: '', selectedDepartmentId: '', selectedWorkGroupId: '', tableName: '' })
        setReportData([])
    }

    const exportCSV = () => {
        if (!reportData.length) return
        const headers = Object.keys(reportData[0]).join(',')
        const rows = reportData.map(r => Object.values(r).join(',')).join('\n')
        const blob = new Blob([`${headers}\n${rows}`], { type: 'text/csv' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a'); a.href = url; a.download = `${filters.selectedEmployeeId}_firstin-lastout.csv`; a.click()
        URL.revokeObjectURL(url)
    }

    const columns = reportData.length ? Object.keys(reportData[0]) : []

    return (
        <div className="app">
            <Header currentPage="access_groups">
                {/* Page Header */}
                <div style={styles.pageHeader}>
                    <div style={styles.pageHeaderLeft}>
                        <div style={styles.pageIconWrap}>
                            <FileText size={22} color="#fff" />
                        </div>
                        <div>
                            <h2 style={styles.pageTitle}>Biostar Access Group list</h2>
                            <p style={styles.pageSubtitle}>View the list of Acess Group</p>
                        </div>
                    </div>
                    <div style={styles.pageHeaderRight}>
                        <button style={styles.btnOutline} onClick={resetFilters}>
                            <RefreshCw size={14} /> Reset
                        </button>
                        <button style={styles.btnPrimary} onClick={exportCSV} disabled={!reportData.length}>
                            <Download size={14} /> Export CSV
                        </button>
                    </div>
                </div>





                {/* Table */}
                {reportData.length > 0 ? (
                    <div style={styles.tableCard}>
                        <div style={styles.tableHeader}>
                            <span style={styles.tableTitle}>Report Results</span>
                            <span style={styles.tableCount}>{reportData.length} records found</span>
                        </div>
                        <div style={styles.tableWrapper}>
                            <table style={styles.table}>
                                <thead>
                                    <tr>
                                        <th style={{ ...styles.th, ...styles.thSticky }}>#</th>
                                        {columns.map(col => (
                                            <th key={col} style={styles.th}>{col.replace(/([A-Z])/g, ' $1').trim()}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {reportData.map((row, i) => (
                                        <tr key={i} style={i % 2 === 0 ? styles.trEven : styles.trOdd}>
                                            <td style={{ ...styles.td, ...styles.tdSticky, color: '#9ca3af', fontSize: '11px' }}>{i + 1}</td>
                                            {columns.map(col => (
                                                <td key={col} style={styles.td}>{String(row[col] ?? '—')}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : !loading && (
                    <div style={styles.emptyState}>
                        <div style={styles.emptyIcon}><FileText size={48} color="#d1d5db" /></div>
                        <p style={styles.emptyTitle}>No report generated yet</p>
                        <p style={styles.emptySubtitle}>Select filters above and click Generate Report</p>
                    </div>
                )}
            </Header>
        </div>

    )
}

const styles: Record<string, React.CSSProperties> = {
    pageHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
    pageHeaderLeft: { display: 'flex', alignItems: 'center', gap: '14px' },
    pageIconWrap: { width: '44px', height: '44px', background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(59,130,246,0.3)' },
    pageTitle: { fontSize: '20px', fontWeight: 700, color: '#111827', margin: 0 },
    pageSubtitle: { fontSize: '13px', color: '#6b7280', margin: 0 },
    pageHeaderRight: { display: 'flex', gap: '10px' },
    btnOutline: { display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: '#fff', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px', fontWeight: 500, color: '#374151', cursor: 'pointer' },
    btnPrimary: { display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: '#fff', cursor: 'pointer' },

    filterCard: { background: '#fff', borderRadius: '12px', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid #e5e7eb' },
    filterCardHeader: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid #f3f4f6' },
    filterCardTitle: { fontSize: '14px', fontWeight: 600, color: '#374151' },
    filterGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr) repeat(2, 1fr) auto', gap: '16px', alignItems: 'end' },
    filterGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
    filterLabel: { display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' },
    selectWrap: { position: 'relative' },
    select: { width: '100%', padding: '9px 32px 9px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px', color: '#374151', background: '#f9fafb', appearance: 'none', cursor: 'pointer', outline: 'none' },
    selectIcon: { position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#9ca3af' },
    input: { padding: '9px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px', color: '#374151', background: '#f9fafb', outline: 'none', width: '100%' },
    btnGenerate: { display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 20px', background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: '#fff', cursor: 'pointer', whiteSpace: 'nowrap' },
    btnGenerating: { display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 20px', background: '#d1d5db', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: '#6b7280', cursor: 'not-allowed', whiteSpace: 'nowrap' },
    spin: { animation: 'spin 1s linear infinite' },

    statsRow: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '20px' },
    statCard: { background: '#fff', borderRadius: '10px', padding: '16px', display: 'flex', alignItems: 'center', gap: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid #e5e7eb', borderLeft: '4px solid #3b82f6' },
    statIcon: { width: '40px', height: '40px', background: '#f3f4f6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
    statValue: { fontSize: '16px', fontWeight: 700, color: '#111827' },
    statLabel: { fontSize: '11px', color: '#6b7280', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' },

    tableCard: { background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid #e5e7eb', overflow: 'hidden' },
    tableHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #f3f4f6' },
    tableTitle: { fontSize: '14px', fontWeight: 600, color: '#374151' },
    tableCount: { fontSize: '12px', color: '#6b7280', background: '#f3f4f6', padding: '4px 10px', borderRadius: '20px' },
    tableWrapper: { overflowX: 'auto', maxHeight: 'calc(100vh - 420px)', overflowY: 'auto' },
    table: { width: '100%', borderCollapse: 'collapse', minWidth: '600px' },
    th: { padding: '10px 14px', fontSize: '11px', fontWeight: 600, color: '#fff', background: 'linear-gradient(135deg, #1e3a8a, #1d4ed8)', textAlign: 'left', whiteSpace: 'nowrap', borderRight: '1px solid rgba(255,255,255,0.1)', position: 'sticky', top: 0, zIndex: 10 },
    thSticky: { left: 0, zIndex: 20, width: '40px', textAlign: 'center' },
    trEven: { background: '#ffffff' },
    trOdd: { background: '#f9fafb' },
    td: { padding: '10px 14px', fontSize: '13px', color: '#374151', borderBottom: '1px solid #f3f4f6', whiteSpace: 'nowrap' },
    tdSticky: { position: 'sticky', left: 0, background: 'inherit', zIndex: 5, textAlign: 'center' },

    emptyState: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 20px', background: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb' },
    emptyIcon: { marginBottom: '16px' },
    emptyTitle: { fontSize: '16px', fontWeight: 600, color: '#374151', margin: '0 0 6px' },
    emptySubtitle: { fontSize: '13px', color: '#9ca3af', margin: 0 },
}

export default Enrolled_employees
