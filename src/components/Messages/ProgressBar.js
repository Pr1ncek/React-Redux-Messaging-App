import React from 'react';
import { Progress } from 'semantic-ui-react';

const ProgressBar = ({ uploadState, percentUploaded }) =>
  uploadState === 'uploading' && (
    <Progress
      className="progress__bar"
      percent={percentUploaded}
      progress
      indicating
      size="small"
      color="red"
    />
  );

export default ProgressBar;
