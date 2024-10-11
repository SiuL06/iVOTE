<template>
  <div class="container">
    <!-- Logo -->
    <img
      src="@/assets/ivotelogo.png"
      alt="Logo"
      class="logo"
    />

    <!-- Header -->
    <h1 class="header">COMMISSION ON STUDENT ELECTIONS</h1>

    <!-- Nominees Label -->
    <h2 class="nominees-label">Nominees:</h2>

    <!-- Buttons Layout -->
    <div class="buttons-container">
      <button class="btn add-nominee" @click="addNominee">Add Nominee</button>
      <button class="btn reset" @click="reset">Reset</button>
    </div>

    <!-- Nominee Cards Container -->
    <div class="nominees-container">
      <div v-for="nominee in nominees" :key="nominee.id" class="card">
        <h3 class="nominee-title">{{ nominee.name }}</h3>
        <div class="score">{{ nominee.score }}</div>
        <button class="btn edit" @click="editNominee(nominee.id)">Edit</button>
        <div class="adjust-buttons">
          <button class="btn minus" @click="adjustScore(nominee.id, -1)">-</button>
          <button class="btn plus" @click="adjustScore(nominee.id, 1)">+</button>
        </div>
      </div>
    </div>

    <!-- Year Text -->
    <p class="year">2024</p>

    <!-- Footer Text -->
    <p class="footer">Group 7(iVOTE)</p>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      nominees: [
        { id: 1, name: 'ONE', score: 0 },
        { id: 2, name: 'TWO', score: 0 }
      ],
    };
  },
  methods: {
    addNominee() {
      console.log('Add Nominee clicked');
      // Implement add nominee logic here
    },
    reset() {
      this.nominees.forEach(nominee => nominee.score = 0);
      console.log('Reset clicked');
    },
    editNominee(nomineeId) {
      console.log('Edit Nominee', nomineeId);
      // Implement edit nominee logic here
    },
    adjustScore(nomineeId, change) {
      const nominee = this.nominees.find(n => n.id === nomineeId);
      if (nominee) {
        nominee.score += change;
        console.log('Adjust Score for Nominee', nomineeId, 'Change:', change);
      }
    }
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
  background-color: #3b3b50;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden; /* Remove scrollbar */
}

.logo {
  width: 200px;
  height: 100px;
  margin-top: 20px;
}

.header {
  margin: 10px 0;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

.nominees-label {
  margin-top: 20px;
  font-size: 20px;
  text-align: center;
}

.buttons-container {
  display: flex;
  justify-content: space-between;
  width: 300px;
  margin: 20px 0;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.add-nominee {
  background-color: #ffc107;
  color: #000;
}

.reset {
  background-color: #ff0000;
  color: #fff;
}

.nominees-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  margin-top: 20px;
}

.card {
  background-color: #4a4a61;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  margin-bottom: 20px;
  position: relative;
  width: 45%; /* Adjust width to fit two cards per row */
  max-width: 200px; /* Ensure a maximum width for each card */
}

.nominee-title {
  font-size: 18px;
  margin-bottom: 10px;
}

.score {
  font-size: 48px;
  margin: 20px 0;
}

.edit {
  background-color: #ffc107;
  color: #000;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
}

.adjust-buttons {
  display: flex;
  justify-content: space-between;
}

.minus, .plus {
  background-color: #ffc107;
  color: #000;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 45px;
}

.year {
  margin-top: auto;
  font-size: 18px;
}

.footer {
  font-size: 12px;
  margin-top: 5px;
  margin-bottom: 50px;
}
</style>
