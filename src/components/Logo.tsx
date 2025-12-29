import React from 'react';

export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <svg width="56" height="56" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Network nodes forming H */}
        {/* Left vertical nodes */}
        <circle cx="35" cy="35" r="8" fill="url(#gradient10)"/>
        <circle cx="35" cy="60" r="8" fill="url(#gradient10)"/>
        <circle cx="35" cy="85" r="8" fill="url(#gradient10)"/>
        
        {/* Right vertical nodes */}
        <circle cx="85" cy="35" r="8" fill="url(#gradient10)"/>
        <circle cx="85" cy="60" r="8" fill="url(#gradient10)"/>
        <circle cx="85" cy="85" r="8" fill="url(#gradient10)"/>
        
        {/* Center connection nodes */}
        <circle cx="60" cy="60" r="6" fill="#F1FFE7"/>
        
        {/* Connection lines */}
        <line x1="35" y1="35" x2="35" y2="85" stroke="url(#gradient10)" strokeWidth="3"/>
        <line x1="85" y1="35" x2="85" y2="85" stroke="url(#gradient10)" strokeWidth="3"/>
        <line x1="35" y1="60" x2="85" y2="60" stroke="url(#gradient10)" strokeWidth="3"/>
        
        {/* Network connections */}
        <line x1="35" y1="60" x2="60" y2="60" stroke="#F1FFE7" strokeWidth="2" opacity="0.8"/>
        <line x1="60" y1="60" x2="85" y2="60" stroke="#F1FFE7" strokeWidth="2" opacity="0.8"/>
        
        {/* Outer nodes */}
        <circle cx="20" cy="60" r="4" fill="#F1FFE7"/>
        <circle cx="100" cy="60" r="4" fill="#F1FFE7"/>
        <line x1="20" y1="60" x2="35" y2="60" stroke="#F1FFE7" strokeWidth="1.5" opacity="0.5"/>
        <line x1="85" y1="60" x2="100" y2="60" stroke="#F1FFE7" strokeWidth="1.5" opacity="0.5"/>
        
        <defs>
          <linearGradient id="gradient10" x1="35" y1="35" x2="85" y2="85" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#989FCE"/>
            <stop offset="100%" stopColor="#F1FFE7"/>
          </linearGradient>
        </defs>
      </svg>
      <span className="text-2xl font-bold text-foreground">Hebel</span>
    </div>
  );
}
