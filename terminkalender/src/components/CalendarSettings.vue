<template>
  <div id="calendar-settings">
    <div class="card">
      <div class="card-header text-center bg-success text-white">
        <strong>Einstellungen</strong>
      </div>
      <div class="card-body">
        <ul class="nav nav-pills nav-fill">
          <li
            v-for="(icon, componentName) in views"
            :key="componentName"
            class="nav-item"
            role="button"
          >
            <a
              class="nav-link"
              :class="isActiveView(componentName)"
              @click="changeActiveView(componentName)"
              ><i class="fas fa-icons text-success" :class="icon"></i
            ></a>
          </li>
        </ul>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import Store from "../store.js";
export default {
  name: "CalendarSettings",
  data() {
    return {
      views: {
        CalendarWeek: "fas fa-table",
        CalendarWeekAsList: "fas fa-list",
      },
    };
  },
  methods: {
    changeActiveView(componentName) {
      Store.mutations.setActiveView(componentName);
    },
    isActiveView(componentName) {
      if (componentName === Store.getters.activeView()) {
        return ["border border-success"];
      }
    },
  },
};
</script>

<style scoped></style>
