<template>
  <el-dialog
      v-model="DialogVisilble"
      :before-close="closeDialog"
      title="创建零件"
      width="40%"
    >
    <div style="margin-top: -15px;"></div>
    <div class="item-class">
      <div>零件名：</div>
      <div><el-input v-model="item_name" placeholder="请输入零件名称" clearable /></div>
    </div>
    <div class="errInfo"> {{ err_msg }} </div>
    <div style="margin-bottom: 15px;"></div>
    <div style="display: flex; border-top: 1px solid #f1f2f4;">
      <div style="flex: 1;"></div>
      <el-button type="primary" @click="doCreateItem" style="margin-bottom: -15px; margin-top: 10px;">
        确定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'CreateItem',
  components: {
  },
  props:['itemInfo'],
  setup(props,context) {

    // 控制Dialog显示
    const DialogVisilble = ref(false);
    const err_msg = ref('');
    const item_name = ref('');

    // 创建零件
    const doCreateItem = () => {
      // 校验参数
      err_msg.value = '';
      if(item_name.value == '') {
        err_msg.value = '零件名不能为空';
        return;
      }
      for(let i=0;i<props.itemInfo.length;i++) {
        if(item_name.value == props.itemInfo[i].name) {
            err_msg.value = '零件名重复';
            return;
        }
      }
      context.emit('doCreateItem',item_name.value);
      err_msg.value = '';
      item_name.value = '';
      DialogVisilble.value = false;
    }

    // 关闭
    const closeDialog = (done) => {
      err_msg.value = '';
      item_name.value = '';
      done();
    }

    return {
      DialogVisilble,
      doCreateItem,
      closeDialog,
      item_name,
      err_msg,


    }
  }
}
</script>

<style scoped>
.item-class {
  display: flex;
  align-items: center;
}

.errInfo{
  font-size: 12px;
  color: rgb(234, 80, 80);
  margin-top: 5px;
}
</style>