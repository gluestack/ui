import React from 'react';
import { Progress } from '@gluestack/ui';

export const ProgressBasic = () => {
  return (
    <Progress
      value={70}
      sx={{
        style: { bg: '$blue500', width: '10' },
      }}
    >
      <Progress.FilledTrack />
    </Progress>
  );
};
