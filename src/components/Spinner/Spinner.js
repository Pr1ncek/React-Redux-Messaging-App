import React from 'react';
import { Loader, Dimmer } from 'semantic-ui-react';

const Spinner = () => (
  <Dimmer active>
    <Loader size="huge" inline="centered" content={'Preparing Chat...'} />
  </Dimmer>
);

export default Spinner;
