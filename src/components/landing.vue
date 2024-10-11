
<template>
    <div>
      <header>
        <h1>Welcome to iVote</h1>
        <nav>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </header>
      
      <main>
        <section class="hero">
          <h2>Enhancing Student Participation Through Modern Voting System in School Elections</h2>
          <p>Cast your vote and make your voice heard!</p>
          <!-- Trigger navigation when the button is clicked -->
          <button class="btn" @click="goToLogin">Get Started</button>
        </section>
      </main>
      
      <footer>
        <p>&copy; 2024 iVote. All rights reserved.</p>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LandingPage',
    methods: {
      goToLogin() {
        this.$router.push('/login'); // Redirect to LoginPage when button is clicked
      }
    }
  }
  </script>
  
  <style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    background-color: #f4f4f4;
    color: #333;
    padding: 20px;
  }
  
  header {
    background-color: #333;
    color: #fff;
    text-align: center;
    padding: 10px 0;
    margin-bottom: 20px;
    border-radius: 8px;
  }
  
  h1 {
    font-size: 28px;
    margin-bottom: 10px;
  }
  
  nav ul {
    list-style: none;
    display: flex;
    justify-content: center;
    gap: 20px;
  }
  
  nav a {
    color: #fff;
    text-decoration: none;
    transition: color 0.2s ease;
  }
  
  nav a:hover {
    color: #ccc;
  }
  
  .hero {
    position: relative;
    color: #000000;
    padding: 40px;
    text-align: center;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }
  
  .hero::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('\assets\facade.jpg');
    background-size: cover;
    background-position: center;
    filter: blur(3px);
    z-index: -1;
  }
  
  .hero h2 {
    font-size: 24px;
    margin-bottom: 10px;
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }
  
  .hero p {
    font-size: 18px;
    margin-bottom: 20px;
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }
  
  .hero button {
    background-color: #333;
    color: #fff;
    border: none;
    padding: 10px 20px;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .hero button:hover {
    background-color: #444;
  }
  
  .features {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .features h2 {
    font-size: 24px;
    margin-bottom: 20px;
    text-align: center;
    color: #333;
  }
  
  .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }
  
  .feature {
    background-color: #f4f4f4;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .feature i {
    font-size: 36px;
    color: #333;
    margin-bottom: 10px;
  }
  
  .feature h3 {
    font-size: 20px;
    margin-bottom: 10px;
  }
  
  .feature p {
    font-size: 16px;
  }
  
  footer {
    text-align: center;
    margin-top: 20px;
    font-size: 14px;
    color: #666;
  }
  
  /* Responsive design */
  @media (max-width: 768px) {
    .hero h2 {
      font-size: 20px;
    }
  
    .hero p {
      font-size: 16px;
    }
  
    .feature-grid {
      grid-template-columns: 1fr;
    }
  }
  
  @media (max-width: 480px) {
    .hero h2 {
      font-size: 18px;
    }
  
    .hero p {
      font-size: 14px;
    }
  
    .feature-grid {
      grid-template-columns: 1fr;
    }
  }
  </style>
  