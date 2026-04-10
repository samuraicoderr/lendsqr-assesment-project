import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { 
  FaFilter, 
  FaEllipsisV, 
  FaEye, 
  FaUserSlash, 
  FaUserCheck,
  FaCalendarAlt,
  FaChevronDown,
  FaTimes
} from 'react-icons/fa';
import styles from './GenericTable.module.scss';

// ============================================
// Type Definitions
// ============================================

export type FilterType = 'text' | 'select' | 'date' | 'number' | 'email' | 'phone';

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterConfig {
  key: string;
  label: string;
  type: FilterType;
  placeholder?: string;
  options?: FilterOption[]; // For select type
}

export interface FilterValues {
  [key: string]: string;
}

export interface RowAction {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick: (row: any, index: number) => void;
  className?: string;
}

export interface Column<T = any> {
  key: string;
  title: string;
  width?: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, row: T, index: number) => React.ReactNode;
}

export interface GenericTableProps<T = any> {
  columns: Column<T>[];
  data: T[];
  filters?: FilterConfig[];
  rowActions?: RowAction[];
  showRowActions?: boolean;
  onFilter?: (filters: FilterValues) => void;
  onReset?: () => void;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
  tableClassName?: string;
  headerClassName?: string;
  rowClassName?: string;
  maxHeight?: string;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
}

