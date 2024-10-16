import React from 'react';
import {Image, View, StyleSheet, Text} from 'react-native';

export const TabIcon = ({focused, image}) => {
  return (
    <View style={styles.iconContainer}>
      <Image
        source={image}
        style={[styles.icon, {tintColor: focused ? '#D17842' : '#AEAEAE'}]} // Thay đổi màu sắc dựa vào trạng thái focused
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 28,
    height: 24,
  },
});
