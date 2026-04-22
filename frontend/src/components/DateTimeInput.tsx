// import React, { useState, useEffect } from 'react'
// import type { CSSProperties } from 'react'
// import { Calendar, Clock } from 'lucide-react'

// interface DateTimeInputProps {
//     value: string
//     onChange: (value: string) => void
//     disabled?: boolean
// }

// const DateTimeInput: React.FC<DateTimeInputProps> = ({
//     value,
//     onChange,
//     disabled = false
// }) => {
//     const [dateValue, setDateValue] = useState('')
//     const [timeValue, setTimeValue] = useState('00:00')
//     const [showTime, setShowTime] = useState(false)

//     useEffect(() => {
//         if (value) {
//             const date = new Date(value)
//             setDateValue(date.toISOString().slice(0, 10))
//             setTimeValue(date.toTimeString().slice(0, 5))
//             setShowTime(true)
//         }
//     }, [value])

//     const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const newDate = e.target.value
//         setDateValue(newDate)
        
//         if (newDate) {
//             setShowTime(true)
//             const dateTime = `${newDate}T${timeValue}`
//             onChange(dateTime)
//         } else {
//             setShowTime(false)
//             onChange('')
//         }
//     }

//     const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const newTime = e.target.value
//         setTimeValue(newTime)
        
//         if (dateValue) {
//             const dateTime = `${dateValue}T${newTime}`
//             onChange(dateTime)
//         }
//     }

//     const styles: Record<string, CSSProperties> = {
//         container: {
//             display: 'flex',
//             flexDirection: 'column' as const,
//             gap: '6px'
//         },
//         inputGroup: {
//             display: 'flex',
//             gap: '8px',
//             alignItems: 'center'
//         },
//         input: {
//             padding: '9px 12px',
//             border: '1px solid #d1d5db',
//             borderRadius: '8px',
//             fontSize: '13px',
//             color: '#374151',
//             background: disabled ? '#f9fafb' : '#fff',
//             outline: 'none',
//             flex: 1,
//             cursor: disabled ? 'not-allowed' : 'pointer'
//         },
//         timeInput: {
//             padding: '9px 12px',
//             border: '1px solid #d1d5db',
//             borderRadius: '8px',
//             fontSize: '13px',
//             color: '#374151',
//             background: '#fff',
//             outline: 'none',
//             width: '80px',
//             cursor: 'pointer'
//         },
//         icon: {
//             color: '#6b7280',
//             flexShrink: 0
//         },
//         timeContainer: {
//             display: 'flex',
//             alignItems: 'center',
//             gap: '8px',
//             marginTop: '4px',
//             opacity: showTime ? 1 : 0,
//             transform: showTime ? 'translateY(0)' : 'translateY(-10px)',
//             transition: 'all 0.3s ease',
//             visibility: showTime ? 'visible' : 'hidden',
//             height: showTime ? 'auto' : '0',
//             overflow: 'hidden'
//         },
//         timeLabel: {
//             fontSize: '12px',
//             color: '#6b7280',
//             fontWeight: 500,
//             minWidth: '35px'
//         }
//     }

//     return (
//         <div style={styles.container}>
//             <div style={styles.inputGroup}>
//                 <Calendar size={14} style={styles.icon} />
//                 <input
//                     type="date"
//                     value={dateValue}
//                     onChange={handleDateChange}
//                     style={styles.input}
//                     disabled={disabled}
//                 />
//             </div>
            
//             <div style={styles.timeContainer}>
//                 <Clock size={14} style={styles.icon} />
//                 <span style={styles.timeLabel}>Time:</span>
//                 <input
//                     type="time"
//                     value={timeValue}
//                     onChange={handleTimeChange}
//                     style={styles.timeInput}
//                     disabled={!dateValue || disabled}
//                 />
//             </div>
//         </div>
//     )
// }

// export default DateTimeInput