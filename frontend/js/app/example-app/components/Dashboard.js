import React from 'react';
import Form from './Form';
import Tickets from './Tickets';

export default function Dashboard() {
  return (
    <React.Fragment>
      <Form />
      <Tickets />
    </React.Fragment>
  );
}
