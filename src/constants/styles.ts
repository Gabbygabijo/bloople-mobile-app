import { StyleSheet } from "react-native";

export const colorPalette = {
  primary: '#6D3B5E',
  secondary: '#A85F7D',
  background: '#FBF8F4',
  surface: '#FFFFFF',
  primaryText: '#241F23',
  secondaryText: '#706970',
  border: '#E8E1E4',
  success: '#3E8067',
  warning: '#B8793E',
  error: '#B94A58',
};


export const Containers = StyleSheet.create({
  defaultContainer: {
    width: '92%',
    marginHorizontal: 'auto',
  },
  backIconShadow: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 10.5,

    // Android shadow (elevation approximates it)
    elevation: 3,
  },
})