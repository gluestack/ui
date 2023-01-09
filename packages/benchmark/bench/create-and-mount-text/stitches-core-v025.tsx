import React from 'react';
import { TestComponentProps, TestRunner } from '../TestRunner';
import { css } from '../utils/stitches-core-v025.config';
// import { buttonStyles } from '../utils/buttonStyles';

const Test = ({ testIndex }: TestComponentProps) => {
  // This purposefully creates the styled component inside the Test component
  // so that we can measure the time it takes using the React profiler
  const button = css({
    '--test-index': testIndex,
    // ...(buttonStyles as any),
  });

  return <div className={button()}>testing</div>;
};

const StitchesTest = () => {
  return <TestRunner numberOfRuns={8} iterationN={1000} TestComponent={Test} />;
};

export default StitchesTest;