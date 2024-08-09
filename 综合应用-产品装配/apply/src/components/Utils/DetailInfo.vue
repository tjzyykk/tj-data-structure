<template>
  <el-dialog
      v-model="DialogVisilble"
      :before-close="closeDialog"
      title="依赖设置"
      width="40%"
      draggable
    >
      <div style="margin-top: -15px;"></div>
      <div class="item-class">
        <div>零件名：{{ now_item }}</div>
        <div style="margin-bottom: -10px;">
          <el-form-item label="是否依赖之前的零件：">
            <el-radio-group v-model="dependInfo.isDepend">
              <el-radio :label="true" size="small">依赖</el-radio>
              <el-radio :label="false" size="small">不依赖</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <div v-if="dependInfo.isDepend == true">
          <div style="margin-bottom: 20px;">依赖起始：<el-input-number v-model="dependInfo.start" :min="1" :max="pathInfo.length" /></div>
          <div>依赖终止：<el-input-number v-model="dependInfo.end" :min="dependInfo.start" :max="pathInfo.length" /></div>
        </div>
      </div>
      <div class="errInfo"> {{ err_msg }} </div>
      <div style="margin-bottom: 15px;"></div>
      <div style="display: flex; border-top: 1px solid #f1f2f4;">
        <div style="flex: 1;"></div>
        <el-button type="primary" @click="doSetDetail" style="margin-bottom: -15px; margin-top: 10px;">
          确定
        </el-button>
      </div>
  </el-dialog>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'DetailInfo',
  components: {
  },
  props:['now_item','pathInfo'],
  setup(props,context) {

    // 控制Dialog显示
    const DialogVisilble = ref(false);
    const err_msg = ref('');

    // 依赖关系
    const dependInfo = ref({isDepend:false,start:1,end:1});
    // 设置
    const doSetDetail = () => {
      // 校验参数
      err_msg.value = '';
      if(dependInfo.value.isDepend == true && dependInfo.value.start > dependInfo.value.end) {
        err_msg.value = '依赖关系错误';
        return;
      }
      context.emit('doSetDetail',dependInfo.value.start,dependInfo.value.end,dependInfo.value.isDepend);
      err_msg.value = '';
      dependInfo.value = {isDepend:false,start:1,end:1};
      DialogVisilble.value = false;
    }

    // 关闭
    const closeDialog = (done) => {
      err_msg.value = '';
      dependInfo.value = {isDepend:false,start:1,end:1};
      done();
    }

    return {
      dependInfo,
      doSetDetail,
      DialogVisilble,
      err_msg,
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
  