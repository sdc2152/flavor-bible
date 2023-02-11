import React from 'react';

const ContainedElement = React.forwardRef(({ children, style }, ref) => (
  <div ref={ref} style={{ height: '100%', position: 'relative' }}>
    <div style={{
      width: '100%',
      top: 0,
      bottom: 0,
      right: 0,
      position: 'absolute',
      ...style,
    }}>
      {children}
    </div>
  </div>
));

export default ContainedElement;
