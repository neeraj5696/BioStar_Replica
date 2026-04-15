
import Header from '../components/Header'
import { UserCheck, Plus, Edit, Trash2, Search } from 'lucide-react'
import '../App.css'

const UserManagement = () => {
  return (
    <div className="app">
      <Header currentPage="reports-management">
        <div className="content-header">
          <h1 className="content-title">User Management</h1>
          <div className="organization-name">Manage System Users</div>
        </div>
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: '20px'
        }}>
          {/* Action Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'white',
            padding: '16px 20px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <UserCheck size={20} color="#3b82f6" />
              <span style={{ fontWeight: 600, color: '#374151' }}>Total Users: 156</span>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                background: '#f3f4f6',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '13px',
                cursor: 'pointer'
              }}>
                <Search size={14} /> Search Users
              </button>
              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                border: 'none',
                borderRadius: '8px',
                fontSize: '13px',
                color: 'white',
                cursor: 'pointer'
              }}>
                <Plus size={14} /> Add User
              </button>
            </div>
          </div>

          {/* Users Table */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid #f3f4f6',
              fontWeight: 600,
              color: '#374151'
            }}>
              User List
            </div>
            <div style={{ padding: '20px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #f3f4f6' }}>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>ID</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Name</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Department</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Status</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[1,2,3,4,5].map(i => (
                    <tr key={i} style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '12px', color: '#374151' }}>EMP00{i}</td>
                      <td style={{ padding: '12px', color: '#374151', fontWeight: 500 }}>User {i}</td>
                      <td style={{ padding: '12px', color: '#6b7280' }}>IT Department</td>
                      <td style={{ padding: '12px' }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: 600,
                          backgroundColor: '#dcfce7',
                          color: '#166534'
                        }}>
                          Active
                        </span>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button style={{
                            padding: '4px 8px',
                            background: '#dbeafe',
                            border: '1px solid #93c5fd',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}>
                            <Edit size={12} color="#1d4ed8" />
                          </button>
                          <button style={{
                            padding: '4px 8px',
                            background: '#fee2e2',
                            border: '1px solid #fca5a5',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}>
                            <Trash2 size={12} color="#dc2626" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Header>
    </div>
  )
}

export default UserManagement