// ============================================
// Helper Components
// ============================================

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const normalizedStatus = status?.toLowerCase() || '';
  
  const getStatusConfig = () => {
    switch (normalizedStatus) {
      case 'active':
        return {
          bg: 'rgba(57, 205, 98, 0.06)',
          color: '#39CD62',
          label: 'Active'
        };
      case 'inactive':
        return {
          bg: 'rgba(84, 95, 125, 0.06)',
          color: '#545F7D',
          label: 'Inactive'
        };
      case 'pending':
        return {
          bg: 'rgba(233, 178, 0, 0.1)',
          color: '#E9B200',
          label: 'Pending'
        };
      case 'blacklisted':
        return {
          bg: 'rgba(228, 3, 59, 0.1)',
          color: '#E4033B',
          label: 'Blacklisted'
        };
      default:
        return {
          bg: 'rgba(84, 95, 125, 0.06)',
          color: '#545F7D',
          label: status || 'Unknown'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <span 
      className={styles.statusBadge}
      style={{ 
        backgroundColor: config.bg, 
        color: config.color 
      }}
    >
      {config.label}
    </span>
  );
};

// ============================================
// Main Component
// ============================================

function GenericTable<T extends Record<string, any>>({
  columns,
  data,
  filters = [],
  rowActions = [],
  showRowActions = true,
  onFilter,
  onReset,
  loading = false,
  emptyMessage = 'No data available',
  className = '',
  tableClassName = '',
  headerClassName = '',
  rowClassName = '',
  maxHeight,
  pagination
}: GenericTableProps<T>) {
  // State
  const [activeFilterColumn, setActiveFilterColumn] = useState<string | null>(null);
  const [filterValues, setFilterValues] = useState<FilterValues>({});
  const [activeRowMenu, setActiveRowMenu] = useState<number | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  // Refs
  const filterDropdownRef = useRef<HTMLDivElement>(null);
  const rowMenuRefs = useRef<(HTMLDivElement | null)[]>([]);
  const filterButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close filter dropdown
      if (
        activeFilterColumn &&
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target as Node) &&
        !filterButtonRefs.current.some(ref => ref?.contains(event.target as Node))
      ) {
        setActiveFilterColumn(null);
      }

      // Close row menu
      if (
        activeRowMenu !== null &&
        rowMenuRefs.current[activeRowMenu] &&
        !rowMenuRefs.current[activeRowMenu]?.contains(event.target as Node)
      ) {
        setActiveRowMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeFilterColumn, activeRowMenu]);

  // Handle filter input change
  const handleFilterChange = useCallback((key: string, value: string) => {
    setFilterValues(prev => ({ ...prev, [key]: value }));
  }, []);

  // Apply filters
  const handleApplyFilters = useCallback(() => {
    onFilter?.(filterValues);
    setActiveFilterColumn(null);
  }, [filterValues, onFilter]);

  // Reset filters
  const handleResetFilters = useCallback(() => {
    setFilterValues({});
    onReset?.();
    setActiveFilterColumn(null);
  }, [onReset]);

  // Toggle filter dropdown
  const toggleFilterDropdown = useCallback((columnKey: string) => {
    setActiveFilterColumn(prev => prev === columnKey ? null : columnKey);
    setActiveRowMenu(null);
  }, []);

  // Toggle row menu
  const toggleRowMenu = useCallback((index: number) => {
    setActiveRowMenu(prev => prev === index ? null : index);
    setActiveFilterColumn(null);
  }, []);

  // Handle sort
  const handleSort = useCallback((columnKey: string) => {
    setSortConfig(prev => {
      if (!prev || prev.key !== columnKey) {
        return { key: columnKey, direction: 'asc' };
      }
      if (prev.direction === 'asc') {
        return { key: columnKey, direction: 'desc' };
      }
      return null;
    });
  }, []);

  // Get current filter config
  const currentFilterConfig = useMemo(() => 
    filters.find(f => f.key === activeFilterColumn),
  [filters, activeFilterColumn]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig) return data;
    
    return [...data].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  // Default render for cell
  const defaultRenderCell = (value: any, column: Column<T>, row: T, index: number) => {
    if (column.key === 'status' || column.key.toLowerCase().includes('status')) {
      return <StatusBadge status={value} />;
    }
    return value;
  };

  return (
    <div className={`${styles.tableContainer} ${className}`} style={{ maxHeight }}>
      <div className={`${styles.tableWrapper} ${tableClassName}`}>
        <table className={styles.table}>
          <thead className={`${styles.tableHead} ${headerClassName}`}>
            <tr>
              {columns.map((column, index) => (
                <th 
                  key={column.key}
                  className={styles.tableHeaderCell}
                  style={{ width: column.width }}
                >
                  <div className={styles.headerCellContent}>
                    <span 
                      className={`${styles.headerTitle} ${column.sortable ? styles.sortable : ''}`}
                      onClick={() => column.sortable && handleSort(column.key)}
                    >
                      {column.title}
                      {column.sortable && sortConfig?.key === column.key && (
                        <span className={styles.sortIndicator}>
                          {sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}
                        </span>
                      )}
                    </span>
                    
                    {column.filterable && filters.some(f => f.key === column.key) && (
                      <button
                        ref={(el) => {
                          filterButtonRefs.current[index] = el;
                        }}
                        className={`${styles.filterButton} ${activeFilterColumn === column.key ? styles.filterButtonActive : ''}`}
                        onClick={() => toggleFilterDropdown(column.key)}
                        aria-label={`Filter by ${column.title}`}
                        aria-expanded={activeFilterColumn === column.key}
                      >
                        <FaFilter />
                      </button>
                    )}
                  </div>

                  {/* Filter Dropdown */}
                  {activeFilterColumn === column.key && currentFilterConfig && (
                    <div 
                      ref={filterDropdownRef}
                      className={styles.filterDropdown}
                      role="dialog"
                      aria-label={`Filter ${currentFilterConfig.label}`}
                    >
                      <div className={styles.filterDropdownHeader}>
                        <span className={styles.filterDropdownTitle}>{currentFilterConfig.label}</span>
                        <button 
                          className={styles.filterCloseButton}
                          onClick={() => setActiveFilterColumn(null)}
                          aria-label="Close filter"
                        >
                          <FaTimes />
                        </button>
                      </div>

                      <div className={styles.filterDropdownContent}>
                        {currentFilterConfig.type === 'select' ? (
                          <div className={styles.filterSelectWrapper}>
                            <select
                              className={styles.filterSelect}
                              value={filterValues[currentFilterConfig.key] || ''}
                              onChange={(e) => handleFilterChange(currentFilterConfig.key, e.target.value)}
                            >
                              <option value="">Select {currentFilterConfig.label}</option>
                              {currentFilterConfig.options?.map(option => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                            <FaChevronDown className={styles.filterSelectIcon} />
                          </div>
                        ) : currentFilterConfig.type === 'date' ? (
                          <div className={styles.filterInputWrapper}>
                            <input
                              type="date"
                              className={styles.filterInput}
                              placeholder={currentFilterConfig.placeholder || `Enter ${currentFilterConfig.label}`}
                              value={filterValues[currentFilterConfig.key] || ''}
                              onChange={(e) => handleFilterChange(currentFilterConfig.key, e.target.value)}
                            />
                            <FaCalendarAlt className={styles.filterInputIcon} />
                          </div>
                        ) : (
                          <input
                            type={
                              currentFilterConfig.type === 'number'
                                ? 'number'
                                : currentFilterConfig.type === 'email'
                                  ? 'email'
                                  : currentFilterConfig.type === 'phone'
                                    ? 'tel'
                                    : 'text'
                            }
                            className={styles.filterInput}
                            placeholder={currentFilterConfig.placeholder || `Enter ${currentFilterConfig.label}`}
                            value={filterValues[currentFilterConfig.key] || ''}
                            onChange={(e) => handleFilterChange(currentFilterConfig.key, e.target.value)}
                          />
                        )}
                      </div>

                      <div className={styles.filterDropdownFooter}>
                        <button 
                          className={styles.filterResetButton}
                          onClick={handleResetFilters}
                        >
                          Reset
                        </button>
                        <button 
                          className={styles.filterApplyButton}
                          onClick={handleApplyFilters}
                        >
                          Filter
                        </button>
                      </div>
                    </div>
                  )}
                </th>
              ))}
              
              {showRowActions && rowActions.length > 0 && (
                <th className={`${styles.tableHeaderCell} ${styles.actionsHeaderCell}`} style={{ width: '60px' }}>
                  <span className={styles.headerTitle}>Actions</span>
                </th>
              )}
            </tr>
          </thead>

          <tbody className={styles.tableBody}>
            {loading ? (
              <tr>
                <td 
                  colSpan={columns.length + (showRowActions && rowActions.length > 0 ? 1 : 0)} 
                  className={styles.loadingCell}
                >
                  <div className={styles.loadingSpinner}>
                    <div className={styles.spinner} />
                    <span>Loading...</span>
                  </div>
                </td>
              </tr>
            ) : sortedData.length === 0 ? (
              <tr>
                <td 
                  colSpan={columns.length + (showRowActions && rowActions.length > 0 ? 1 : 0)} 
                  className={styles.emptyCell}
                >
                  <div className={styles.emptyState}>
                    <span>{emptyMessage}</span>
                  </div>
                </td>
              </tr>
            ) : (
              sortedData.map((row, rowIndex) => (
                <tr 
                  key={rowIndex} 
                  className={`${styles.tableRow} ${rowClassName}`}
                >
                  {columns.map(column => (
                    <td key={column.key} className={styles.tableCell}>
                      <div className={styles.cellContent}>
                        {column.render 
                          ? column.render(row[column.key], row, rowIndex)
                          : defaultRenderCell(row[column.key], column, row, rowIndex)
                        }
                      </div>
                    </td>
                  ))}

                  {showRowActions && rowActions.length > 0 && (
                    <td className={`${styles.tableCell} ${styles.actionsCell}`}>
                      <div 
                        className={styles.rowActionsWrapper}
                        ref={(el) => {
                          rowMenuRefs.current[rowIndex] = el;
                        }}
                      >
                        <button
                          className={`${styles.rowMenuButton} ${activeRowMenu === rowIndex ? styles.rowMenuButtonActive : ''}`}
                          onClick={() => toggleRowMenu(rowIndex)}
                          aria-label="More actions"
                          aria-expanded={activeRowMenu === rowIndex}
                        >
                          <FaEllipsisV />
                        </button>

                        {activeRowMenu === rowIndex && (
                          <div 
                            className={styles.rowMenuDropdown}
                            role="menu"
                          >
                            {rowActions.map(action => (
                              <button
                                key={action.id}
                                className={`${styles.rowMenuItem} ${action.className || ''}`}
                                onClick={() => {
                                  action.onClick(row, rowIndex);
                                  setActiveRowMenu(null);
                                }}
                                role="menuitem"
                              >
                                {action.icon && (
                                  <span className={styles.rowMenuItemIcon}>{action.icon}</span>
                                )}
                                <span className={styles.rowMenuItemLabel}>{action.label}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.paginationButton}
            onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
            aria-label="Previous page"
          >
            Previous
          </button>
          
          <div className={styles.paginationPages}>
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={`${styles.paginationPage} ${page === pagination.currentPage ? styles.paginationPageActive : ''}`}
                onClick={() => pagination.onPageChange(page)}
                aria-label={`Page ${page}`}
                aria-current={page === pagination.currentPage ? 'page' : undefined}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            className={styles.paginationButton}
            onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPages}
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default GenericTable;