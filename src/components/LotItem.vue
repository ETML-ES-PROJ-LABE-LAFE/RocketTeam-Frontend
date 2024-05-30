<template>
  <div class="lot-item">
    <img v-if="showImage && lot.image && lot.image !== ''" :src="require(`../assets/img_lot/${lot.image}`)" alt="Image du lot" class="lot-image"/>
    <div class="lot-details">
      <div class="lot-attribute">
        <strong class="attribute-name">Numéro de lot:</strong>
        <span class="attribute-value">{{ lot.id }}</span>
      </div>
      <div class="lot-attribute">
        <strong class="attribute-name">Description:</strong>
        <span class="attribute-value">{{ lot.description }}</span>
      </div>
      <div class="lot-attribute">
        <strong class="attribute-name">Catégorie:</strong>
        <span class="attribute-value">{{ lot.category.name }}</span>
      </div>
      <div class="lot-attribute">
        <strong class="attribute-name">Valeur initiale:</strong>
        <span class="attribute-value">{{ lot.initialPrice }}</span>
      </div>
      <div class="lot-attribute">
        <strong class="attribute-name">Offre la plus élevée:</strong>
        <span class="attribute-value">{{ lot.highestBid }}</span>
      </div>
      <button v-if="showDeleteButton" @click="$emit('delete-lot', lot.id)">Supprimer</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    lot: {
      type: Object,
      required: true,
    },
    showDeleteButton: {
      type: Boolean,
      default: false
    },
    showImage: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.lot-item {
  display: flex;
  align-items: center;
  padding: 10px;
  color: black;
  width: 100%;
  max-width: 800px;
  margin: 15px auto;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.lot-image {
  width: 200px; /* Augmentation de la largeur de l'image */
  height: 200px; /* Augmentation de la hauteur de l'image */
  object-fit: cover;
  border-radius: 10px;
  margin-right: 10px;
}


.lot-details {
  flex-grow: 1;
}

.lot-attribute {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.attribute-name {
  margin-right: 10px;
  font-weight: bold;
}

.attribute-value {
  text-align: right;
  margin-left: auto;
}

button {
  padding: 5px 10px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;
}

button:hover {
  background-color: #c0392b;
}
</style>
