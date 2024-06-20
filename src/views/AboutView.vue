<template>
  <div class="about">
    <h1>À propos de ce site</h1>
    <p>Ce site est un site de gestion d'enchères développé dans le cadre d'un projet d'école à l'ETML-ES. Les deux personnes travaillant sur ce projet sont : Nicolas Lema Alves et Evan Pineau, deux étudiants dans la classe SIG2.</p>
  </div>
</template>

<script>
export default {
  name: 'AboutView'
};
</script>

<style>
.about {
  font-family: 'Arial', sans-serif;
  padding: 10px 20px;
  text-align: center;
  min-height: 100vh;
  background: linear-gradient(to bottom right, #3498db, #bdc3c7);
  color: white;
}

h1 {
  color: black;
  font-size: 2.5em;
  margin-bottom: 20px;
  margin-top: 40px;
}

p {
  color: black;
  font-size: 1.2em;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}
</style>
