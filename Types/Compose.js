// Compose.js
import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export const GradientBackground = ({ children, style }) => {
  return (
    <LinearGradient
      colors={['#262B33', 'rgba(38, 43, 51, 0)']}
      start={{ x: 0.1, y: 0.8 }}
      end={{ x: 0.9, y: 1 }}
      style={style}
    >
      {children}
    </LinearGradient>
  );
};
