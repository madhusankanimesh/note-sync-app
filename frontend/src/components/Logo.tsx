import React from 'react';
import { View, StyleSheet } from 'react-native';

interface LogoProps {
  size?: number;
}

const Logo: React.FC<LogoProps> = (props) => {
  const logoSize = props.size ? props.size : 80;
  
  return (
    <View style={[styles.logoContainer, { width: logoSize, height: logoSize }]}>
      <View style={styles.cloudIcon}>
        <View style={styles.cloud} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    backgroundColor: '#e0e7ff',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  cloudIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cloud: {
    width: 40,
    height: 24,
    backgroundColor: '#3b82f6',
    borderRadius: 12,
  },
});

export default Logo;
