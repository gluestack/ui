import {
  StyledH1,
  StyledH2,
  StyledH3,
  StyledH4,
  StyledH5,
  StyledH6,
} from '../../styled-components';
import { createHeading } from '@gluestack/ui-creator';

export const Heading = createHeading({
  StyledH1,
  StyledH2,
  StyledH3,
  StyledH4,
  StyledH5,
  StyledH6,
}) as any;
