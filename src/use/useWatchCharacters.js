import { watch } from "vue";

export function useWatchCharacters(value, maxChar = 100) {
  watch(value, (newValue) => {
    if (newValue.length === maxChar) {
      alert(`Only ${maxChar} characters allowed gosh darnit!`);
    }
  });
}
