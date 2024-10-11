<template>
    <div class="wrapper">
      <header>
        <nav>
          <ul>
            <li><router-link to="/home">Home</router-link></li>
            <li><router-link to="/about">About</router-link></li>
            <li><router-link to="/contact">Contact</router-link></li>
          </ul>
        </nav>
      </header>
  
      <main>
        <section class="about-section">
          <h1>About iVote</h1>
          <p>
            In today's fast-paced world, efficiency and accuracy are crucial. iVote helps modernize the school election
            system by replacing the traditional time-consuming voting process with a seamless, technology-driven solution.
          </p>
          <p>
            With iVote, students can cast their votes from anywhere, without the hassle of manual voting. Our system ensures
            secure, real-time results while minimizing the potential for human error. In short, iVote saves time and makes
            voting easier for everyone involved.
          </p>
          <p>
            We believe that the future is digital, and iVote is a step toward transforming how we conduct elections, bringing
            both convenience and transparency to the process.
          </p>
        </section>
      </main>
  
      <footer>
        <p>&copy; 2023 iVote</p>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AboutPage'
  };
  </script>
  
  <style scoped>
  .wrapper {
    font-family: Arial, sans-serif;
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
  
  .about-section {
    padding: 50px;
    background-color: #f9f9f9;
    text-align: center;
    border-radius: 10px;
    max-width: 800px;
    margin: 50px auto;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  }
  
  .about-section h1 {
    font-size: 36px;
    margin-bottom: 20px;
    color: #333;
  }
  
  .about-section p {
    font-size: 18px;
    line-height: 1.6;
    color: #555;
    margin-bottom: 20px;
  }
  
  .about-section p:last-child {
    margin-bottom: 0;
  }
  
  footer {
    text-align: center;
    padding: 10px;
    background-color: #333;
    color: #fff;
  }
  </style>
  