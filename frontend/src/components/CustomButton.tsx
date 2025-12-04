import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
}

const CustomButton: React.FC<CustomButtonProps> = (props) => {
  const { title, onPress, loading, disabled, variant } = props;
  
  const isLoading = loading === true;
  const isDisabled = disabled === true;
  const buttonVariant = variant ? variant : 'primary';

  const getButtonStyle = (): ViewStyle[] => {
    const styles: ViewStyle[] = [buttonStyles.button];
    
    if (buttonVariant === 'primary') {
      styles.push(buttonStyles.primaryButton);
    } else if (buttonVariant === 'secondary') {
      styles.push(buttonStyles.secondaryButton);
    } else if (buttonVariant === 'outline') {
      styles.push(buttonStyles.outlineButton);
    }
    
    if (isDisabled || isLoading) {
      styles.push(buttonStyles.disabledButton);
    }
    
    return styles;
  };

  const getTextStyle = (): TextStyle[] => {
    const styles: TextStyle[] = [buttonStyles.buttonText];
    
    if (buttonVariant === 'primary') {
      styles.push(buttonStyles.primaryButtonText);
    } else if (buttonVariant === 'secondary') {
      styles.push(buttonStyles.secondaryButtonText);
    } else if (buttonVariant === 'outline') {
      styles.push(buttonStyles.outlineButtonText);
    }
    
    return styles;
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={isDisabled || isLoading}
      activeOpacity={0.8}
    >
      {isLoading ? (
        <ActivityIndicator color="#ffffff" />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const buttonStyles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  primaryButton: {
    backgroundColor: '#3b82f6',
  },
  secondaryButton: {
    backgroundColor: '#64748b',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryButtonText: {
    color: '#ffffff',
  },
  secondaryButtonText: {
    color: '#ffffff',
  },
  outlineButtonText: {
    color: '#3b82f6',
  },
});

export default CustomButton;
