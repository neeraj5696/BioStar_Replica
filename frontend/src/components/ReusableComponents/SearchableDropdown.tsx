import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import { Funnel,  X } from 'lucide-react'

interface DropdownOption {
    id: string
    name: string
}

interface SearchableDropdownProps {
    options: DropdownOption[]
    selectedId: string
    onSelect: (id: string) => void
    placeholder?: string
    searchPlaceholder?: string
    disabled?: boolean
    maxInitialItems?: number
    maxSearchResults?: number
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
    options,
    selectedId,
    onSelect,
    placeholder = "All Items",
    searchPlaceholder = "Search items...",
    disabled = false,
    maxInitialItems = 100,
    maxSearchResults = 100
}) => {
    const [isSearchMode, setIsSearchMode] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const searchInputRef = useRef<HTMLInputElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const filteredOptions = useMemo(() => {
        if (!searchTerm) return options.slice(0, maxInitialItems)
        return options.filter(option => 
            option.name.toLowerCase().includes(searchTerm.toLowerCase())
        ).slice(0, maxSearchResults)
    }, [options, searchTerm, maxInitialItems, maxSearchResults])

    const selectedOption = useMemo(() => 
        options.find(option => option.id === selectedId), [options, selectedId]
    )

    const handleSearchToggle = useCallback(() => {
        setIsSearchMode(true)
        setIsOpen(true)
        setTimeout(() => searchInputRef.current?.focus(), 0)
    }, [])

    const handleSelect = useCallback((id: string) => {
        onSelect(id)
        setIsOpen(false)
        setIsSearchMode(false)
        setSearchTerm('')
    }, [onSelect])

    const handleClear = useCallback(() => {
        onSelect('')
        setIsSearchMode(false)
        setSearchTerm('')
    }, [onSelect])

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            // Debounce is handled by useMemo dependency
        }, 300)
        return () => clearTimeout(timer)
    }, [searchTerm])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
                setIsSearchMode(false)
                setSearchTerm('')
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    if (isSearchMode) {
        return (
            <div ref={dropdownRef} style={styles.selectWrap}>
                <div style={styles.searchInputWrap}>
                    <input
                        ref={searchInputRef}
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder={searchPlaceholder}
                        style={styles.searchInput}
                        disabled={disabled}
                    />
                    <Funnel size={18} style={styles.searchInputIcon} />
                </div>
                {isOpen && (
                    <div style={styles.dropdownList}>
                        <div 
                            style={styles.dropdownItem}
                            onClick={() => handleSelect('')}
                        >
                            {placeholder}
                        </div>
                        {filteredOptions.map(option => (
                            <div
                                key={option.id}
                                style={styles.dropdownItem}
                                onClick={() => handleSelect(option.id)}
                            >
                                {option.name}
                            </div>
                        ))}
                        {searchTerm && filteredOptions.length === 0 && (
                            <div style={styles.dropdownNoResults}>No items found</div>
                        )}
                    </div>
                )}
            </div>
        )
    }

    return (
        <div ref={dropdownRef} style={styles.selectWrap}>
            <div style={styles.itemDisplay} onClick={() => !disabled && setIsOpen(!isOpen)}>
                <span style={styles.itemDisplayText}>
                    {selectedOption ? selectedOption.name : placeholder}
                </span>
                <div style={styles.itemActions}>
                    {selectedId && (
                        <X 
                            size={12} 
                            style={styles.clearIcon} 
                            onClick={(e) => {
                                e.stopPropagation()
                                handleClear()
                            }}
                        />
                    )}
                    <Funnel
                        size={18} 
                        style={styles.searchIcon} 
                        onClick={(e) => {
                            e.stopPropagation()
                            handleSearchToggle()
                        }}
                    />
                   
                </div>
            </div>
            {isOpen && (
                <div style={styles.dropdownList}>
                    <div 
                        style={styles.dropdownItem}
                        onClick={() => handleSelect('')}
                    >
                        {placeholder}
                    </div>
                    {options.slice(0, maxInitialItems).map(option => (
                        <div
                            key={option.id}
                            style={{
                                ...styles.dropdownItem,
                                ...(option.id === selectedId ? styles.dropdownItemSelected : {})
                            }}
                            onClick={() => handleSelect(option.id)}
                        >
                            {option.name}
                        </div>
                    ))}
                    {options.length > maxInitialItems && (
                        <div style={styles.dropdownInfo}>
                            Showing first {maxInitialItems} items. Use search for more.
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

const styles: Record<string, React.CSSProperties> = {
    selectWrap: { position: 'relative' },
    itemDisplay: { 
        width: '100%', 
        padding: '9px 12px', 
        border: '1px solid #d1d5db', 
        borderRadius: '8px', 
        fontSize: '13px', 
        color: '#374151', 
        background: '#f9fafb', 
        cursor: 'pointer', 
        outline: 'none', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
    },
    itemDisplayText: { 
        flex: 1, 
        overflow: 'hidden', 
        textOverflow: 'ellipsis', 
        whiteSpace: 'nowrap' 
    },
    itemActions: { 
        display: 'flex', 
        alignItems: 'center', 
        gap: '6px', 
        flexShrink: 0 
    },
    searchIcon: { 
        color: 'rgb(55, 65, 81)', 
        cursor: 'pointer', 
        padding: '2px', 
        borderRadius: '3px', 
        transition: 'background 0.2s' 
    },
    clearIcon: { 
        color: '#ef4444', 
        cursor: 'pointer', 
        padding: '2px', 
        borderRadius: '3px', 
        transition: 'background 0.2s' 
    },
    searchInputWrap: { 
        position: 'relative', 
        width: '100%' 
    },
    searchInput: { 
        width: '100%', 
        padding: '9px 32px 9px 12px', 
        border: '1px solid #3b82f6', 
        borderRadius: '8px', 
        fontSize: '13px', 
        color: '#374151', 
        background: '#fff', 
        outline: 'none' 
    },
    searchInputIcon: { 
        position: 'absolute', 
        right: '10px', 
        top: '50%', 
        transform: 'translateY(-50%)', 
        color: '#3b82f6', 
        pointerEvents: 'none' 
    },
    dropdownList: { 
        position: 'absolute', 
        top: '100%', 
        left: 0, 
        right: 0, 
        background: '#fff', 
        border: '1px solid #d1d5db', 
        borderRadius: '8px', 
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
        zIndex: 1000, 
        maxHeight: '400px', 
        overflowY: 'auto', 
        marginTop: '2px' 
    },
    dropdownItem: { 
        padding: '8px 12px', 
        fontSize: '13px', 
        color: '#374151', 
        cursor: 'pointer', 
        borderBottom: '1px solid #f3f4f6', 
        transition: 'background 0.15s' 
    },
    dropdownItemSelected: { 
        background: '#eff6ff', 
        color: '#1d4ed8' 
    },
    dropdownNoResults: { 
        padding: '12px', 
        fontSize: '13px', 
        color: '#9ca3af', 
        textAlign: 'center', 
        fontStyle: 'italic' 
    },
    dropdownInfo: { 
        padding: '8px 12px', 
        fontSize: '11px', 
        color: '#6b7280', 
        background: '#f9fafb', 
        textAlign: 'center', 
        borderTop: '1px solid #f3f4f6' 
    }
}

export default SearchableDropdown