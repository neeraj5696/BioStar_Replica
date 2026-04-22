import React, { useEffect, useState, useMemo } from 'react'
import { FileText, Users as UsersIcon, Building2, Layers, Calendar, Search, Download, RefreshCw, Clock, LogIn, LogOut, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import Header from '../../components/Header'
import SearchableDropdown from '../../components/ReusableComponents/SearchableDropdown'
import '../../App.css'
import api from '../../api'

interface DropdownOption { id: string; name: string }
interface ReportRow { [key: string]: string | number }

interface Filters {
    startDate: string
    endDate: string
    selectedEmployeeId: string
    selectedDepartmentId: string
    selectedWorkGroupId: string
    tableName: string
}

const Firstinlastout = () => {
    const [employees, setEmployees] = useState<DropdownOption[]>([])
    const [departments, setDepartments] = useState<DropdownOption[]>([])
    const [workgroups, setWorkgroups] = useState<DropdownOption[]>([])
    const [reportData, setReportData] = useState<ReportRow[]>([])
    const [loading, setLoading] = useState(false)
    const [dropdownsLoading, setDropdownsLoading] = useState(true)

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(500)
    const [jumpToPage, setJumpToPage] = useState('')

    const [filters, setFilters] = useState<Filters>({
        startDate: '', endDate: '',
        selectedEmployeeId: '', selectedDepartmentId: '',
        selectedWorkGroupId: '', tableName: '',
    })

    // Pagination calculations
    const totalPages = Math.ceil(reportData.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentPageData = useMemo(() =>
        reportData.slice(startIndex, endIndex),
        [reportData, startIndex, endIndex]
    )

    // Reset pagination when data changes
    useEffect(() => {
        setCurrentPage(1)
        setJumpToPage('')
    }, [reportData])

    useEffect(() => {
        Promise.all([
            api.get(`api/Report/employees`),
            api.get(`api/Report/departments`),
            api.get(`api/Report/workgroups`),
        ]).then(([empRes, depRes, wgRes]) => {

            setEmployees(empRes.data)
            setDepartments(depRes.data)
            setWorkgroups(wgRes.data)
        }).finally(() => setDropdownsLoading(false))
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) =>
        setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }))

    const fetchReport = async () => {
        setLoading(true)
        try {
            if (!filters.startDate || !filters.endDate) {
                alert('Please choose Start Date and End Date')
                setLoading(false)
                return
            }

            const payload = {
                startDate: filters.startDate,
                endDate: filters.endDate,
                selectedEmployeeId: filters.selectedEmployeeId || null,
                selectedDepartmentId: filters.selectedDepartmentId || null,
                selectedWorkGroupId: filters.selectedWorkGroupId || null,
                tableName: filters.tableName || 'default'
            }

            const res = await api.post(`/api/Report/firstin-lastout`, payload)
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
        setCurrentPage(1)
        setJumpToPage('')
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

    // Pagination handlers
    const goToFirstPage = () => setCurrentPage(1)
    const goToLastPage = () => setCurrentPage(totalPages)
    const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages))
    const goToPreviousPage = () => setCurrentPage(prev => Math.max(prev - 1, 1))

    const handleJumpToPage = (e: React.FormEvent) => {
        e.preventDefault()
        const pageNum = parseInt(jumpToPage)
        if (pageNum >= 1 && pageNum <= totalPages) {
            setCurrentPage(pageNum)
            setJumpToPage('')
        }
    }

    return (
        <div className="app">
            <Header currentPage="reports">
                {/* Page Header */}
                <div style={styles.pageHeader}>
                    <div style={styles.pageHeaderLeft}>
                        <div style={styles.pageIconWrap}>
                            <FileText size={22} color="#fff" />
                        </div>
                        <div>
                            <h2 style={styles.pageTitle}>First In / Last Out Report</h2>
                            <p style={styles.pageSubtitle}>Track employee entry and exit times across departments</p>
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

                {/* Filter Card */}
                <div style={styles.filterCard}>
                    <div style={styles.filterCardHeader}>
                        <Search size={16} color="#3b82f6" />
                        <span style={styles.filterCardTitle}>Filter Report</span>
                    </div>

                    <div style={styles.filterGrid}>
                        {/* Employee */}
                        <div style={styles.filterGroup}>
                            <label style={styles.filterLabel}><UsersIcon size={13} /> Employee</label>
                            <SearchableDropdown
                                options={employees}
                                selectedId={filters.selectedEmployeeId}
                                onSelect={(id) => setFilters(prev => ({ ...prev, selectedEmployeeId: id }))}
                                placeholder="All Employees"
                                searchPlaceholder="Search employee..."
                                disabled={dropdownsLoading}
                            />
                        </div>

                        {/* Department */}
                        <div style={styles.filterGroup}>
                            <label style={styles.filterLabel}><Building2 size={13} /> Department</label>
                            <SearchableDropdown
                                options={departments}
                                selectedId={filters.selectedDepartmentId}
                                onSelect={(id) => setFilters(prev => ({ ...prev, selectedDepartmentId: id }))}
                                placeholder="All Departments"
                                searchPlaceholder="Search department..."
                                disabled={dropdownsLoading}
                            />
                        </div>

                        {/* Work Group */}
                        <div style={styles.filterGroup}>
                            <label style={styles.filterLabel}><Layers size={13} /> Work Group</label>
                            <SearchableDropdown
                                options={workgroups}
                                selectedId={filters.selectedWorkGroupId}
                                onSelect={(id) => setFilters(prev => ({ ...prev, selectedWorkGroupId: id }))}
                                placeholder="All Work Groups"
                                searchPlaceholder="Search work group..."
                                disabled={dropdownsLoading}
                            />
                        </div>

                        {/* Start Date */}
                        <div style={styles.filterGroup}>
                            <label style={styles.filterLabel}><Calendar size={13} /> Start Date</label>
                            <input type="date" name="startDate" value={filters.startDate} onChange={handleChange} style={styles.input} />
                        </div>

                        {/* End Date */}
                        <div style={styles.filterGroup}>
                            <label style={styles.filterLabel}><Calendar size={13} /> End Date</label>
                            <input type="date" name="endDate" value={filters.endDate} onChange={handleChange} style={styles.input} />
                        </div>

                        {/* Generate Button */}
                        <div style={{ ...styles.filterGroup, justifyContent: 'flex-end' }}>
                            <label style={{ ...styles.filterLabel, opacity: 0 }}>_</label>
                            <button style={loading ? styles.btnGenerating : styles.btnGenerate} onClick={fetchReport} disabled={loading}>
                                {loading ? <><RefreshCw size={14} style={styles.spin} /> Generating...</> : <><Search size={14} /> Generate Report</>}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Summary Stats */}
                {reportData.length > 0 && (
                    <div style={styles.statsRow}>
                        <div style={{ ...styles.statCard, borderLeftColor: '#3b82f6' }}>
                            <div style={styles.statIcon}><UsersIcon size={20} color="#3b82f6" /></div>
                            <div><div style={styles.statValue}>{reportData.length}</div><div style={styles.statLabel}>Total Records</div></div>
                        </div>
                        <div style={{ ...styles.statCard, borderLeftColor: '#10b981' }}>
                            <div style={styles.statIcon}><LogIn size={20} color="#10b981" /></div>
                            <div><div style={styles.statValue}>{filters.startDate || '—'}</div><div style={styles.statLabel}>From Date</div></div>
                        </div>
                        <div style={{ ...styles.statCard, borderLeftColor: '#f59e0b' }}>
                            <div style={styles.statIcon}><LogOut size={20} color="#f59e0b" /></div>
                            <div><div style={styles.statValue}>{filters.endDate || '—'}</div><div style={styles.statLabel}>To Date</div></div>
                        </div>
                        <div style={{ ...styles.statCard, borderLeftColor: '#8b5cf6' }}>
                            <div style={styles.statIcon}><Clock size={20} color="#8b5cf6" /></div>
                            <div><div style={styles.statValue}>{columns.length}</div><div style={styles.statLabel}>Columns</div></div>
                        </div>
                    </div>
                )}

                {/* Table */}
                {reportData.length > 0 ? (
                    <div style={styles.tableCard}>
                        <div style={styles.tableHeader}>
                            <span style={styles.tableTitle}>Report Results</span>
                            <span style={styles.tableCount}>{reportData.length} records found ({currentPageData.length} shown)</span>
                        </div>
                        <div style={styles.tableWrapper}>
                            <table style={styles.table}>
                                <thead>
                                    <tr>
                                        <th style={{ ...styles.th, ...styles.thSticky }}>#</th>
                                        {columns.map(col => (
                                            <th key={col} style={styles.th}>{col.replace(/([A-Z])/g, ' $1').trim().toLocaleUpperCase()}</th>  // Header dynamically generated from column keys, with spaces before capital letters and uppercase text
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentPageData.map((row, i) => {
                                        const globalIndex = startIndex + i
                                        return (
                                            <tr key={globalIndex} style={globalIndex % 2 === 0 ? styles.trEven : styles.trOdd}>
                                                <td style={{ ...styles.td, ...styles.tdSticky, color: '#9ca3af', fontSize: '11px' }}>{globalIndex + 1}</td>
                                                {columns.map(col => (
                                                    <td key={col} style={styles.td}>{String(row[col] ?? '—')}</td>
                                                ))}
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div style={styles.paginationContainer}>
                                <div style={styles.paginationInfo}>
                                    Showing {startIndex + 1}-{Math.min(endIndex, reportData.length)} of {reportData.length} records
                                </div>

                                <div style={styles.paginationControls}>
                                    <button
                                        style={currentPage === 1 ? styles.paginationBtnDisabled : styles.paginationBtn}
                                        onClick={goToFirstPage}
                                        disabled={currentPage === 1}
                                        title="First page"
                                    >
                                        <ChevronsLeft size={16} />
                                    </button>

                                    <button
                                        style={currentPage === 1 ? styles.paginationBtnDisabled : styles.paginationBtn}
                                        onClick={goToPreviousPage}
                                        disabled={currentPage === 1}
                                        title="Previous page"
                                    >
                                        <ChevronLeft size={16} />
                                    </button>

                                    <div style={styles.pageInfo}>
                                        Page {currentPage} of {totalPages}
                                    </div>

                                    <button
                                        style={currentPage === totalPages ? styles.paginationBtnDisabled : styles.paginationBtn}
                                        onClick={goToNextPage}
                                        disabled={currentPage === totalPages}
                                        title="Next page"
                                    >
                                        <ChevronRight size={16} />
                                    </button>

                                    <button
                                        style={currentPage === totalPages ? styles.paginationBtnDisabled : styles.paginationBtn}
                                        onClick={goToLastPage}
                                        disabled={currentPage === totalPages}
                                        title="Last page"
                                    >
                                        <ChevronsRight size={16} />
                                    </button>
                                </div>

                                <form onSubmit={handleJumpToPage} style={styles.jumpToPage}>
                                    <span style={styles.jumpLabel}>Go to:</span>
                                    <input
                                        type="number"
                                        min="1"
                                        max={totalPages}
                                        value={jumpToPage}
                                        onChange={(e) => setJumpToPage(e.target.value)}
                                        style={styles.jumpInput}
                                        placeholder="Page"
                                    />
                                    <button type="submit" style={styles.jumpBtn}>Go</button>
                                </form>
                            </div>
                        )}
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

    emptyState: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '200px 40px', background: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb' },
    emptyIcon: { marginBottom: '16px' },
    emptyTitle: { fontSize: '20px', fontWeight: 600, color: '#374151', margin: '0 0 6px' },
    emptySubtitle: { fontSize: '14px', color: '#9ca3af', margin: 0 },

    // Pagination Styles
    paginationContainer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderTop: '1px solid #f3f4f6', background: '#f9fafb' },
    paginationInfo: { fontSize: '13px', color: '#6b7280', fontWeight: 500 },
    paginationControls: { display: 'flex', alignItems: 'center', gap: '8px' },
    paginationBtn: { display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', border: '1px solid #d1d5db', borderRadius: '6px', background: '#fff', color: '#374151', cursor: 'pointer', transition: 'all 0.2s', fontSize: '14px', fontWeight: 500 },
    paginationBtnDisabled: { display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', border: '1px solid #e5e7eb', borderRadius: '6px', background: '#f9fafb', color: '#9ca3af', cursor: 'not-allowed', fontSize: '14px', fontWeight: 500 },
    pageInfo: { padding: '0 16px', fontSize: '14px', fontWeight: 600, color: '#374151', minWidth: '120px', textAlign: 'center' },
    jumpToPage: { display: 'flex', alignItems: 'center', gap: '8px' },
    jumpLabel: { fontSize: '13px', color: '#6b7280', fontWeight: 500 },
    jumpInput: { width: '60px', padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px', textAlign: 'center', outline: 'none' },
    jumpBtn: { padding: '6px 12px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', transition: 'background 0.2s' },
}

export default Firstinlastout
