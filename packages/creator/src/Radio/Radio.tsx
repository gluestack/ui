import React, { forwardRef } from 'react';
import { RadioProvider } from './RadioProvider';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { useFocusRing } from '@react-native-aria/focus';
import { useHover } from '@react-native-aria/interactions';
import { useRadio } from '@react-native-aria/radio';
import { Platform } from 'react-native';
import { useRadioGroup } from './RadioGroupContext';

const Radio = (StyledRadio: any) =>
  forwardRef(({ children, isInvalid, ...props }: any) => {
    const radioGroupContext = useRadioGroup('RadioGroupContext');

    if (!radioGroupContext)
      throw Error('Radio must be wrapped inside a Radio.Group');

    const _ref = React.useRef(null);
    const { isHovered } = useHover({}, _ref);

    const { focusProps, isFocusVisible } = useFocusRing();
    const inputProps = useRadio(
      {
        ...props,
        'aria-label': props.accessibilityLabel,
      },
      radioGroupContext ? radioGroupContext?.state : {},
      //@ts-ignore
      _ref
    );

    const {
      inputProps: { checked: isChecked, disabled: isDisabled },
    } = inputProps;

    if (Platform.OS === 'web') {
      return (
        <StyledRadio {...props} accessibilityRole="label" ref={_ref}>
          {({ resolveContextChildrenStyle }: any) => {
            return (
              <RadioProvider
                isChecked={isChecked}
                isDisabled={isDisabled}
                isFocusVisible={isFocusVisible}
                isHovered={isHovered}
                isInvalid={isInvalid}
                resolveContextChildrenStyle={resolveContextChildrenStyle}
              >
                <VisuallyHidden>
                  <input
                    {...inputProps.inputProps}
                    {...focusProps}
                    ref={_ref}
                  />
                </VisuallyHidden>
                {children}
              </RadioProvider>
            );
          }}
        </StyledRadio>
      );
    } else {
      return (
        <StyledRadio {...props} ref={_ref}>
          {({ resolveContextChildrenStyle }: any) => {
            return (
              <RadioProvider
                isChecked={isChecked}
                isDisabled={isDisabled}
                isFocusVisible={isFocusVisible}
                isHovered={isHovered}
                isInvalid={isInvalid}
                resolveContextChildrenStyle={resolveContextChildrenStyle}
              >
                {children}
              </RadioProvider>
            );
          }}
        </StyledRadio>
      );
    }
  });
export { Radio };
