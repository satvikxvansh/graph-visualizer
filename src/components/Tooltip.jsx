import React, { useState } from 'react';

const Tooltip = ({ children, content, position = 'bottom' }) => {
  const [isVisible, setIsVisible] = useState(false);

  const getPositionClasses = () => {
    const base = 'absolute z-20 bg-white text-white text-sm rounded-xl shadow-2xl p-4 border border-gray-700 backdrop-blur-sm w-100';
    const positions = {
      bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
      top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
      left: 'right-full top-1/2 -translate-y-1/2 mr-2',
      right: 'left-full top-1/2 -translate-y-1/2 ml-2'
    };
    return `${base} ${positions[position] || positions.bottom}`;
  }; 

  return (
    <div className="relative inline-block">
      <div
        className="cursor-default"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      
      {isVisible && (
        <div className={getPositionClasses()}>
          <div className="animate-in fade-in zoom-in duration-200">
            {content}
          </div>
          {/* Arrow */}
          <div className="absolute w-0 h-0" style={{ 
            top: position === 'top' ? '100%' : '-4px',
            left: '50%',
            transform: 'translateX(-50%)',
            border: '4px solid transparent',
            borderBottomColor: position === 'top' ? '#1f2937' : 'transparent',
            borderTopColor: position === 'bottom' ? '#1f2937' : 'transparent'
          }} />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
