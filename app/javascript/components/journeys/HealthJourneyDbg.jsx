import React from 'react';

//-------//////////////////------------------------------------------
export function HealthJourneyDbg({ jourHash }) {
  const j = JSON.stringify(jourHash, null, 1) || '';
  const prettyJson = j.replace(/\[\n/g, '[').replace(/,\n/g, ',').replace(/\n\s+]/g, ' ]').replace(/, "/g, ',\n "');
  return (
    <div className="border border-warning p-4 mb-4" style={{ background: 'black' }}>
      <div className="mb-2" style={{ fontSize: 12, color: '#3ee729' }}>Health Journey code:</div>
      <pre style={{ fontSize: 14, lineHeight: 1.2, color: '#3ee729' }}>{prettyJson}</pre>
    </div>
  );
}
