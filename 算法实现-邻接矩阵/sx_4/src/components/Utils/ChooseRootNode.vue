<template>
  <el-dialog
      v-model="DialogVisilble"
      :before-close="closeDialog"
      title="选择根节点"
      width="40%"
    >
      <div style="margin-top: -15px;"></div>
      <div class="item-class">
        <div style="margin-bottom: 20px;">当前节点数：{{ count }}</div>
        <div>根节点：<el-input-number v-model="rootNode" :min="1" :max="count" /></div>
      </div>
      <div class="errInfo"> {{ err_msg }} </div>
      <div style="margin-bottom: 15px;"></div>
      <div style="display: flex; border-top: 1px solid #f1f2f4;">
        <div style="flex: 1;"></div>
        <el-button type="primary" @click="doChooseRootNode" style="margin-bottom: -15px; margin-top: 10px;">
          确定
        </el-button>
      </div>
  </el-dialog>
</template>

<script>
import { ref } from 'vue'

export default {
  name:'ChooseRootNode',
  components: {
  },
  props:['count'],
  setup(props,context) {

    // 控制Dialog显示
    const DialogVisilble = ref(false);
    const err_msg = ref('');
    const rootNode = ref(0);

    // 创建
    const doChooseRootNode = () => {
      // 校验参数
      err_msg.value = '';
      if(!rootNode.value || rootNode.value < 1 || rootNode.value > props.count) {
        err_msg.value = '请选择合法的节点作为根节点';
        return;
      }
      context.emit('doChooseRootNode',rootNode.value - 1);
      DialogVisilble.value = false;
    }

    // 关闭
    const closeDialog = (done) => {
      err_msg.value = '';
      rootNode.value = 0;
      done();
    }

    return {
      DialogVisilble,
      err_msg,
      rootNode,
      doChooseRootNode,
      closeDialog,

    }
  }

}
</script>

<style scoped>

.errInfo{
  font-size: 12px;
  color: rgb(234, 80, 80);
  margin-top: 5px;
}
</style>