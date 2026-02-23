import { useSignUp } from "@clerk/clerk-expo";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SignUp() {
  const { signUp, isLoaded } = useSignUp();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!isLoaded) return;

    try {
      setLoading(true);

      await signUp.create({
        emailAddress: email,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      router.push({
        pathname: "/onboardnauth/otpregister" as any,
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
      <LinearGradient
        colors={["#2F6FED", "#3A73E0"]}
        style={styles.topSection}
      >
        <Image source={require("../../assets/images/white-logo (1).png")} style={styles.logo} />
      </LinearGradient>

      <View style={styles.card}>
        <Text style={styles.title}>Get Started now</Text>
        <Text style={styles.subtitle}>
          Create an account or log in to explore about our app
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

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <LinearGradient
            colors={["#2F6FED", "#3A73E0"]}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>
              {loading ? "Sending..." : "Sign Up"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.footer}>
          Already have an account?{" "}
          <Text
            style={{ color: "#2F6FED" }}
            onPress={() => router.push("/onboardnauth/login")}
          >
            Sign In
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
  label: { color: "#777", marginBottom: 6 },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  button: { borderRadius: 14, overflow: "hidden", marginBottom: 25 },
  buttonGradient: {
    padding: 16,
    alignItems: "center",
    borderRadius: 14,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  footer: { textAlign: "center", color: "#777" },
});