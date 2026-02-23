import { useSignIn } from "@clerk/clerk-expo";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SignIn() {
  const { signIn, isLoaded } = useSignIn();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!isLoaded) return;

    try {
      setLoading(true);

      await signIn.create({
        identifier: email,
        strategy: "email_code",
      });

      router.push({
        pathname: "/onboardnauth/otpverify" as any,
        params: { email },
      });
    } catch (err: any) {
      console.log(err.errors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Blue Gradient */}
      <LinearGradient
        colors={["#2F6FED", "#3A73E0"]}
        style={styles.topSection}
      >
        <Image source={require("../../assets/images/white-logo (1).png")} style={styles.logo} />
      </LinearGradient>

      {/* Bottom White Card */}
      <View style={styles.card}>
        <Text style={styles.title}>Sign in to your Account</Text>
        <Text style={styles.subtitle}>
          Enter your email to login
        </Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
        >
          <LinearGradient
            colors={["#2F6FED", "#3A73E0"]}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>
              {loading ? "Sending..." : "Log In"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.footer}>
          Don't have an account?{" "}
          <Text
            style={{ color: "#2F6FED" }}
            onPress={() => router.push("/onboardnauth/register")}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#2F6FED" },

  topSection: {
    height: "45%",
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    width: 150,
    height: 100,
  },

  card: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },

  subtitle: {
    textAlign: "center",
    color: "#777",
    marginBottom: 30,
  },

  label: {
    color: "#777",
    marginBottom: 6,
  },

  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },

  button: {
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 25,
  },

  buttonGradient: {
    padding: 16,
    alignItems: "center",
    borderRadius: 14,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  footer: {
    textAlign: "center",
    color: "#777",
  },
});