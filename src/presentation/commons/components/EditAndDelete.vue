<template>
  <div class="editAndDeleteWrapper">
    <CustomButton icon="trash" color="red" @clicked="deleteClicked" />
    <CustomButton icon="edit" @clicked="editClicked" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import CustomButton from "@/presentation/commons/components/CustomButton.vue";

@Component({
  components: {
    CustomButton
  }
})
export default class EditAndDelete extends Vue {
  deleteClicked() {
    this.$emit("deleteClicked");
  }

  editClicked() {
    this.$emit("editClicked");
  }
}
</script>

<style scoped lang="scss">
.editAndDeleteWrapper {
  display: flex;
}

.customButton {
  margin: 0 5px;
}
</style>
