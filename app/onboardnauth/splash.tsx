import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, StatusBar, StyleSheet } from 'react-native';

const SplashScreen = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace('/onboardnauth/onboard'); // change to your main screen
    }, 2500);
  }, []);

  return (
    <LinearGradient
      colors={['#E6ECF7', '#8FA8D6']}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />

      <Image
        source={require('../../assets/images/jeevacare-logo.png')} 
        style={styles.logo}
        resizeMode="contain"
      />
    </LinearGradient>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 220,
    height: 120,
  },
});