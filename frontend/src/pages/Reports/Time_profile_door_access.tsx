import React, { useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import { FileText, Users as UsersIcon, Building2, Calendar, Search, Download, RefreshCw, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Edit } from 'lucide-react'
import Header from '../../components/Header'
import MultiSelectDropdown from '../../components/MultiSelectDropdown'
import '../../App.css'
import api from '../../api'


const token = localStorage.getItem('lebhai')

const backendurl = import.meta.env.VITE_BACKEND_URL as string
const getAuthHeader = () => ({ Authorization: `Bearer ${token}` })

interface DropdownOption { id: string; name: string }
interface ReportRow { [key: string]: string | number }

interface Filters {
    startDate: string
    endDate: string
    selectedEmployeeIds: string[]
    selectedDepartmentIds: string[]
    selectedWorkGroupIds: string[]
    tableName: string
}

interface editData {
    ID: number
    usrid: string
    username: string
    doorid: string
    expirydate: string
    doorname: string
    executed: boolean
    startdate: string
    STDATEEXT: string
    UPDATEDDATE: string
}


const Firstinlastout_device = () => {
    const [employees, setEmployees] = useState<DropdownOption[]>([])
    const [departments, setDepartments] = useState<DropdownOption[]>([])
    const [reportData, setReportData] = useState<ReportRow[]>([])
    const [loading, setLoading] = useState(false)
    const [dropdownsLoading, setDropdownsLoading] = useState(true)
    const [editData, setEditData] = useState<editData | null>(null)
    const [editingRowId, setEditingRowId] = useState<number | null>(null)
    const [isModelOpen, setIsModelOpen] = useState(false)


    // Pagination state
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(500)
    const [jumpToPage, setJumpToPage] = useState('')

    const [filters, setFilters] = useState<Filters>({
        startDate: new Date().toISOString().slice(0, 16),
        endDate: new Date().toISOString().slice(0, 16),
        selectedEmployeeIds: [],
        selectedDepartmentIds: [],
        selectedWorkGroupIds: [],
        tableName: ''
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
            api.get(`api/Report/access-groups`),
            api.get(`api/Report/Alldoor_access_list`),

        ]).then(([empRes, depRes, accessRes]) => {
            setEmployees(empRes.data)

            setDepartments(depRes.data)

            setReportData(accessRes.data)

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

            // Get selected employee and department data
            const selectedEmployees = employees.filter(emp => filters.selectedEmployeeIds.includes(emp.id))
            const selectedDepartments = departments.filter(dept => filters.selectedDepartmentIds.includes(dept.id))

            const payload = {
                userIds: filters.selectedEmployeeIds.length > 0 ? filters.selectedEmployeeIds : [],
                userNames: selectedEmployees.map(emp => emp.name),
                doorIds: filters.selectedDepartmentIds.length > 0 ? filters.selectedDepartmentIds : [],
                doorNames: selectedDepartments.map(dept => dept.name),
                startDate: filters.startDate,
                endDate: filters.endDate
            }

            //console.log(payload.userNames, payload.doorNames, payload.startDate, payload.endDate, payload.userIds, payload.doorIds)

            const res = await api.post(`/api/Report/door-access/save`, payload)

            alert(res.data.message)

        }
        catch (err) {
            console.error('Full error object:', err)
            alert('Failed to generate report')
        }
        finally {
            setLoading(false)
        }
    }

    const handleEdit = async (row: ReportRow) => {
        setEditingRowId(Number(row.id))
        try {
            const res = await axios.post(`${backendurl}/api/Report/get-by-id`,
                {
                    id: row.id,
                    flag: 'dooraccess'
                },
                { headers: getAuthHeader() }
            )
            setEditData(res.data[0])
            setIsModelOpen(true)
        }
        catch (err) {

            alert('failedto fetch the record details')
        }
    }


    const handleUpdate = async () => {
        try {
            const res = await axios.post(`${backendurl}/api/Report/door-access/update`,
                {
                    id: editData?.ID,
                    expiryDate: editData?.expirydate,

                }, {
                headers: getAuthHeader()
            })
            alert(res.data.message)
            setIsModelOpen(false)
            setEditingRowId(null)



        }
        catch (err) {
            console.error('Error updateing record', err)
            alert('Failed to update the record',)
            console.log(err)
        }
    }

    const resetFilters = () => {
        setFilters({
            startDate: new Date().toISOString().slice(0, 16),
            endDate: new Date().toISOString().slice(0, 16),
            selectedEmployeeIds: [],
            selectedDepartmentIds: [],
            selectedWorkGroupIds: [],
            tableName: ''
        })
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
        const selectedEmployeeNames = employees.filter(emp => filters.selectedEmployeeIds.includes(emp.id)).map(emp => emp.name).join('-')
        const fileName = selectedEmployeeNames || 'door-access-report'
        const a = document.createElement('a'); a.href = url; a.download = `${fileName}.csv`; a.click()
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
            <Header currentPage="time-profile-door-access">
                {/* Page Header */}
                <div style={styles.pageHeader}>
                    <div style={styles.pageHeaderLeft}>
                        <div style={styles.pageIconWrap}>
                            <FileText size={22} color="#fff" />
                        </div>
                        <div>
                            <h2 style={styles.pageTitle}>Time Profile of Door Access</h2>
                            <p style={styles.pageSubtitle}>Track employee entry and exit times across Device/Groups</p>
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
                            <MultiSelectDropdown
                                options={employees}
                                selectedIds={filters.selectedEmployeeIds}
                                onSelect={(ids) => setFilters(prev => ({ ...prev, selectedEmployeeIds: ids }))}
                                placeholder="All Employees"
                                searchPlaceholder="Search employee..."
                                disabled={dropdownsLoading}
                            />
                        </div>

                        {/* Department */}
                        <div style={styles.filterGroup}>
                            <label style={styles.filterLabel}><Building2 size={13} /> Groups</label>
                            <MultiSelectDropdown
                                options={departments}
                                selectedIds={filters.selectedDepartmentIds}
                                onSelect={(ids) => setFilters(prev => ({ ...prev, selectedDepartmentIds: ids }))}
                                placeholder="All Groups"
                                searchPlaceholder="Search department..."
                                disabled={dropdownsLoading}
                            />
                        </div>



                        {/* Start Date & Time */}
                        <div style={styles.filterGroup}>
                            <label style={styles.filterLabel}><Calendar size={13} /> Start Date & Time</label>
                            <input type="datetime-local" name="startDate" value={filters.startDate} onChange={handleChange} style={styles.input} />
                        </div>

                        {/* End Date & Time */}
                        <div style={styles.filterGroup}>
                            <label style={styles.filterLabel}><Calendar size={13} /> End Date & Time</label>
                            <input type="datetime-local" name="endDate" value={filters.endDate} onChange={handleChange} style={styles.input} />
                        </div>

                        {/* Generate Button */}
                        <div style={{ ...styles.filterGroup, justifyContent: 'flex-end' }}>
                            <label style={{ ...styles.filterLabel, opacity: 0 }}>_</label>
                            <button style={loading ? styles.btnGenerating : styles.btnGenerate} onClick={fetchReport} disabled={loading}>
                                {loading ? <><RefreshCw size={14} style={styles.spin} /> Saving...</> : <><Search size={14} /> Save Access</>}
                            </button>
                        </div>
                    </div>
                </div>



                {/* Table */}
                {reportData.length > 0 ? (
                    <div style={styles.tableCard}>
                        <div style={styles.tableHeader}>
                            <span style={styles.tableTitle}>Employee List </span>
                            <span style={styles.tableCount}>{reportData.length} records found ({currentPageData.length} shown)</span>
                        </div>
                        <div style={styles.tableWrapper}>

                            {/* Table start from here */}
                            <table style={styles.table}>

                                {/* Table Header Start */}
                                <thead>
                                    <tr>

                                        {/* first column for index */}
                                        <th style={{ ...styles.th, ...styles.thSticky }}>#</th>
                                        {columns.map(col => (
                                            <th key={col} style={styles.th}>{col.replace(/([A-Z])/g, ' $1').trim().toLocaleUpperCase()}</th>
                                        ))}
                                        <th style={styles.th}>ACTIONS</th>
                                    </tr>
                                </thead>

                                {/* Table Body Start */}
                                <tbody>
                                    {currentPageData.map((row, i) => {
                                        const globalIndex = startIndex + i
                                        return (
                                            <tr key={globalIndex} style={globalIndex % 2 === 0 ? styles.trEven : styles.trOdd}>
                                                <td style={{ ...styles.td, ...styles.tdSticky, color: '#9ca3af', fontSize: '11px' }}>{globalIndex + 1}</td>
                                                {columns.map(col => (
                                                    <td key={col} style={styles.td}>{String(row[col] ?? '—')}</td>
                                                ))}
                                                <td style={styles.td}>
                                                    <button
                                                        style={{
                                                            ...styles.editBtn,
                                                            ...(editingRowId === Number(row.id) ? styles.editBtnLoading : {})
                                                        }}
                                                        onClick={() => handleEdit(row)}
                                                        disabled={editingRowId === Number(row.id)}
                                                        title="Edit record"
                                                    >
                                                        {editingRowId === Number(row.id) ? (
                                                            <RefreshCw size={14} style={styles.spin} />
                                                        ) : (
                                                            <Edit size={14} />
                                                        )}
                                                        {editingRowId === Number(row.id) ? 'Loading...' : 'Edit'}
                                                    </button>
                                                </td>
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


                {isModelOpen && (
                    <div style={styles.modalOverlay}>
                        <div style={styles.modalCard}>
                            <h3 style={styles.modalTitle}>Edit Door Access</h3>
                            <div style={styles.modalBody}>
                                <div style={styles.modalRow}>
                                    <span style={styles.modalLabel}>ID</span>
                                    <span>{editData?.ID}</span>
                                </div>
                                <div style={styles.modalRow}>
                                    <span style={styles.modalLabel}>usrid</span>
                                    <span>{editData?.usrid}</span>
                                </div>
                                <div style={styles.modalRow}>
                                    <span style={styles.modalLabel}>username</span>
                                    <span>{editData?.username}</span>
                                </div>
                                <div style={styles.modalRow}>
                                    <span style={styles.modalLabel}>doorid</span>
                                    <span>{editData?.doorid}</span>
                                </div>
                                <div style={{ ...styles.modalRow, flexDirection: 'column', alignItems: 'stretch' }}>
                                    <span style={styles.modalLabel}>Expiry Date</span>
                                    <input
                                        type="datetime-local"
                                        value={editData?.expirydate ?? ''}
                                        onChange={(e) => setEditData({ ...editData!, expirydate: e.target.value })}
                                        style={styles.modalInput}
                                    />
                                </div>
                                <div style={styles.modalRow}>
                                    <span style={styles.modalLabel}>doorname</span>
                                    <span>{editData?.doorname}</span>
                                </div>
                                <div style={styles.modalRow}>
                                    <span style={styles.modalLabel}>executed</span>
                                    <span>{String(editData?.executed ?? '')}</span>
                                </div>
                                <div style={styles.modalRow}>
                                    <span style={styles.modalLabel}>startdate</span>
                                    <span>{editData?.startdate}</span>
                                </div>
                                <div style={styles.modalRow}>
                                    <span style={styles.modalLabel}>STDATEEXT</span>
                                    <span>{editData?.STDATEEXT}</span>
                                </div>
                                <div style={styles.modalRow}>
                                    <span style={styles.modalLabel}>UPDATEDDATE</span>
                                    <span>{editData?.UPDATEDDATE}</span>
                                </div>
                            </div>

                            <div style={styles.modalActions}>
                                <button onClick={() => { setIsModelOpen(false); setEditingRowId(null); }} style={styles.btnOutline}>Cancel</button>
                                <button onClick={handleUpdate} style={styles.btnPrimary}>Update</button>
                            </div>
                        </div>
                    </div>
                )}


            </Header>
        </div >

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
    editBtn: { display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 500, cursor: 'pointer', transition: 'background 0.2s' },
    editBtnLoading: { background: '#9ca3af', cursor: 'not-allowed' },
    modalOverlay: {
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '8vh',
        zIndex: 1000
    },
    modalCard: {
        width: 'min(520px, 90%)',
        background: 'linear-gradient(145deg, #f8fbff, #e9eff7)',
        borderRadius: '26px',
        boxShadow: '0 32px 120px rgba(15, 23, 42, 0.22), inset 0 0 0 1px rgba(255,255,255,0.55)',
        border: '1px solid rgba(255, 255, 255, 0.22)',
        padding: '28px',
        transform: 'rotateX(1.5deg) translateZ(0)',
        transition: 'transform 0.24s ease, box-shadow 0.24s ease'
    },
    modalTitle: {
        margin: 0,
        marginBottom: '18px',
        fontSize: '20px',
        fontWeight: 700,
        color: '#0f172a',
        textAlign: 'center',
        textShadow: '0 2px 12px rgba(59, 130, 246, 0.16)'
    },
    modalBody: {
        display: 'grid',
        gap: '10px',
    },
    modalRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        borderRadius: '8px',
        background: 'rgba(255,255,255,0.9)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8), 0 1px 2px rgba(15, 23, 42, 0.06)',
        border: '2px solid rgba(255, 255, 255, 0.7)'

    },
    modalLabel: {
        color: '#334155',
        fontSize: '13px',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
    },
    modalInput: {
        width: '100%',
        padding: '10px 14px',
        borderRadius: '8px',
        border: '1px solid rgba(127, 156, 197, 0.7)',
        background: '#f8fafc',
        color: '#0f172a',
        fontSize: '14px',
        outline: 'none',
        boxShadow: 'inset 0 1px 2px rgba(15, 23, 42, 0.08)'
    },
    modalActions: {
        marginTop: '22px',
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '12px'
    },
}

export default Firstinlastout_device
