
import Header from '../components/Header'
import { UserCog, Save, RefreshCw } from 'lucide-react'
import '../App.css'

const UserSettings = () => {
  return (
    <div className="app">
      <Header currentPage="reports-settings">
        <div className="content-header">
          <h1 className="content-title">User Settings</h1>
          <div className="organization-name">Configure User Preferences</div>
        </div>
        
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px'
        }}>
          {/* General Settings */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '20px',
              paddingBottom: '12px',
              borderBottom: '1px solid #f3f4f6'
            }}>
              <UserCog size={20} color="#3b82f6" />
              <h3 style={{ margin: 0, fontWeight: 600, color: '#374151' }}>General Settings</h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6b7280', marginBottom: '6px' }}>
                  Default User Role
                </label>
                <select style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '13px'
                }}>
                  <option>Employee</option>
                  <option>Manager</option>
                  <option>Admin</option>
                </select>
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6b7280', marginBottom: '6px' }}>
                  Session Timeout (minutes)
                </label>
                <input 
                  type="number" 
                  defaultValue="30"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '13px'
                  }}
                />
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input type="checkbox" id="autoLogout" defaultChecked />
                <label htmlFor="autoLogout" style={{ fontSize: '13px', color: '#374151' }}>
                  Enable automatic logout
                </label>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '20px',
              paddingBottom: '12px',
              borderBottom: '1px solid #f3f4f6'
            }}>
              <UserCog size={20} color="#ef4444" />
              <h3 style={{ margin: 0, fontWeight: 600, color: '#374151' }}>Security Settings</h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6b7280', marginBottom: '6px' }}>
                  Password Policy
                </label>
                <select style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '13px'
                }}>
                  <option>Standard (8+ chars)</option>
                  <option>Strong (12+ chars, mixed)</option>
                  <option>Very Strong (16+ chars, symbols)</option>
                </select>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input type="checkbox" id="twoFactor" />
                <label htmlFor="twoFactor" style={{ fontSize: '13px', color: '#374151' }}>
                  Require two-factor authentication
                </label>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input type="checkbox" id="loginNotify" defaultChecked />
                <label htmlFor="loginNotify" style={{ fontSize: '13px', color: '#374151' }}>
                  Email notifications for new logins
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{
            gridColumn: 'span 2',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px',
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
          }}>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 20px',
              background: '#f3f4f6',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '13px',
              cursor: 'pointer'
            }}>
              <RefreshCw size={14} /> Reset to Default
            </button>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              border: 'none',
              borderRadius: '8px',
              fontSize: '13px',
              color: 'white',
              cursor: 'pointer'
            }}>
              <Save size={14} /> Save Settings
            </button>
          </div>
        </div>
      </Header>
    </div>
  )
}

export default UserSettings