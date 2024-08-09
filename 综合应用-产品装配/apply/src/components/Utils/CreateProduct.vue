<template>
  <el-dialog
      v-model="DialogVisilble"
      :before-close="closeDialog"
      title="创建产品"
      width="40%"
    >
    <div style="margin-top: -15px;"></div>
    <div class="item-class">
      <div>产品名：</div>
      <div><el-input v-model="product_name" placeholder="请输入产品名称" clearable /></div>
    </div>
    <div class="errInfo"> {{ err_msg }} </div>
    <div style="margin-bottom: 15px;"></div>
    <div style="display: flex; border-top: 1px solid #f1f2f4;">
      <div style="flex: 1;"></div>
      <el-button type="primary" @click="doCreateProduct" style="margin-bottom: -15px; margin-top: 10px;">
        确定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'CreateProduct',
  components: {
  },
  props:['productInfo'],
  setup(props,context) {

    // 控制Dialog显示
    const DialogVisilble = ref(false);
    const err_msg = ref('');
    const product_name = ref('');

    // 创建产品
    const doCreateProduct = () => {
      // 校验参数
      err_msg.value = '';
      if(product_name.value == '') {
        err_msg.value = '产品名不能为空';
        return;
      }
      for(let i=0;i<props.productInfo.length;i++) {
        if(product_name.value == props.productInfo[i].name) {
            err_msg.value = '产品名重复';
            return;
        }
      }
      context.emit('doCreateProduct',product_name.value);
      err_msg.value = '';
      product_name.value = '';
      DialogVisilble.value = false;
    }

    // 关闭
    const closeDialog = (done) => {
      err_msg.value = '';
      product_name.value = '';
      done();
    }

    return {
      DialogVisilble,
      doCreateProduct,
      closeDialog,
      product_name,
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