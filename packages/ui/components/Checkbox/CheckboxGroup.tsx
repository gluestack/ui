import React from 'react';
import { Checkbox, CheckIcon } from '@gluestack/ui';

export const CheckboxGroup = ({ size, ...props }) => {
  const [values, setValues] = React.useState([]);

  return (
    <Checkbox.Group value={values} onChange={setValues} {...props}>
      <Checkbox
        size={size}
        value="Label 1"
        aria-label="Label 1"
        accessibilityLabel="Checkbox"
        onChange={(isSelected: boolean) =>
          // eslint-disable-next-line no-console
          console.log(isSelected, '###')
        }
      >
        <Checkbox.Indicator>
          <Checkbox.Icon>
            <CheckIcon />
          </Checkbox.Icon>
        </Checkbox.Indicator>
        <Checkbox.Label>Label 1</Checkbox.Label>
      </Checkbox>
      <Checkbox
        size={size}
        aria-label="Label 2"
        value="Label 2"
        accessibilityLabel="Checkbox"
        onChange={(isSelected: boolean) =>
          // eslint-disable-next-line no-console
          console.log(isSelected, '###')
        }
      >
        <Checkbox.Indicator>
          <Checkbox.Icon>
            <CheckIcon />
          </Checkbox.Icon>
        </Checkbox.Indicator>
        <Checkbox.Label>Label 2</Checkbox.Label>
      </Checkbox>
    </Checkbox.Group>
  );
};
