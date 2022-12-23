import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { Slider, VStack, Text } from '@gluestack/ui';

const SliderMeta: ComponentMeta<typeof Slider> = {
  title: 'Slider',
  component: Slider,
  argTypes: {
    value: {
      control: { type: 'number', min: 1, max: 100 },
    },
  },
  args: { value: 30 },
  parameters: {
    docs: {
      description: {
        component:
          'The **Slider** allows users to select options from a given range of values.',
      },
    },
  },
};

export default SliderMeta;

type SliderStory = ComponentStory<typeof Slider>;

export const Basic: SliderStory = ({ value: valueProp, ...props }) => {
  const [sliderValue, setSliderValue] = React.useState(0);
  const handleChange = (value: any) => {
    setSliderValue(value);
  };

  React.useEffect(() => {
    handleChange(valueProp);
  }, [valueProp]);

  return (
    <VStack sx={{ style: { h: 100, alignItems: 'center' } }} space="md">
      <Slider
        value={sliderValue}
        onChange={(value) => {
          handleChange(value);
        }}
        {...props}
      >
        <Slider.Track>
          <Slider.FilledTrack />
        </Slider.Track>
        <Slider.Thumb />
      </Slider>
      <Text>Slider Value {sliderValue}</Text>
    </VStack>
  );
};
