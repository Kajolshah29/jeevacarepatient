import { useSignUp, useAuth } from "@clerk/clerk-expo";
import { router, useLocalSearchParams } from "expo-router";
import React, { useRef, useState } from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import Toast from "react-native-toast-message";

export default function OTPRegister() {
  const { signUp, setActive, isLoaded } = useSignUp();
  const { signOut } = useAuth();
  const { email } = useLocalSearchParams<{ email: string }>();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const inputs = useRef<TextInput[]>([]);

  const handleChange = (text: string, index: number) => {
    if (!/^\d?$/.test(text)) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index: number) => {
    if (index > 0 && !otp[index]) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join("");
    
    console.log("📝 Signup OTP verification started");
    
    if (code.length !== 6) {
      Toast.show({
        type: "error",
        text1: "Invalid OTP",
        text2: "Please enter all 6 digits",
      });
      return;
    }

    if (!isLoaded) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Sign up not ready",
      });
      return;
    }

    try {
      setLoading(true);

      Toast.show({
        type: "info",
        text1: "Verifying",
        text2: "Please wait...",
      });

      // Sign out any existing session
      try {
        await signOut();
      } catch (err) {
        console.log("No existing session");
      }

      const result = await signUp.attemptEmailAddressVerification({
        code,
      });

      console.log("✅ Signup result:", result?.status);
      console.log("Missing requirements:", result?.missingFields);

      // Check if verification was successful (either complete or missing_requirements)
      if (result?.status === "complete") {
        if (result.createdSessionId) {
          await setActive({ session: result.createdSessionId });
        }
        
        Toast.show({
          type: "success",
          text1: "Email Verified",
          text2: "Complete your profile",
        });
        
        setTimeout(() => {
          router.push({
            pathname: "/onboardnauth/registerform" as any,
            params: { email }
          });
        }, 1000);
      } else if (result?.status === "missing_requirements") {
        // Email is verified but needs more info - proceed to registration form
        console.log("Email verified, but missing requirements. Proceeding to form...");
        
        Toast.show({
          type: "success",
          text1: "Email Verified",
          text2: "Complete your profile",
        });
        
        setTimeout(() => {
          router.push({
            pathname: "/onboardnauth/registerform" as any,
            params: { email }
          });
        }, 1000);
      } else {
        Toast.show({
          type: "error",
          text1: "Verification Incomplete",
          text2: "Please try again",
        });
      }
    } catch (err: any) {
      console.error("❌ Signup OTP Error:", err);
      
      // If already verified, just proceed to registration form
      if (err.errors?.[0]?.message?.includes("already been verified")) {
        console.log("Already verified, proceeding to form...");
        
        Toast.show({
          type: "success",
          text1: "Email Already Verified",
          text2: "Complete your profile",
        });
        
        setTimeout(() => {
          router.push({
            pathname: "/onboardnauth/registerform" as any,
            params: { email }
          });
        }, 1000);
        return;
      }
      
      Toast.show({
        type: "error",
        text1: "Verification Failed",
        text2: err.errors?.[0]?.message || "Invalid code. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Your Email</Text>
      <Text style={styles.subtitle}>Enter OTP sent to {email}</Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              if (ref) inputs.current[index] = ref;
            }}
            style={styles.otpBox}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace") {
                handleBackspace(index);
              }
            }}
          />
        ))}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleVerify}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Verify & Continue</Text>
        )}
      </TouchableOpacity>
      
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  subtitle: { color: "#666", marginBottom: 30 },

  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },

  otpBox: {
    width: 45,
    height: 55,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 18,
  },

  button: {
    backgroundColor: "#2F6FED",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});