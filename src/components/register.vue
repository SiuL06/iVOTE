<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Register to iVote!</h2>
      <form @submit.prevent="submitForm">
        <div class="input-group">
          <input type="text" placeholder="First Name" v-model="firstName" required />
        </div>
        <div class="input-group">
          <input type="text" placeholder="Last Name" v-model="lastName" required />
        </div>
        <div class="input-group">
          <input type="email" placeholder="Email" v-model="email" required />
        </div>
        <div class="input-group">
          <input type="password" placeholder="Password" v-model="password" required />
        </div>
        <div class="input-group">
          <input type="date" v-model="birthdate" required />
        </div>
        <div class="input-group gender-group">
          <label>Gender:</label>
          <input type="radio" id="male" name="gender" value="male" v-model="gender" required />
          <label for="male">Male</label>
          <input type="radio" id="female" name="gender" value="female" v-model="gender" required />
          <label for="female">Female</label>
        </div>
        <button type="button" class="btn-login" :disabled="isLoading" @click="submitForm">
          <span v-if="isLoading">Registering...</span>
          <span v-else>Register</span>
        </button>
        <div class="extra-links">
          <a href="#" class="forgot-password">Forgot <span>Password?</span></a>
          <a href="#" class="sign-up">Already have an account? <span>Sign in</span></a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { auth, db } from '@/firebase'; // Ensure correct import of Firebase services
import { createUserWithEmailAndPassword } from 'firebase/auth'; // For creating user
import { setDoc, doc } from 'firebase/firestore'; // For Firestore document handling

export default {
  name: 'RegisterPage',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      birthdate: '',
      gender: '',
      isLoading: false // Loading state
    };
  },
  methods: {
    async submitForm(e) {
      e.preventDefault(); // Prevent default form submission behavior
      this.isLoading = true; // Start loading

      try {
        // Validate required fields
        if (!this.firstName || !this.lastName || !this.email || !this.password || !this.birthdate || !this.gender) {
          alert('Please fill in all the required fields');
          this.isLoading = false; // Stop loading
          return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.email)) {
          alert('Please enter a valid email address.');
          this.isLoading = false; // Stop loading
          return;
        }

        // Create user with email and password in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
        const user = userCredential.user;

        // Store additional user information in Firestore
        await setDoc(doc(db, "users", user.uid), {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          birthdate: this.birthdate,
          gender: this.gender
        });

        alert("Registration successful!");
        this.clearForm();

      } catch (error) {
        console.error("Full error object:", error);
        switch (error.code) {
          case 'auth/email-already-in-use':
            alert('This email is already in use. Please use a different email.');
            break;
          case 'auth/invalid-email':
            alert('Invalid email format.');
            break;
          case 'auth/weak-password':
            alert('Password should be at least 6 characters.');
            break;
          default:
            alert("Registration failed: " + error.message);
        }
      } finally {
        this.isLoading = false; // Stop loading
      }
    },
    clearForm() {
      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.password = '';
      this.birthdate = '';
      this.gender = '';
    }
  }
};
</script>

<style scoped>
.login-container {
  height: 100vh;
  background-image: url('@/assets/facade.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-box {
  background-color: rgba(255, 255, 255, 0.9); /* Slight transparency for the box */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  width: 350px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.input-group {
  margin-bottom: 15px;
}

input[type="text"],
input[type="email"],
input[type="password"],
input[type="date"] {
  width: 95%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.gender-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

label {
  margin-right: 10px;
}

.btn-login {
  width: 100%;
  padding: 10px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-login:hover {
  background-color: #444;
}

.extra-links {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.extra-links a {
  text-decoration: none;
  color: #333;
}

.extra-links a:hover {
  text-decoration: underline;
}
</style>
