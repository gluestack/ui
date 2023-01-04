import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import * as gluestackComponents from '@gluestack/ui';
const LeftPanelSelector = ({
  selectedComponent,
  setSelectedComponent,
  setMount,
  setNumberOfComponents,
}: any) => {
  return (
    <View
      style={{
        maxWidth: 250,
        borderWidth: 1,
      }}
    >
      <Text style={{ marginBottom: 10, padding: 8, backgroundColor: 'gray' }}>
        Components
      </Text>
      <ScrollView style={{ height: '100vh', padding: 8 }}>
        {Object.keys(gluestackComponents).map((component: any) => {
          return (
            <Pressable
              onPress={() => {
                setSelectedComponent(component);
                setMount(false);
                setNumberOfComponents(100);
              }}
              style={{
                paddingVertical: 4,
                backgroundColor:
                  selectedComponent === component ? 'gray' : 'transparent',
              }}
            >
              <Text
                style={{
                  color: selectedComponent === component ? 'black' : 'blue',
                }}
              >
                {component}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default LeftPanelSelector;
