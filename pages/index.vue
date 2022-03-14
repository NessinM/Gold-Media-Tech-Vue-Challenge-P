<template>
  <div>
    <notifications class="mt-20" position="top center" />
    <buscar-libros />
  </div>
</template>

<script>
import SearchBook from "./SearchBook.vue";
export default {
  components: {
    "buscar-libros": SearchBook,
  },
  data() {
    return {};
  },
};
</script>
