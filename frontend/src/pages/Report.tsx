// import React from 'react'

// const Report = () => {
//   const reportData = [
//     {
//       srNo: 1,
//       empCode: "EMP001",
//       name: "John Smith",
//       location: "New York",
//       payrollGroup: "Monthly",
//       department: "IT",
//       lineManager: "Jane Doe",
//       entity: "ABC Corp",
//       weeklyData: {
//         WK01: { data: [["09:00", "18:00", "8:00", "Present"], ["09:15", "18:30", "8:15", "Present"], ["09:00", "18:00", "8:00", "Present"], ["09:00", "18:00", "8:00", "Present"], ["09:00", "18:00", "8:00", "Present"], ["-", "-", "-", "Holiday"], ["-", "-", "-", "Holiday"]] },
//         WK02: { data: [["09:00", "18:00", "8:00", "Present"], ["09:00", "18:00", "8:00", "Present"], ["-", "-", "-", "Absent"], ["09:00", "17:30", "7:30", "Leave Early"], ["09:00", "18:00", "8:00", "Present"], ["09:00", "18:00", "8:00", "Present"], ["-", "-", "-", "Holiday"]] },
//         WK03: { data: [["09:00", "18:00", "8:00", "Present"], ["09:00", "18:00", "8:00", "Present"], ["09:00", "18:00", "8:00", "Present"], ["09:00", "18:00", "8:00", "Present"], ["09:00", "18:00", "8:00", "Present"], ["-", "-", "-", "Holiday"], ["-", "-", "-", "Holiday"]] },
//         WK04: { data: [["09:00", "18:00", "8:00", "Present"], ["09:00", "18:00", "8:00", "Present"], ["09:00", "18:00", "8:00", "Present"], ["-", "-", "-", "Leave"], ["09:00", "18:00", "8:00", "Present"], ["09:00", "18:00", "8:00", "Present"], ["-", "-", "-", "Holiday"]] },
//         WK05: { data: [["09:00", "18:00", "8:00", "Present"], ["09:00", "18:00", "8:00", "Present"], ["09:00", "18:00", "8:00", "Present"], ["09:00", "18:00", "8:00", "Present"], ["09:00", "18:00", "8:00", "Present"], ["-", "-", "-", "Holiday"], ["-", "-", "-", "Holiday"]] }
//       },
//       summary: { totalInMonth: "184:00", totalActualHrs: "176:00", totalWorkingDays: "22", totalPresence: "20", comment: "Good performance" }
//     },
//     {
//       srNo: 2,
//       empCode: "EMP002",
//       name: "Sarah Johnson",
//       location: "Los Angeles",
//       payrollGroup: "Weekly",
//       department: "HR",
//       lineManager: "Mike Wilson",
//       entity: "XYZ Inc",
//       weeklyData: {
//         WK01: { data: [["08:30", "17:30", "8:00", "Present"], ["08:45", "17:45", "8:00", "Present"], ["08:30", "17:30", "8:00", "Present"], ["08:30", "17:30", "8:00", "Present"], ["08:30", "17:30", "8:00", "Present"], ["-", "-", "-", "Holiday"], ["-", "-", "-", "Holiday"]] },
//         WK02: { data: [["08:30", "17:30", "8:00", "Present"], ["08:30", "17:30", "8:00", "Present"], ["-", "-", "-", "Absent"], ["08:30", "17:00", "7:30", "Leave Early"], ["08:30", "17:30", "8:00", "Present"], ["08:30", "17:30", "8:00", "Present"], ["-", "-", "-", "Holiday"]] },
//         WK03: { data: [["08:30", "17:30", "8:00", "Present"], ["08:30", "17:30", "8:00", "Present"], ["08:30", "17:30", "8:00", "Present"], ["08:30", "17:30", "8:00", "Present"], ["08:30", "17:30", "8:00", "Present"], ["-", "-", "-", "Holiday"], ["-", "-", "-", "Holiday"]] },
//         WK04: { data: [["08:30", "17:30", "8:00", "Present"], ["08:30", "17:30", "8:00", "Present"], ["08:30", "17:30", "8:00", "Present"], ["-", "-", "-", "Leave"], ["08:30", "17:30", "8:00", "Present"], ["08:30", "17:30", "8:00", "Present"], ["-", "-", "-", "Holiday"]] },
//         WK05: { data: [["08:30", "17:30", "8:00", "Present"], ["08:30", "17:30", "8:00", "Present"], ["08:30", "17:30", "8:00", "Present"], ["08:30", "17:30", "8:00", "Present"], ["08:30", "17:30", "8:00", "Present"], ["-", "-", "-", "Holiday"], ["-", "-", "-", "Holiday"]] }
//       },
//       summary: { totalInMonth: "184:00", totalActualHrs: "176:00", totalWorkingDays: "22", totalPresence: "20", comment: "Excellent attendance" }
//     }
//   ]

