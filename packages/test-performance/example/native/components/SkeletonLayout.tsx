import React from 'react';
import { View } from 'react-native';
import ComponentRenderer from './ComponentRenderer';
import LeftPanelSelector from './LeftPanelSelector';
const SkeletonLayout = () => {
  const [selectedComponent, setSelectedComponent] = React.useState('');
  const [numberOfComponents, setNumberOfComponents] = React.useState(0);
  const [mount, setMount] = React.useState(false);
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 12,
        backgroundColor: 'lightgray',
      }}
    >
      <LeftPanelSelector
        selectedComponent={selectedComponent}
        setSelectedComponent={setSelectedComponent}
        setMount={setMount}
        setNumberOfComponents={setNumberOfComponents}
      />
      <ComponentRenderer
        selectedComponent={selectedComponent}
        numberOfComponents={numberOfComponents}
        setNumberOfComponents={setNumberOfComponents}
        mount={mount}
        setMount={setMount}
      />
    </View>
  );
};

export default SkeletonLayout;
