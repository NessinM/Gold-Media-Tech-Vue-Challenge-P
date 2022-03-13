import axios from "axios";

//to handle state
const state = {
  books: [],
  favorites: [],
  transaction: {
    isLoading: false,
    message: "",
  },
  filterBy      : "title",
  filterValue   : "Fantastic Mr Fox",
  keyBookDetails: "",
  detailsBook   : {},
};

//to handle state
const getters = {
  allBooks         : (state) => state.books,
  allFavorites     : (state) => state.favorites,
  transaction      : (state) => state.transaction,
  filterBy         : (state) => state.filterBy,
  filterValue      : (state) => state.filterValue,
  getKeyBookDetails: (state) => state.keyBookDetails,
  getBookDetails   : (state) => state.detailsBook,
};

//to handle actions
const actions = {
  getSearchBooks({ commit, state }) {
    commit("SET_TRANSACTION", {
      isLoading: true,
      message  : `Obteniendo listado de libros...`,
    });
    const url = `http://openlibrary.org/search.json?${state.filterBy}=${state.filterValue}`;
    axios.get(url).then((response) => {
      commit("SET_BOOKS", response.data.docs);
      commit("SET_TRANSACTION", { isLoading: false, message: "" });
    }).catch((error) => {
      alert(`Error al intentar recuperar informacion de la API: ${error}`)
    })
  },
  getDetailsBook({ commit, state }) {
    commit("SET_TRANSACTION", {
      isLoading: true,
      message  : `Obteniendo detalles del libro  ${state.keyBookDetails}...`,
    });
    const url = `https://openlibrary.org${state.keyBookDetails}.json`;
    return new Promise((resolve, reject) => {
      axios.get(url).then((response) => {
        let objAux = response.data
        objAux.urlCover = objAux.covers ? `https://covers.openlibrary.org/b/id/${objAux.covers[0]}-M.jpg` : 'https://psicotecnicoelzahor.es/wp-content/uploads/2016/05/ef3-placeholder-image.jpg'
        commit("SET_DETAILS_BOOK", objAux);
        commit("SET_TRANSACTION", { isLoading: false, message: "" });
        resolve()
      }).catch((error) => {
        reject(error)
        alert(`Error al intentar recuperar informacion de la API: ${error}` )
      })
    })
  },
  setListBooks({ commit }, list) {
    commit("SET_BOOKS", list);
  },
  setFilterBy({ commit }, by) {
    commit("SET_FILTER_BY", by);
  },
  setFilterValue({ commit }, value) {
    commit("SET_FILTER_VALUE", value);
  },
  setKeyDetailsBook({ commit }, value) {
    commit("SET_KEY_DETAILS_BOOK", value);
  },
  addFavorite({ commit }, item) {
    commit("ADD_FAVORITE", item);
  },
  removeFavorite({ commit }, item) {
    commit("REMOVE_FAVORITE", item);
  },
};

//to handle mutations
const mutations = {
  SET_BOOKS(state, books) {
    state.books = books;
  },
  SET_FILTER_BY(state, payloand) {
    state.filterBy = payloand;
  },
  SET_FILTER_VALUE(state, payloand) {
    state.filterValue = payloand;
  },
  SET_KEY_DETAILS_BOOK(state, payloand) {
    state.keyBookDetails = payloand;
  },
  SET_DETAILS_BOOK(state, payloand) {
    state.detailsBook = payloand;
  },
  SET_TRANSACTION(state, payloand) {
    state.transaction = payloand;
  },
  ADD_FAVORITE(state, payloand) {
    const existe = state.favorites.findIndex((e) => e.key === payloand.key);
    if (existe === -1) state.favorites.push(payloand);
    else
      console.log(`El libro ${payloand.title} ya se encuentra agregado a favoritos`)

  },
  REMOVE_FAVORITE(state, payloand) {
    const existe = state.favorites.findIndex((e) => e.key === payloand.key);
    if (existe !== -1) state.favorites.splice(existe, 1);
    console.log(`El libro ${payloand.title} fue removido de los favoritos`)
  },
};

//export store module
export default {
  state,
  getters,
  actions,
  mutations,
};
