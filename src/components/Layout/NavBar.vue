<template>
  <nav class="navbar is-success" role="navigation" aria-label="main navigation">
    <div class="container is-max-desktop">
      <div class="navbar-brand">
        <div class="navbar-item is-size-4 is-family-monospace">Noteballs</div>

        <a
          @click.prevent="showModalNav = !showModalNav"
          role="button"
          class="navbar-burger"
          :class="{ 'is-active': showModalNav }"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          ref="navbarBurguerRef"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        class="navbar-menu"
        :class="{ 'is-active': showModalNav }"
        ref="navbarRef"
      >
        <div class="navbar-end">
          <RouterLink
            @click="showModalNav = false"
            to="/"
            class="navbar-item"
            active-class="is-active"
          >
            Notes
          </RouterLink>
          <RouterLink
            @click="showModalNav = false"
            to="/stats"
            class="navbar-item"
            active-class="is-active"
          >
            Stats
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";

const showModalNav = ref(false);

const navbarRef = ref(null);
const navbarBurguerRef = ref(null);

onClickOutside(
  navbarRef,
  () => {
    showModalNav.value = false;
  },
  {
    ignore: [navbarBurguerRef],
  }
);
</script>

<style>
@media (max-width: 1023px) {
  .navbar-menu {
    position: absolute;
    left: 0;
    width: 100%;
  }
}
</style>
