<template>
  <div class="cellWrapper">
    <h3>{{ label }}</h3>
    <EditAndDelete
      v-if="withButtons"
      @editClicked="editClicked(editClicked)"
      @deleteClicked="deleteClicked(deleteClicked)"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import EditAndDelete from "@/presentation/adminPanel/components/EditAndDelete.vue";

@Component({
  props: {
    label: String,
    withButtons: {
      default: true,
      type: Boolean
    }
  },
  components: { EditAndDelete }
})
export default class Cell extends Vue {
  deleteClicked() {
    this.$emit("deleteClicked");
  }

  editClicked() {
    this.$emit("editClicked");
  }
}
</script>

<style scoped lang="scss">
.cellWrapper {
  display: flex;
  padding: 5px;
  align-items: center;
  justify-content: space-between;
  margin: 5px;
  width: 430px;
  border: 1px solid black;
}

h3 {
  overflow-wrap: break-word;
  width: 300px;
}
</style>