//   const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

//   const getStatusStyle = (status: string) => {
//     switch (status) {
//       case 'Present': return { backgroundColor: '#dcfce7', color: '#166534', border: '1px solid #86efac' }
//       case 'Absent': return { backgroundColor: '#fee2e2', color: '#991b1b', border: '1px solid #fca5a5' }
//       case 'Holiday': return { backgroundColor: '#dbeafe', color: '#1e40af', border: '1px solid #93c5fd' }
//       case 'Leave': return { backgroundColor: '#fef3c7', color: '#92400e', border: '1px solid #fcd34d' }
//       case 'Leave Early': return { backgroundColor: '#fef9c3', color: '#a16207', border: '1px solid #fde047' }
//       default: return { backgroundColor: '#f3f4f6', color: '#374151', border: '1px solid #d1d5db' }
//     }
//   }

//   const containerStyle: React.CSSProperties = {
//     minHeight: '100vh',
//     backgroundColor: '#f3f4f6',
//     padding: '24px'
//   }

//   const maxWidthContainer: React.CSSProperties = {
    
//     margin: '0 auto'
//   }

//   const headerCard: React.CSSProperties = {
//     backgroundColor: '#ffffff',
//     borderRadius: '8px',
//     boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
//     border: '1px solid #e5e7eb',
//     padding: '24px',
//     marginBottom: '24px'
//   }

//   const headerFlex: React.CSSProperties = {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between'
//   }

//   const headerLeft: React.CSSProperties = {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '16px'
//   }

//   const iconContainer: React.CSSProperties = {
//     width: '48px',
//     height: '48px',
//     backgroundColor: '#2563eb',
//     borderRadius: '8px',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center'
//   }

//   const title: React.CSSProperties = {
//     fontSize: '24px',
//     fontWeight: 600,
//     color: '#111827',
//     margin: 0,
//     marginBottom: '4px'
//   }

//   const subtitle: React.CSSProperties = {
//     fontSize: '14px',
//     color: '#6b7280',
//     margin: 0
//   }

//   const buttonGroup: React.CSSProperties = {
//     display: 'flex',
//     gap: '8px'
//   }

//   const buttonSecondary: React.CSSProperties = {
//     padding: '8px 16px',
//     backgroundColor: '#ffffff',
//     border: '1px solid #d1d5db',
//     borderRadius: '6px',
//     fontSize: '14px',
//     fontWeight: 500,
//     color: '#374151',
//     cursor: 'pointer'
//   }

//   const buttonPrimary: React.CSSProperties = {
//     padding: '8px 16px',
//     backgroundColor: '#2563eb',
//     border: '1px solid #2563eb',
//     borderRadius: '6px',
//     fontSize: '14px',
//     fontWeight: 500,
//     color: '#ffffff',
//     cursor: 'pointer'
//   }

//   const legendCard: React.CSSProperties = {
//     backgroundColor: '#ffffff',
//     borderRadius: '8px',
//     boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
//     border: '1px solid #e5e7eb',
//     padding: '16px',
//     marginBottom: '16px'
//   }

//   const legendFlex: React.CSSProperties = {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '24px'
//   }

//   const legendLabel: React.CSSProperties = {
//     fontSize: '14px',
//     fontWeight: 500,
//     color: '#374151'
//   }

//   const legendItems: React.CSSProperties = {
//     display: 'flex',
//     gap: '16px'
//   }

//   const legendBadge = (bg: string, color: string, border: string): React.CSSProperties => ({
//     padding: '4px 10px',
//     backgroundColor: bg,
//     color: color,
//     border: `1px solid ${border}`,
//     borderRadius: '4px',
//     fontSize: '12px',
//     fontWeight: 500
//   })

//   const tableContainer: React.CSSProperties = {
//     backgroundColor: '#ffffff',
//     borderRadius: '8px',
//     boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
//     border: '1px solid #e5e7eb',
//     overflow: 'hidden'
//   }

//   const tableWrapper: React.CSSProperties = {
//     overflow: 'auto',
//     maxHeight: 'calc(100vh - 280px)',
//     position: 'relative'
//   }

