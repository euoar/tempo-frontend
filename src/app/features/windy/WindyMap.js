import React from 'react';
import PageTemplate from '../../shared/PageTemplate';
import WindyIFrame from './WindyIFrame';

// De momento desactivado
const WindyMap = () =>
  <PageTemplate>
    <main style={{height: '100vh'}}  className="container-fluid text-center">
      <WindyIFrame />
    </main>
  </PageTemplate>

export default WindyMap;
