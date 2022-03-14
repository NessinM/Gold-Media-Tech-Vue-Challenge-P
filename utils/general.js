export function notify (vm, type, title, text) {
  vm.$notify({
    title: title,
    text : text,
    type : type
  });
}
