<template>
  <el-dialog
    v-model="DialogVisilble"
    title="提示"
    width="40%"
  >
    <div style="margin-top: -15px;"></div>
    <div class="item-class">
      <el-icon size="20" ><InfoFilled /></el-icon>
      <div style="margin: 0 5px;"></div>
      <div>{{ msg }}</div>
    </div>
    <div style="margin-bottom: 15px;"></div>
    <div style="display: flex; border-top: 1px solid #f1f2f4;">
      <div style="flex: 1;"></div>
      <el-button type="primary" @click="confirmReCall" style="margin-bottom: -15px; margin-top: 10px;">
        确定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { ref } from 'vue';

export default {
  name:'TipsBlock',
  components: {
  },
  props:['msg'],
  setup(props,context) {

    // 控制Dialog显示
    const DialogVisilble = ref(false);

    const confirmReCall = () => {
      context.emit('confirmReCall');
      DialogVisilble.value = false;
    }


    return {
      DialogVisilble,
      confirmReCall,
    }
  }

}
</script>

<style scoped>
.item-class {
  display: flex;
}

</style>