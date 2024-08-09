<template>
  <el-dialog
      v-model="DialogVisilble"
      :before-close="closeDialog"
      title="创建"
      width="40%"
    >
      <div style="margin-top: -15px;"></div>
      <div class="item-class">
        节点数：<el-input-number v-model="count" :min="2" :max="6" />
      </div>
      <div class="errInfo"> {{ err_msg }} </div>
      <div style="margin-bottom: 15px;"></div>
      <div style="display: flex; border-top: 1px solid #f1f2f4;">
        <div style="flex: 1;"></div>
        <el-button type="primary" @click="doCreateNodes" style="margin-bottom: -15px; margin-top: 10px;">
          确定
        </el-button>
      </div>
  </el-dialog>
</template>

<script>
import { ref } from 'vue'

export default {
  name:'CreateNode',
  components: {
  },
  setup(props,context) {

    // 控制Dialog显示
    const DialogVisilble = ref(false);
    const err_msg = ref('');
    const count = ref(0);

    // 创建
    const doCreateNodes = () => {
      // 校验参数
      err_msg.value = '';
      if(!count.value || count.value <2 || count.value > 6) {
        err_msg.value = '请选择合法的节点数';
        return;
      }
      context.emit('doCreateNodes',count.value);
      DialogVisilble.value = false;
    }

    // 关闭
    const closeDialog = (done) => {
      err_msg.value = '';
      count.value = 0;
      done();
    }

    return {
      DialogVisilble,
      err_msg,
      count,
      doCreateNodes,
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