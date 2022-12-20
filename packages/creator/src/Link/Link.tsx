import React, { forwardRef } from 'react';
import type { InterfaceLinkProps } from './types';
import { useLink } from './useLink';
import { useHover } from '@react-native-aria/interactions';

export const Link = (StyledLink: any) =>
  forwardRef(
    ({
      children,
      href,
      onPress,
      isExternal,
      // isUnderlined,
      ...props
    }: InterfaceLinkProps) => {
      const _ref = React.useRef(null);
      const { isHovered } = useHover({}, _ref);
      const { linkProps } = useLink({ href, onPress, isExternal, _ref });

      return (
        <StyledLink
          states={{
            hover: isHovered,
          }}
          {...linkProps}
          {...props}
          ref={_ref}
        >
          {children}
        </StyledLink>
      );
    }
  );
