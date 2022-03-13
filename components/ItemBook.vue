<template>
  <div class="flex">
    <div class="my-2 w-full">
      <article
        class="
          overflow-hidden
          rounded-lg
          hover:shadow-md
          bg-gray-100
          hover:bg-gray-200
          cursor-pointer
        "
      >
        <header
          class="flex items-center justify-between leading-tight p-4 border-2"
        >
          <div class="flex flex-col">
            <h1 class="text-md font-bold text-blue-500">{{ item.title }}</h1>

            <div>
              <small class="font-bold">Author(s):</small>
              <small>{{ item.author_name && item.author_name.join() }}</small>
            </div>
          </div>
          <div class="text-grey-darker hover:text-red-dark">
            <button
              v-if="modelShowAddFavorite"
              @click.stop="addFavorite(item)"
              class="
                h-8
                w-40
                text-white
                rounded-md
                bg-green-400
                hover:bg-green-500
              "
            >
              <small class="font-bold">
                <i class="fas fa-star"></i>
                Add
              </small>
            </button>
            <button
              v-if="modelShowRemoveFavorite"
              @click.stop="removeFavorite(item)"
              class="h-8 w-40 text-white rounded-md bg-red-500 hover:bg-red-600"
            >
              <small class="font-bold">
                <i class="fas fa-star"></i>
                Remove
              </small>
            </button>
          </div>
        </header>
      </article>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
    },
    showAddFavorite: {
      type: Boolean,
      default: false,
    },
    showRemoveFavorite: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      modelShowAddFavorite: this.showAddFavorite,
      modelShowRemoveFavorite: this.showRemoveFavorite,
    };
  },
  mounted() {
    this.checkStatusFavorite();
  },
  methods: {
    async addFavorite() {
      await this.$store.dispatch("addFavorite", this.item);
      this.checkStatusFavorite();
    },
    async removeFavorite() {
      await this.$store.dispatch("removeFavorite", this.item);
      this.checkStatusFavorite();
    },
    checkStatusFavorite() {
      const pos = this.$store.state.favorites.findIndex(
        (e) => e.key === this.item.key
      );
      if (pos !== -1) {
        this.modelShowRemoveFavorite = true;
        this.modelShowAddFavorite = false;
      } else {
        if (this.showAddFavorite) this.modelShowAddFavorite = true;
        this.modelShowRemoveFavorite = false;
      }
    },
  },
};
</script>
