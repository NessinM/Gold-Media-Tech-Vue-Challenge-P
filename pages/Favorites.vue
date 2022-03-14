<template>
  <div>
    <notifications class="mt-20"  position="top center" />
    <header-navegacion :show-home="true" class="mb-6"></header-navegacion>
    <div class="mx-auto px-4">
      <template>
        <div
          @click="setKeyDetailsAndGoTo(l)"
          v-for="(l, index) in favorites"
          :key="index"
        >
          <item-libro :item="l" :show-remove-favorite="true"></item-libro>
        </div>
      </template>
      <div
        class="flex justify-center items-center m-1"
        v-if="!favorites.length"
      >
        <div
          class="
            text-sm
            font-normal
            text-red-400
            font-bold
            max-w-full
            flex-initial
          "
        >
          No se encontraron libros en favoritos
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ItemBookComponent from "@/components/ItemBook.vue";
import NavbarComponent from "@/components/NavbarApp.vue";
export default {
  components: {
    "item-libro": ItemBookComponent,
    "header-navegacion": NavbarComponent,
  },
  computed: {
    favorites() {
      return this.$store.state.favorites;
    },
  },
  methods: {
    setKeyDetailsAndGoTo(item) {
      const { key } = item;
      const vm = this;
      vm.$store.dispatch("setKeyDetailsBook", key);
      vm.$router.push({ path: "/DetailsBook", query: { key } });
    }
  },
};
</script>
