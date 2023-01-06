import HeadingMain from './Heading';

export const createHeading = ({
  StyledH1,
  StyledH2,
  StyledH3,
  StyledH4,
  StyledH5,
  StyledH6,
}: any) => {
  const Heading = HeadingMain(
    StyledH1,
    StyledH2,
    StyledH3,
    StyledH4,
    StyledH5,
    StyledH6
  ) as any;

  Heading.displayName = 'Heading';
  return Heading;
};
