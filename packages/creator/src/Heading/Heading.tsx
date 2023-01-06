import React, { forwardRef } from 'react';

const Heading = (
  StyledH1: any,
  StyledH2: any,
  StyledH3: any,
  StyledH4: any,
  StyledH5: any,
  StyledH6: any
) =>
  forwardRef(({ children, size = '2xl', ...props }: any, ref: any) => {
    let StyledHeading;
    switch (size) {
      case 'xs':
        StyledHeading = StyledH6;
        break;
      case 'sm':
        StyledHeading = StyledH5;
        break;
      case 'md':
        StyledHeading = StyledH4;
        break;
      case 'lg':
        StyledHeading = StyledH3;
        break;
      case 'xl':
        StyledHeading = StyledH2;
        break;
      case '2xl':
        StyledHeading = StyledH1;
        break;
    }

    return (
      <StyledHeading ref={ref} {...props}>
        {children}
      </StyledHeading>
    );
  });

export default Heading;
