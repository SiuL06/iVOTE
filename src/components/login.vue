<template>
  <div id="main" class="constraint-layout">
    <img
      id="imageViewBackground"
      class="background-image"
      src="@/assets/facade.jpg"
      alt="Background"
    />
    <div id="overlay" class="overlay"></div>
    <div class="login-container">
      <div class="logo-container">
        <img id="imageView3" class="logo" src="@/assets/ivotelogo.png" alt="iVote Logo" />
      </div>
      <input
        v-model="login"
        type="email"
        placeholder="Login"
        class="text-input"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="text-input"
      />
      <div class="privacy-checkbox">
        <input
          v-model="agreeToPrivacyPolicy"
          type="checkbox"
          id="privacyPolicy"
        />
        <label for="privacyPolicy">I agree to the Privacy Policy</label>
      </div>
      <button class="login-button" @click="handleLogin">Login</button>
      <a href="#" class="register-link" @click="navigateToRegister">Register</a>
    </div>
  </div>
</template>

<script>
import { auth } from '@/firebase'; // Import Firebase auth
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import the sign-in method

export default {
  name: 'LoginPage',
  data() {
    return {
      login: '',
      password: '',
      agreeToPrivacyPolicy: false,
    };
  },
  methods: {
    async handleLogin() {
      if (this.agreeToPrivacyPolicy) {
        try {
          // Authenticate user with Firebase
          const userCredential = await signInWithEmailAndPassword(auth, this.login, this.password);
          console.log('User logged in:', userCredential.user);

          // Store the user's email in localStorage
          localStorage.setItem('userEmail', this.login);

          // Redirect to the home page after successful login
          this.$router.push('/home'); // Ensure you have the route to home.vue set up

        } catch (error) {
          console.error('Login failed:', error);
          alert('Login failed: ' + error.message);
        }
      } else {
        alert('Please agree to the Privacy Policy');
      }
    },
    navigateToRegister() {
      console.log('Navigating to Register page');
      this.$router.push('/register'); // Navigate to register page
    },
  },
};
</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden; /* Prevent any scrollbars */
}

.constraint-layout {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #000;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.5;
  z-index: 2;
}

.login-container {
  z-index: 3;
  width: 100%;
  height: 80%;
  max-width: 400px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.2); /* Slightly transparent white background */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Subtle shadow */
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
}

.logo-container {
  margin-bottom: 20px;
  text-align: center;
}

.logo {
  width: 100%;
  max-width: 285px; /* Adjust size as needed */
  display: block;
}

.text-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.privacy-checkbox {
  width: 100%;
  margin-bottom: 16px;
  color: white; /* Changed to black for readability */
  display: flex;
  align-items: center;
}

.privacy-checkbox label {
  margin-left: 8px;
}

.login-button {
  width: 100%;
  padding: 10px;
  margin-bottom: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.login-button:hover {
  background-color: #0056b3;
}

.register-link {
  color: white; /* Change color to match the button */
  cursor: pointer;
  text-decoration: underline;
}
</style>
