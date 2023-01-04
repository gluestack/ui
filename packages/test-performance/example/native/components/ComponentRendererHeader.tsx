import React from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
const ComponentRendererHeader = ({
  selectedComponent,
  numberOfComponents,
  setNumberOfComponents,
  // mount,
  setMount,
}: any) => {
  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: 'bold', paddingHorizontal: 4 }}>
        {selectedComponent}
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <View
          style={{
            flexDirection: 'row',
            margin: 12,
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{}}>Count: </Text>
          <TextInput
            style={{ height: 30, borderWidth: 1 }}
            onChangeText={(value) => {
              setNumberOfComponents(value);
              setMount(false);
            }}
            value={numberOfComponents}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Pressable
            style={{
              borderRadius: 2,
              margin: 12,
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderWidth: 1,
              borderColor: 'black',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'gray',
            }}
            onPress={() => setMount(true)}
          >
            Mount
          </Pressable>
          <Pressable
            style={{
              borderRadius: 2,
              margin: 12,
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderWidth: 1,
              borderColor: 'black',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'gray',
            }}
            onPress={() => setMount(false)}
          >
            Unmount
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ComponentRendererHeader;
