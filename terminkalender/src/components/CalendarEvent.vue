<template>
  <div id="calendar-event">
    <div class="alert text-center" :class="alertColor">
      <!-- Template für den Fall, dass das Event nicht bearbeitet wird -->
      <template v-if="!event.edit">
        <div>
          <!-- <strong>{{ priorityDisplayName }}</strong> -->
          <slot name="eventPriority" :priorityDisplayName="priorityDisplayName">
            <!-- fallback content, also der ursprüngliche Inhalt -->
            <strong>{{ priorityDisplayName }}</strong>
          </slot>
        </div>

        <!-- <div>{{ event.title }}</div> -->
        <slot :event="event">
          <!-- fallback content, also der ursprüngliche Inhalt -->
          <div>{{ event.title }}</div>
        </slot>

        <div>
          <i class="fas fa-edit me-2" role="button" @click="editEvent()"></i>
          <i class="far fa-trash-alt" role="button" @click="deleteEvent()"></i>
        </div>
      </template>
      <template v-else>
        <input
          type="text"
          class="form-control"
          ref="newEventTitleInput"
          :placeholder="event.title"
          @input="setNewEventTitle($event)"
        />
        <select class="form-select mt-2" v-model="newEventPriority">
          <option value="-1">Hoch</option>
          <option value="0">Mittel</option>
          <option value="1">Tief</option>
        </select>
        <hr />
        <i class="fas fa-check" role="button" @click="updateEvent()"></i>
      </template>
    </div>
  </div>
</template>

<script>
import Store from "../store";
export default {
  name: "CalendarEvent",
  props: {
    event: Object,
    day: Object,
  },
  data() {
    return {
      newEventTitle: "",
      newEventPriority: this.event.priority,
    };
  },
  computed: {
    priorityDisplayName() {
      switch (this.event.priority) {
        case 1:
          return "Niedrig";
        case 0:
          return "Normal";
        case -1:
          return "Hoch";
        default:
          return "Unbekannte Proirität";
      }
    },
    alertColor() {
      return "alert-" + this.event.color;
    },
  },
  methods: {
    deleteEvent() {
      Store.mutations.deleteEvent(this.day.id, this.event.title);
    },
    editEvent() {
      Store.mutations.editEvent(this.day.id, this.event.title);
      // Auf die template refs zugreifen
      this.$nextTick(() => {
        this.$refs.newEventTitleInput.focus();
      });
    },
    updateEvent() {
      Store.mutations.updateEvent(this.day.id, this.event.title, {
        title: this.newEventTitle,
        priority: this.newEventPriority,
      });
    },
    setNewEventTitle(event) {
      this.newEventTitle = event.target.value;
    },
  },
};
</script>

<style scoped></style>
