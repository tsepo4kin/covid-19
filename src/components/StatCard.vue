<template>
  <v-card
    :class="bgColor"
    class="summury-card ma-3 pt-6"
    dark
    outlined
    width="240px"
  >
    <v-icon class="d-block text-center my-n2">{{ icon }}</v-icon>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-card-title class="text-center d-block" v-bind="attrs" v-on="on">
          {{ title }}
        </v-card-title>
      </template>
      <span>{{ title + " per day" + ": " + newAmont }}</span>
    </v-tooltip>
    <v-card-subtitle class="text-center">{{ amont }}</v-card-subtitle>
  </v-card>
</template>
<script>
export default {
  props: {
    icon: String,
    title: String,
    amont: Number,
    newAmont: Number,
    bgColor: String
  }
};
</script>
