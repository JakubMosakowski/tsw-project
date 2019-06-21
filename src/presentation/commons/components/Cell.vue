<template>
  <div class="cellWrapper" @click="cellClicked">
    <div class="textWrapper">
      <h3 v-if="withIndex" class="number">{{ index }}.</h3>
      <h3 class="label">{{ label }}</h3>
    </div>
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
import EditAndDelete from "@/presentation/commons/components/EditAndDelete.vue";

@Component({
  props: {
    label: String,
    index: Number,
    withButtons: {
      default: true,
      type: Boolean
    }
  },
  components: { EditAndDelete }
})
export default class Cell extends Vue {
  get withIndex() {
    return this.$props.index !== undefined;
  }
  deleteClicked() {
    this.$emit("deleteClicked");
  }

  editClicked() {
    this.$emit("editClicked");
  }

  cellClicked() {
    this.$emit("cellClicked");
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

.label {
  overflow-wrap: break-word;
  width: 300px;
  margin-left: 15px;
}

.textWrapper {
  display: flex;
}
</style>
