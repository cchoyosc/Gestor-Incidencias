import React from 'react';
import './TopBar.css';

interface TopBarProps {
  breadcrumb?: string[];
  title?: string;
}

const TopBar: React.FC<TopBarProps> = ({
  breadcrumb = ['Incidencias', 'Gestion de Incidencias'],
  title = 'DASHBOARD',
}) => {
  return (
    <div className="topbar d-flex align-items-center px-3">
      <span className="topbar-menu-icon me-3">☰</span>
      <nav className="topbar-breadcrumb d-flex align-items-center gap-1">
        {breadcrumb.map((item, i) => (
          <React.Fragment key={item}>
            <span className={`breadcrumb-item-text ${i === breadcrumb.length - 1 ? 'bc-active' : ''}`}>
              {item}
            </span>
            {i < breadcrumb.length - 1 && <span className="bc-separator">/</span>}
          </React.Fragment>
        ))}
      </nav>
      <div className="topbar-title flex-grow-1 text-center fw-bold">{title}</div>
      <span className="topbar-action-icon">⇥</span>
    </div>
  );
};

export default TopBar;
