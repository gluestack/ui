import React from 'react';
import PresenceTransition from './PresenceTransition';

const Fade = ({ children, ...props }: any, ref?: any) => {
  const {
    in: animationState,
    entryDuration,
    exitDuration,
    ...resolvedProps
  } = props;

  if (entryDuration) {
    resolvedProps.animate.transition.duration = entryDuration;
  }
  if (exitDuration) {
    resolvedProps.exit.transition.duration = exitDuration;
  }

  return (
    <PresenceTransition visible={animationState} ref={ref} {...resolvedProps}>
      {children}
    </PresenceTransition>
  );
};

export default React.forwardRef(Fade);
