import {
  Settings,
  Cable,
  Info,
  HelpCircle,
  LogOut,
  User,
  BarChart3,
  Users,
  Smartphone,
  DoorOpen,
  Building2,
  MapPin,
  Shield,
  Eye,
  Clock,
  FileText,
  ChevronDown,
  ChevronRight,
  UserCheck,
  Timer,
  ArrowRightLeft,
  Coffee,
  AlertCircle,
  
  Key,
  Route,
  PauseCircle,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";



interface HeaderProps {
  currentPage?: string;
  children: React.ReactNode;
}

const Header = ({ currentPage = "dashboard", children }: HeaderProps) => {
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handlelogout = () => {
    // Add logout logic here
    console.log("Logout clicked");
    localStorage.removeItem('lebhai');
    window.location.href = "/";
  }

  const toggleMenu = (menuName: string) => {
    setExpandedMenus(prev =>
      prev.includes(menuName)
        ? prev.filter(m => m !== menuName)
        : [...prev, menuName]
    );
  };

  const isReportPage = currentPage.startsWith('report') || currentPage === 'reports' || currentPage === 'firstinlastout' || currentPage === 'cafeteria' || currentPage === 'missing_punches' || currentPage === 'enrolled_employees' || currentPage === 'doors' || currentPage === 'access_groups' || currentPage === 'tracking-emp-report' || currentPage === 'breakhours' || currentPage === 'firstinlastout' || currentPage === 'time-profile-door-access';
  const isExpanded = expandedMenus.includes('reports') || isReportPage;
  return (
    <>
      <header className="header">
        <div className="header-left">
          <button className="mobile-menu-btn" onClick={toggleSidebar}>
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="logo-container">
            <div className="logo-icon">🔬</div>
            <h1 className="logo">BioStar 2</h1>
          </div>
          <nav className="header-nav">
            <a href="#" className="nav-link">
              <Settings size={18} className="nav-icon" />
              <span>Settings</span>
            </a>
            <a href="#" className="nav-link">
              <Cable size={18} className="nav-icon" />
              <span>Port</span>
            </a>
            <a href="#" className="nav-link">
              <Info size={18} className="nav-icon" />
              <span>About</span>
            </a>
            <a href="#" className="nav-link">
              <HelpCircle size={18} className="nav-icon" />
              <span>Help</span>
            </a>
          </nav>
        </div>
        <div className="header-right">
          <div className="user-info">
            <div className="user-avatar">
              <User size={20} />
            </div>
            <div className="user-details">
              <div className="user-name">User</div>
              <div className="user-role">Administrator</div>
            </div>
            <button className="logout-btn" onClick={handlelogout}>
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      <div className="main-container">
        {sidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}
        <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <nav className="sidebar-nav">
            <a href="/dashboard" className={`sidebar-item ${currentPage === "dashboard" ? "active" : ""}`}>
              <BarChart3 size={20} className="sidebar-icon" />
              <span>DASHBOARD</span>
            </a>

            {/* REPORT Menu with Submenu */}
            <div className="sidebar-menu-group">
              <div
                className={`sidebar-item ${isReportPage ? "active" : ""}`}
                onClick={() => toggleMenu('reports')}
                style={{ cursor: 'pointer' }}
              >
                <FileText size={20} className="sidebar-icon" />
                <span>REPORT</span>
                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </div>

              {isExpanded && (
                <div className="sidebar-submenu">
                  <a href="/reports" className={`sidebar-subitem ${currentPage === "reports" ? "active" : ""}`}>
                    <Timer size={14} className="sidebar-icon" />
                    <span>Firstin-Lastout</span>
                  </a>
                  <a href="/reports/firstinlastout" className={`sidebar-subitem ${currentPage === "firstinlastout" ? "active" : ""}`}>
                    <ArrowRightLeft size={14} className="sidebar-icon" />
                    <span>First in Last Out</span>
                  </a>
                  <a href="/reports/cafeteria" className={`sidebar-subitem ${currentPage === "cafeteria" ? "active" : ""}`}>
                    <Coffee size={14} className="sidebar-icon" />
                    <span>Cafe Area Reports</span>
                  </a>
                  <a href="/reports/missing_punches" className={`sidebar-subitem ${currentPage === "missing_punches" ? "active" : ""}`}>
                    <AlertCircle size={14} className="sidebar-icon" />
                    <span>Missing Punches Reports</span>
                  </a>
                  <a href="/reports/enrolled_employees" className={`sidebar-subitem ${currentPage === "enrolled_employees" ? "active" : ""}`}>
                    <UserCheck size={14} className="sidebar-icon" />
                    <span>Enrolled Employees</span>
                  </a>
                  <a href="/reports/doors" className={`sidebar-subitem ${currentPage === "doors" ? "active" : ""}`}>
                    <DoorOpen size={14} className="sidebar-icon" />
                    <span>Doors</span>
                  </a>
                  <a href="/reports/access_groups" className={`sidebar-subitem ${currentPage === "access_groups" ? "active" : ""}`}>
                    <Key size={14} className="sidebar-icon" />
                    <span>Access-groups</span>
                  </a>
                  <a href="/reports/tracking-emp-report" className={`sidebar-subitem ${currentPage === "tracking-emp-report" ? "active" : ""}`}>
                    <Route size={14} className="sidebar-icon" />
                    <span>Tracking-emp-report</span>
                  </a>
                  <a href="/reports/breakhours" className={`sidebar-subitem ${currentPage === "breakhours" ? "active" : ""}`}>
                    <PauseCircle size={14} className="sidebar-icon" />
                    <span>Breakhrs-report</span>
                  </a>
                   <a href="/reports/time-profile-door-access" className={`sidebar-subitem ${currentPage === "time-profile-door-access" ? "active" : ""}`}>
                    <PauseCircle size={14} className="sidebar-icon" />
                    <span>Time Profile</span>
                  </a>
                  
                </div>
              )}
            </div>

            <a href="#" className="sidebar-item">
              <Users size={20} className="sidebar-icon" />
              <span>USER</span>
            </a>
            <a href="#" className="sidebar-item">
              <Smartphone size={20} className="sidebar-icon" />
              <span>DEVICE</span>
            </a>
            <a href="#" className="sidebar-item">
              <DoorOpen size={20} className="sidebar-icon" />
              <span>DOOR</span>
            </a>
            <a href="#" className="sidebar-item">
              <Building2 size={20} className="sidebar-icon" />
              <span>ELEVATOR</span>
            </a>
            <a href="#" className="sidebar-item">
              <MapPin size={20} className="sidebar-icon" />
              <span>ZONE</span>
            </a>
            <a href="#" className="sidebar-item">
              <Shield size={20} className="sidebar-icon" />
              <span>ACCESS CONTROL</span>
            </a>
            <a href="#" className="sidebar-item">
              <Eye size={20} className="sidebar-icon" />
              <span>MONITORING</span>
            </a>
            <a href="#" className="sidebar-item">
              <Clock size={20} className="sidebar-icon" />
              <span>TIME ATTENDANCE</span>
            </a>

          </nav>
        </aside>

        <main className="content">
          {children}
        </main>
      </div>
    </>
  );
};

export default Header;