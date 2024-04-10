<template>
  <div class="card border-start" :class="cardClasses">
    <div
      class="card-header text-center"
      :class="cardHeaderClasses"
      role="button"
      @click="setActiveDay()"
    >
      <strong>{{ day.fullName }}</strong>
    </div>
    <div class="card-body">
      <!-- Anfang: Template für die Calendar-Event-Component -->
      <CalendarEvent
        v-for="event in day.events"
        :key="event.titel"
        :event="event"
        :day="day"
      >
        <template #eventPriority="slotProps">
          <h5>{{ slotProps.priorityDisplayName }}</h5>
        </template>
        <!-- <template v-slot:default></template> -->
        <template #default="{ event: entry }">
          <em>{{ entry.title }}</em>
        </template>
      </CalendarEvent>
      <!-- Ende: Template für die Calendar-Event-Component -->
    </div>
  </div>
</template>

<script>
import CalendarEvent from "./CalendarEvent.vue";
import Store from "../store";
export default {
  name: "CalendarDay",
  components: {
    CalendarEvent,
  },
  // Array-Schreibweise - nicht zu empfehlen
  // props: ["day"],
  // Object-Schreibweise - zu empfehlen
  props: {
    // Mögliche Typen: String, Number, Boolean, Array, Object oder Funktion
    // Mehrere Typen mit Array-Schreibweise möglich: [String, Number]
    // day: Object,
    day: {
      type: Object,
      required: true,
      // Bsp.: Primitive Datentypen: default: "Montag"
      // Bsp.: Komplexe Datentypen: default: function() { return { id: -1, fullName: "Fehlender Wochentag" } }
      default: function () {
        return {
          id: -1,
          fullName: "Fehlender Wochentag",
          events: [],
        };
      },
      validator: function (value) {
        return Object.keys(value).includes("id");
      },
    },
  },
  computed: {
    cardClasses() {
      return this.day.id === Store.getters.activeDay().id
        ? ["border-primary"]
        : [];
    },
    cardHeaderClasses() {
      return this.day.id === Store.getters.activeDay().id
        ? ["bg-primary", "text-white"]
        : [];
    },
  },
  methods: {
    setActiveDay() {
      Store.mutations.setActiveDay(this.day.id);
    },
  },
};
</script>

<style scoped></style>
