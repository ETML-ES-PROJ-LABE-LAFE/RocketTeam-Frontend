<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div v-if="loading">Chargement en cours...</div>
    <div v-else>
      <h2>Employee Details</h2>
      <div v-if="employees.length > 0">
        <div v-for="employee in employees" :key="employee.id">
          <p><strong>Name:</strong> {{ employee.name }}</p>
          <p><strong>Role:</strong> {{ employee.role }}</p>
        </div>
      </div>
      <div v-else>
        <p>Aucun employé trouvé.</p>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EmployeesServices from "@/Services/EmployeesServices";

export default {
  name: 'HomeView',
  data() {
    return {
      employees: [],
      loading: true // Ajout de la propriété loading
    }
  },
  async created() {
    try {
      // Recherche des employés et remplissage du tableau employees
      this.employees = await EmployeesServices.getAllEmployees();
      this.loading = false; // Mettre loading à false une fois les données chargées
      console.log(this.employees)
    } catch (error) {
      console.log("Erreur " + error);
      this.loading = false; // En cas d'erreur, définir loading à false
    }
  }
}
</script>
