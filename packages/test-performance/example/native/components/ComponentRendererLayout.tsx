import React from 'react';
import { View, ScrollView } from 'react-native';
import ComponentDefinitions from '../master-data/ComponentDefinitions';

const ComponentRendererLayout = ({
  selectedComponent,
  numberOfComponents,
  mount,
}: any) => {
  return (
    <ScrollView style={{ height: '100vh' }}>
      <View style={{ borderWidth: 1, flex: 1 }}>
        {mount === true &&
          Array.from({ length: Number(numberOfComponents) }, () => {
            // @ts-ignore
            return ComponentDefinitions?.[selectedComponent];
          })}
      </View>
    </ScrollView>
  );
};

export default ComponentRendererLayout;
