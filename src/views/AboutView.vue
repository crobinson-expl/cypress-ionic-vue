<script setup lang="ts">
import { IonPage } from "@ionic/vue";
</script>

<template>
  <IonPage>
    <div class="about">
      <h1>This is an about page</h1>
    </div>
  </IonPage>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
