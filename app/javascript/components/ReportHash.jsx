import React from 'react';

export const ReportHash = ({ hash }) => (
  <>
    {Object.entries(hash).map(([k, v]) => (
      <span key={k} style={{}}>
        {k + ':'}
        <b style={{ color: (k === 'data') ? 'blue' : 'black' }}>{v + ''}</b>
        {', '}
      </span>
    ))}
  </>
);
