import { ClerkProvider } from "@clerk/clerk-expo";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="onboardnauth/splash" />
        <Stack.Screen name="onboardnauth/onboard" />
        <Stack.Screen name="(tabs)"  />
      </Stack>
    </ClerkProvider>
  );
}