//   const table: React.CSSProperties = {
//     width: '100%',
//     borderCollapse: 'collapse',
//     minWidth: '1200px'
//   }

//   const thBase: React.CSSProperties = {
//     border: '1px solid #d1d5db',
//     padding: '8px 12px',
//     fontSize: '11px',
//     fontWeight: 600,
//     textAlign: 'center'
//   }

//   const thSticky = (left: number, width: number): React.CSSProperties => ({
//     ...thBase,
//     position: 'sticky',
//     left,
//     backgroundColor: '#e5e7eb',
//     zIndex: 30,
//     width
//   })

//   const thBlue = (bgColor: string): React.CSSProperties => ({
//     ...thBase,
//     backgroundColor: bgColor,
//     color: '#ffffff'
//   })

//   const thGreen: React.CSSProperties = {
//     ...thBase,
//     backgroundColor: '#059669',
//     color: '#ffffff'
//   }

//   const thDays: React.CSSProperties = {
//     ...thBase,
//     backgroundColor: '#f9fafb',
//     color: '#4b5563'
//   }

//   const thSub: React.CSSProperties = {
//     ...thBase,
//     backgroundColor: '#ffffff',
//     color: '#6b7280',
//     fontWeight: 500
//   }

//   const tdBase: React.CSSProperties = {
//     border: '1px solid #d1d5db',
//     padding: '6px 12px',
//     fontSize: '11px'
//   }

//   const tdSticky = (left: number): React.CSSProperties => ({
//     ...tdBase,
//     position: 'sticky',
//     left,
//     backgroundColor: '#ffffff',
//     zIndex: 20
//   })

//   const statusBadge = (status: string): React.CSSProperties => ({
//     display: 'inline-block',
//     padding: '2px 6px',
//     borderRadius: '4px',
//     fontSize: '10px',
//     fontWeight: 600,
//     ...getStatusStyle(status)
//   })

//   const tdGreen: React.CSSProperties = {
//     ...tdBase,
//     backgroundColor: '#ecfdf5',
//     color: '#065f46',
//     fontWeight: 600,
//     textAlign: 'center'
//   }

//   const footerCard: React.CSSProperties = {
//     backgroundColor: '#ffffff',
//     borderRadius: '8px',
//     boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
//     border: '1px solid #e5e7eb',
//     padding: '16px',
//     marginTop: '16px'
//   }

//   const footerFlex: React.CSSProperties = {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     fontSize: '13px',
//     color: '#6b7280'
//   }

//   const systemBadge: React.CSSProperties = {
//     padding: '4px 8px',
//     backgroundColor: '#dcfce7',
//     color: '#166534',
//     borderRadius: '4px',
//     fontSize: '11px',
//     fontWeight: 600
//   }

//   return (
//     <div style={containerStyle}>
//       <div style={maxWidthContainer}>
//         {/* Header */}
//         <div style={headerCard}>
//           <div style={headerFlex}>
//             <div style={headerLeft}>
//               <div style={iconContainer}>
//                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#ffffff' }}>
//                   <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
//                 </svg>
//               </div>
//               <div>
//                 <h1 style={title}>Employee Attendance Report</h1>
//                 <p style={subtitle}>January 2024 • {reportData.length} Employees • 5 Weeks</p>
//               </div>
//             </div>
//             <div style={buttonGroup}>
//               <button style={buttonSecondary}>Export PDF</button>
//               <button style={buttonPrimary}>Download Excel</button>
//             </div>
//           </div>
//         </div>

//         {/* Legend */}
//         <div style={legendCard}>
//           <div style={legendFlex}>
//             <span style={legendLabel}>Status:</span>
//             <div style={legendItems}>
//               <span style={legendBadge('#dcfce7', '#166534', '#86efac')}>Present</span>
//               <span style={legendBadge('#fee2e2', '#991b1b', '#fca5a5')}>Absent</span>
//               <span style={legendBadge('#dbeafe', '#1e40af', '#93c5fd')}>Holiday</span>
//               <span style={legendBadge('#fef3c7', '#92400e', '#fcd34d')}>Leave</span>
//               <span style={legendBadge('#fef9c3', '#a16207', '#fde047')}>Leave Early</span>
//             </div>
//           </div>
//         </div>

