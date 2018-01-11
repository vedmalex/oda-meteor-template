// in src/Dashboard.js
import React from 'react';
import { Card, CardHeader, CardActions } from 'material-ui/Card';

export default () => (
  <div>
    <Card>
      <CardHeader
        title="SW-API for you"
        subtitle="You can find different info about characters, planets, etc."
      />
      <CardActions style={{ textAlign: 'right' }}>
      </CardActions>
    </Card>
  </div>
);