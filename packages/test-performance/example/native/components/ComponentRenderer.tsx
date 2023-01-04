import React from 'react';
import { View } from 'react-native';
import ComponentRendererHeader from './ComponentRendererHeader';
import ComponentRendererLayout from './ComponentRendererLayout';
const ComponentRenderer = ({
  selectedComponent,
  numberOfComponents,
  setNumberOfComponents,
  mount,
  setMount,
}: any) => {
  return (
    <View style={{ flex: 1, borderWidth: 1 }}>
      <ComponentRendererHeader
        selectedComponent={selectedComponent}
        numberOfComponents={numberOfComponents}
        setNumberOfComponents={setNumberOfComponents}
        mount={mount}
        setMount={setMount}
      />
      <ComponentRendererLayout
        selectedComponent={selectedComponent}
        numberOfComponents={numberOfComponents}
        mount={mount}
      />
    </View>
  );
};

export default ComponentRenderer;
