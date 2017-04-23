import React from 'react';

const DimmedBackground = (props) => {
  const { isShown } = props;

  return (
    <div>
      {isShown &&
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 100,
          }}
        />
      }
    </div>
  );
};

DimmedBackground.propTypes = {
  isShown: React.PropTypes.string,
};

export default DimmedBackground;
