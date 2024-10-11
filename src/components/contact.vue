<template>
    <div class="contact-container">
      <header>
        <nav>
          <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/about">About</router-link></li>
            <li><router-link to="/contact">Contact</router-link></li>
          </ul>
        </nav>
      </header>
      
      <main>
        <section class="contact-intro">
          <h1>Get in Touch with iVote</h1>
          <p>If you have any questions or need further information, feel free to reach out to us. We’d love to hear from you!</p>
        </section>
  
        <section class="contact-form">
          <h2>Contact Us</h2>
          <form @submit.prevent="submitForm">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="form.name" required placeholder="Your Name">
  
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="form.email" required placeholder="Your Email">
  
            <label for="message">Message:</label>
            <textarea id="message" v-model="form.message" rows="5" required placeholder="Write your message here..."></textarea>
  
            <button type="submit">Send Message</button>
          </form>
        </section>
  
        <section class="contact-info">
          <h2>Other Ways to Contact Us</h2>
          <p><strong>Email:</strong> kajkcanlas.student@ua.edu.ph</p>
          <p><strong>Phone:</strong> +63 923 460 4375</p>
          <p><strong>Address:</strong> Arayat, Pampanga</p>
        </section>
      </main>
  
      <footer>
        <p>&copy; 2024 iVote | All rights reserved.</p>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: "ContactPage",
    data() {
      return {
        form: {
          name: "",
          email: "",
          message: ""
        }
      };
    },
    methods: {
      submitForm() {
        // Perform any necessary form submission logic here
        alert(`Message Sent!\nName: ${this.form.name}\nEmail: ${this.form.email}\nMessage: ${this.form.message}`);
        // Clear form after submission
        this.form.name = "";
        this.form.email = "";
        this.form.message = "";
      }
    }
  };
  </script>
  
  <style scoped>
 /* General styles */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
}

header {
    background-color: #333;
    color: #fff;
    text-align: center;
    padding: 1rem;
}

header nav ul {
    list-style: none;
    display: flex;
    justify-content: center;
}

header nav ul li {
    margin: 0 15px;
}

header nav ul li a {
    color: #fff;
    text-decoration: none;
    transition: color 0.3s;
}

header nav ul li a:hover {
    color: #ccc;
}

.contact-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.contact-intro {
    text-align: center;
    margin-bottom: 40px;
}

.contact-intro h1 {
    font-size: 36px;
    color: #333;
}

.contact-intro p {
    font-size: 18px;
    color: #666;
}

.contact-form, .contact-info {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
}

.contact-form h2, .contact-info h2 {
    font-size: 24px;
    margin-bottom: 10px;
    color: #333;
}

.contact-form form {
    display: flex;
    flex-direction: column;
}

.contact-form label {
    font-size: 16px;
    color: #333;
    margin-bottom: 5px;
}

.contact-form input, .contact-form textarea {
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
    color: #333;
}

.contact-form button {
    background-color: #333;
    color: #fff;
    padding: 10px;
    border: none;
    border-radius: 5px;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.contact-form button:hover {
    background-color: #555;
}

.contact-info p {
    font-size: 16px;
    color: #333;
    margin: 10px 0;
}

footer {
    background-color: #333;
    color: #fff;
    padding: 10px;
    text-align: center;
    margin-top: 20px;
}

/* Responsive Design */
@media (max-width: 768px) {
    .contact-intro h1 {
        font-size: 28px;
    }

    .contact-form, .contact-info {
        padding: 15px;
    }
}

  </style>
  