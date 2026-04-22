import React, { useState, useRef, useEffect, useMemo } from 'react'
import { ChevronDown, X, Check } from 'lucide-react'

interface Option {
    id: string
    name: string
}

interface MultiSelectDropdownProps {
    options: Option[]
    selectedIds: string[]
    onSelect: (ids: string[]) => void
    placeholder: string
    searchPlaceholder: string
    disabled?: boolean
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
    options,
    selectedIds,
    onSelect,
    placeholder,
    searchPlaceholder,
    disabled = false
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Memoize filtered options for performance
    const filteredOptions = useMemo(() => {
        if (!searchTerm) return options.slice(0, 100) // Limit initial display
        return options.filter(option =>
            option.name.toLowerCase().includes(searchTerm.toLowerCase())
        ).slice(0, 50) // Limit search results
    }, [options, searchTerm])

    const selectedOptions = useMemo(() => 
        options.filter(option => selectedIds.includes(option.id)),
        [options, selectedIds]
    )

    const handleToggleOption = (optionId: string) => {
        const newSelectedIds = selectedIds.includes(optionId)
            ? selectedIds.filter(id => id !== optionId)
            : [...selectedIds, optionId]
        onSelect(newSelectedIds)
    }

    const handleRemoveOption = (optionId: string) => {
        onSelect(selectedIds.filter(id => id !== optionId))
    }

    const handleSelectAll = () => {
        // Only select filtered options to avoid performance issues
        const filteredIds = filteredOptions.map(option => option.id)
        const newSelectedIds = [...new Set([...selectedIds, ...filteredIds])]
        onSelect(newSelectedIds)
    }

    const handleClearAll = () => {
        onSelect([])
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
                setSearchTerm('')
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const styles = {
        container: {
            position: 'relative' as const,
            width: '100%'
        },
        trigger: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 12px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            backgroundColor: disabled ? '#f9fafb' : '#fff',
            cursor: disabled ? 'not-allowed' : 'pointer',
            minHeight: '38px',
            fontSize: '14px'
        },
        selectedItems: {
            display: 'flex',
            flexWrap: 'wrap' as const,
            gap: '4px',
            flex: 1,
            maxHeight: '60px',
            overflowY: 'auto' as const
        },
        selectedItem: {
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '2px 6px',
            backgroundColor: '#e0e7ff',
            borderRadius: '4px',
            fontSize: '12px',
            color: '#3730a3',
            maxWidth: '120px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap' as const
        },
        removeBtn: {
            cursor: 'pointer',
            color: '#6b7280',
            flexShrink: 0
        },
        dropdown: {
            position: 'absolute' as const,
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: '#fff',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            maxHeight: '300px',
            overflow: 'hidden'
        },
        searchInput: {
            width: '100%',
            padding: '8px 12px',
            border: 'none',
            borderBottom: '1px solid #e5e7eb',
            outline: 'none',
            fontSize: '14px'
        },
        actions: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '8px 12px',
            borderBottom: '1px solid #e5e7eb',
            fontSize: '12px',
            backgroundColor: '#f9fafb'
        },
        actionBtn: {
            cursor: 'pointer',
            color: '#3b82f6',
            textDecoration: 'none',
            padding: '2px 6px',
            borderRadius: '4px',
            transition: 'background-color 0.2s'
        },
        optionsList: {
            maxHeight: '180px',
            overflowY: 'auto' as const
        },
        option: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 12px',
            cursor: 'pointer',
            fontSize: '14px',
            borderBottom: '1px solid #f3f4f6',
            transition: 'background-color 0.1s'
        },
        optionSelected: {
            backgroundColor: '#f0f9ff'
        },
        optionHover: {
            backgroundColor: '#f9fafb'
        },
        checkbox: {
            width: '16px',
            height: '16px',
            border: '1px solid #d1d5db',
            borderRadius: '3px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            flexShrink: 0
        },
        checkboxChecked: {
            backgroundColor: '#3b82f6',
            borderColor: '#3b82f6'
        },
        selectedCount: {
            fontSize: '11px',
            color: '#6b7280',
            backgroundColor: '#f3f4f6',
            padding: '2px 6px',
            borderRadius: '10px',
            marginLeft: '4px'
        }
    }

    return (
        <div ref={dropdownRef} style={styles.container}>
            <div
                style={styles.trigger}
                onClick={() => !disabled && setIsOpen(!isOpen)}
            >
                <div style={styles.selectedItems}>
                    {selectedOptions.length === 0 ? (
                        <span style={{ color: '#9ca3af' }}>{placeholder}</span>
                    ) : (
                        <>
                            {selectedOptions.slice(0, 3).map(option => (
                                <div key={option.id} style={styles.selectedItem} title={option.name}>
                                    <span>{option.name}</span>
                                    <X
                                        size={12}
                                        style={styles.removeBtn}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleRemoveOption(option.id)
                                        }}
                                    />
                                </div>
                            ))}
                            {selectedOptions.length > 3 && (
                                <span style={styles.selectedCount}>
                                    +{selectedOptions.length - 3} more
                                </span>
                            )}
                        </>
                    )}
                </div>
                <ChevronDown size={16} color="#6b7280" />
            </div>

            {isOpen && (
                <div style={styles.dropdown}>
                    <input
                        type="text"
                        placeholder={searchPlaceholder}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={styles.searchInput}
                        autoFocus
                    />
                    <div style={styles.actions}>
                        <span 
                            style={styles.actionBtn} 
                            onClick={handleSelectAll}
                            title={`Select all ${filteredOptions.length} filtered items`}
                        >
                            Select All ({filteredOptions.length})
                        </span>
                        <span style={styles.actionBtn} onClick={handleClearAll}>
                            Clear All
                        </span>
                    </div>
                    <div style={styles.optionsList}>
                        {filteredOptions.map(option => {
                            const isSelected = selectedIds.includes(option.id)
                            return (
                                <div
                                    key={option.id}
                                    style={{
                                        ...styles.option,
                                        ...(isSelected ? styles.optionSelected : {})
                                    }}
                                    onClick={() => handleToggleOption(option.id)}
                                    onMouseEnter={(e) => {
                                        if (!isSelected) {
                                            e.currentTarget.style.backgroundColor = '#f9fafb'
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isSelected) {
                                            e.currentTarget.style.backgroundColor = 'transparent'
                                        }
                                    }}
                                >
                                    <div style={{
                                        ...styles.checkbox,
                                        ...(isSelected ? styles.checkboxChecked : {})
                                    }}>
                                        {isSelected && <Check size={10} color="#fff" />}
                                    </div>
                                    <span>{option.name}</span>
                                </div>
                            )
                        })}
                        {searchTerm && filteredOptions.length === 0 && (
                            <div style={{ padding: '16px', textAlign: 'center', color: '#9ca3af', fontSize: '14px' }}>
                                No results found
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default MultiSelectDropdown