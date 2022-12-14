import React, { forwardRef } from 'react';
import { ScrollView } from 'react-native';
import { UIContext } from '../UIProvider';
import { useMenu, useMenuTypeahead } from './useMenu';

export const MenuContent = ({ menuRef, children, ...props }: any) => {
  const { StyledMenuContent } = React.useContext(UIContext);

  const menuProps = useMenu();
  const typeaheadProps = useMenuTypeahead(menuProps);
  return (
    <StyledMenuContent
      {...props}
      {...menuProps}
      {...typeaheadProps}
      ref={menuRef}
    >
      <ScrollView>{children}</ScrollView>
    </StyledMenuContent>
  );
};

export default forwardRef(MenuContent);