//         {/* Table */}
//         <div style={tableContainer}>
//           <div style={tableWrapper}>
//             <table style={table}>
//               <thead>
//                 <tr>
//                   <th rowSpan={2} style={{...thBase, width: '48px'}}>Sr</th>
//                   <th rowSpan={2} style={{...thBase, width: '80px'}}>Emp Code</th>
//                   <th rowSpan={2} style={{...thBase, width: '112px'}}>Name</th>
//                   <th rowSpan={2} style={{...thBase, width: '96px'}}>Location</th>
//                   <th rowSpan={2} style={{...thBase, width: '96px'}}>Payroll</th>
//                   <th rowSpan={2} style={{...thBase, width: '80px'}}>Dept</th>
//                   <th rowSpan={2} style={{...thBase, width: '112px'}}>Line Manager</th>
//                   <th rowSpan={2} style={{...thBase, width: '80px'}}>Entity</th>
                  
//                   {['WK01', 'WK02', 'WK03', 'WK04', 'WK05'].map((week, i) => (
//                     <th key={week} colSpan={14} style={thBlue(i % 2 === 0 ? '#2563eb' : '#1d4ed8')}>{week}</th>
//                   ))}
                  
//                   <th rowSpan={2} style={{ ...thGreen, width: '112px' }}>Month Hrs</th>
//                   <th rowSpan={2} style={{ ...thGreen, width: '96px' }}>Actual Hrs</th>
//                   <th rowSpan={2} style={{ ...thGreen, width: '96px' }}>Work Days</th>
//                   <th rowSpan={2} style={{ ...thGreen, width: '80px' }}>Presence</th>
//                   <th rowSpan={2} style={{ ...thGreen, width: '128px' }}>Comment</th>
//                 </tr>
//                 <tr>
//                   {['WK01', 'WK02', 'WK03', 'WK04', 'WK05'].map(week => (
//                     <React.Fragment key={week}>
//                       {daysOfWeek.map(day => (
//                         <React.Fragment key={`${week}-${day}-h`}>
//                           <th style={thSub}>Time</th>
//                           <th style={thSub}>Status</th>
//                         </React.Fragment>
//                       ))}
//                     </React.Fragment>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {reportData.map((emp, idx) => (
//                   <tr key={emp.srNo} style={{ backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f9fafb' }}>
//                     <td style={{ ...tdBase, textAlign: 'center' }}>{emp.srNo}</td>
//                     <td style={tdBase}>{emp.empCode}</td>
//                     <td style={{ ...tdBase, fontWeight: 600, color: '#111827' }}>{emp.name}</td>
//                     <td style={{ ...tdBase, color: '#4b5563' }}>{emp.location}</td>
//                     <td style={{ ...tdBase, color: '#4b5563' }}>{emp.payrollGroup}</td>
//                     <td style={{ ...tdBase, color: '#4b5563' }}>{emp.department}</td>
//                     <td style={{ ...tdBase, color: '#4b5563' }}>{emp.lineManager}</td>
//                     <td style={{ ...tdBase, color: '#4b5563' }}>{emp.entity}</td>
                    
//                     {['WK01', 'WK02', 'WK03', 'WK04', 'WK05'].map(week => (
//                       <React.Fragment key={week}>
//                         {emp.weeklyData[week as keyof typeof emp.weeklyData].data.map((dayData, dIdx) => (
//                           <React.Fragment key={`${week}-${dIdx}`}>
//                             <td style={{ ...tdBase, textAlign: 'center', whiteSpace: 'nowrap' }}>
//                               {dayData[0] !== '-' ? `${dayData[0]}-${dayData[1]}` : '-'}
//                             </td>
//                             <td style={{ ...tdBase, textAlign: 'center' }}>
//                               <span style={statusBadge(dayData[3])}>
//                                 {dayData[3].charAt(0)}
//                               </span>
//                             </td>
//                           </React.Fragment>
//                         ))}
//                       </React.Fragment>
//                     ))}
                    
//                     <td style={tdGreen}>{emp.summary.totalInMonth}</td>
//                     <td style={tdGreen}>{emp.summary.totalActualHrs}</td>
//                     <td style={tdGreen}>{emp.summary.totalWorkingDays}</td>
//                     <td style={tdGreen}>{emp.summary.totalPresence}</td>
//                     <td style={{ ...tdGreen, textAlign: 'left', fontWeight: 400 }}>{emp.summary.comment}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Footer */}
//         <div style={footerCard}>
//           <div style={footerFlex}>
//             <p>Report generated on {new Date().toLocaleDateString()} • Scroll horizontally to view all weeks</p>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
//               <span>Total: {reportData.length} employees</span>
//               <span style={systemBadge}>System Active</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Report
