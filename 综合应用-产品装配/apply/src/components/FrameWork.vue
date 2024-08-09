<template>
  <div class="global">
    <div style="float: left; width: 250px">
      <div class="item-info">
        <div style="margin-bottom: 10px; text-align: right;">
          <el-button :icon="Plus" size="small" type="primary" @click="createItemRef.DialogVisilble = true" >
            生成零件
          </el-button>
        </div>
        <div v-if="itemInfo.length == 0">
          <div><el-empty :image-size="80" description="当前没有零件" style="padding: 0 0; margin: 0 0; margin-top: 6vh;" /></div>
        </div>
        <div v-else style="height: 85%; overflow-y: scroll;">
          <div v-for="(item,index) in itemInfo" :key="index">
            <div class="item-show"  
              @mouseenter="item.isShow = true;"
              @mouseleave="item.isShow = false;">
              <el-icon><Files /></el-icon>
              <div style="margin-left: 5px;">{{ item.name }}</div>
              <div style="flex: 1;"></div>
              <div v-if="item.isShow == true && chooseType == 0" @click="delItemConfirmRef.DialogVisilble = true; delItemName = item.name" style="font-size: 12px; cursor: pointer;">删除</div>
            </div>
          </div>
        </div>
      </div>
      <div class="product-info">
        <div style="margin-bottom: 10px; text-align: right;">
          <el-button :icon="Plus" size="small" type="primary" @click="createProductRef.DialogVisilble = true" >
            添加产品
          </el-button>
        </div>
        <div v-if="productInfo.length == 0">
          <div><el-empty :image-size="80" description="当前没有产品" style="padding: 0 0; margin: 0 0; margin-top: 6vh;" /></div>
        </div>
        <div v-else  style="height: 85%; overflow-y: scroll;">
          <div v-for="(product,index) in productInfo" :key="index" >
            <div class="item-show"  
              @mouseenter="product.isShow = true;"
              @mouseleave="product.isShow = false;">
              <el-icon><Collection /></el-icon>
              <div style="margin-left: 5px;">{{ product.name }}</div>
              <div style="flex: 1;"></div>
              <div v-if="product.isShow == true && chooseType == 0" @click="delProductConfirmRef.DialogVisilble = true; delProductName = product.name" style="font-size: 12px; cursor: pointer;">删除</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="width: 650px; float: right;">
      <div class="title">产品装配</div>
      <div style="height: 400px; display: flex; flex-direction: column; align-items: center; ">
        <div style="flex: 1;"></div>
        <InfoMsg style="box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);" v-if="chooseType == 0"></InfoMsg>
        <DefinePath style="box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);" :itemInfo="itemInfo" :productInfo="productInfo" :selectProduct="selectProduct"
           @addPath="addPath" @deletePath="deletePath"
          v-if="chooseType == 1">
          </DefinePath>
          <RepairWork style="box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);" v-if="chooseType == 2"
          :itemInfo="itemInfo" :productInfo="productInfo" :selectProduct="selectProduct" >
          </RepairWork>
        <div style="flex: 1;"></div>
      </div>
    </div>
  </div>

  <!-- 操作按钮 -->
  <div class="footer-class">
    <div style="display: flex; align-items: center;">
      <el-button :disabled="chooseType == 2 || productInfo.length == 0 || selectProduct == ''" type="info" plain @click="chooseType = 2" >
        拆解安装
      </el-button>
      <el-button :disabled="chooseType == 1 || productInfo.length == 0 || selectProduct == ''" type="info" plain @click="chooseType = 1" >
        定义产品装配路径
      </el-button>
      <el-button :disabled="chooseType != 0 || productInfo.length == 0" type="info" plain @click="selectProductRef.DialogVisilble = true" >
        选择产品
      </el-button>
      <el-button :disabled="chooseType == 0" :icon="Discount" type="info" plain @click="chooseType = 0" >
        首页
      </el-button>
    </div>
  </div>

  <CreateItem ref="createItemRef" :itemInfo="itemInfo" @doCreateItem="doCreateItem"></CreateItem>
  <TipsBlock ref="delItemConfirmRef" :msg="delItemMsg" @confirmReCall="delItem" ></TipsBlock>

  <CreateProduct ref="createProductRef" :productInfo="productInfo" @doCreateProduct="doCreateProduct" ></CreateProduct>
  <TipsBlock ref="delProductConfirmRef" :msg="delProductMsg" @confirmReCall="delProduct" ></TipsBlock>

  <SelectProduct ref="selectProductRef" :productInfo="productInfo" @doSelectProduct="doSelectProduct" ></SelectProduct>


</template>

<script>
import { ref } from 'vue'
import CreateItem from './Utils/CreateItem'
import CreateProduct from './Utils/CreateProduct';
import SelectProduct from './Utils/SelectProduct'
import TipsBlock from './Utils/TipsBlock'
import InfoMsg from './Utils/InfoMsg'
import DefinePath from './DefinePath'
import RepairWork from './RepairWork'
import { ElMessage } from 'element-plus'

import {
  Plus,
  Discount,
} from '@element-plus/icons-vue'

export default {
  name: 'FrameWork',
  components: {
    CreateItem,
    TipsBlock,
    CreateProduct,
    SelectProduct,
    InfoMsg,
    DefinePath,
    RepairWork,
  },
  setup() {

    // 展示选择
    const chooseType = ref(0);

    // 零件信息
    const itemInfo = ref([]);
    const createItemRef = ref();
    const doCreateItem = (name) => {
      itemInfo.value.push({name:name,path:[]});
    }
    const delItemConfirmRef = ref();
    const delItemMsg = ref('用到此零件的产品也会一并删除，确认删除该零件吗');
    const delItemName = ref('');
    const delItem = () => {
      if(delItemName.value == '') return;
      for(let i=0;i<itemInfo.value.length;i++) {
        if(delItemName.value == itemInfo.value[i].name) {
          // 连带删除相关产品
          doDelUseProduct(delItemName.value);
          itemInfo.value.splice(i, 1);
          delItemName.value = '';
          return;
        }
      }
    }

    // 产品信息
    const productInfo = ref([]);
    const createProductRef = ref();
    const doCreateProduct = (name) => {
      productInfo.value.push({name:name,path:[]});
    }
    // 选择产品
    const selectProductRef = ref();
    const selectProduct = ref('')
    const doSelectProduct = (name) => {
      selectProduct.value = name;
      ElMessage({
        showClose: true,
        message: '已选择产品：' + name,
        type: 'success',
      })
    }
    const delProductConfirmRef = ref();
    const delProductMsg = ref('确认删除该产品吗');
    const delProductName = ref('');
    const delProduct = () => {
      if(delProductName.value == '') return;
      if(delProductName.value == selectProduct.value) {
        selectProduct.value = '';
      }
      for(let i=0;i<productInfo.value.length;i++) {
        if(delProductName.value == productInfo.value[i].name) {
          productInfo.value.splice(i, 1);
          delProductName.value = '';
          return;
        }
      }
    }
    // 产品添加/删除路径
    const addPath = (setInfo,now_item) => {
      for(let i=0;i<productInfo.value.length;i++) {
        if(selectProduct.value == productInfo.value[i].name) {
          productInfo.value[i].path.push({
            ...setInfo,
            item:now_item,
          });
          return;
        }
      }
    }
    const deletePath = () => {
      for(let i=0;i<productInfo.value.length;i++) {
        if(selectProduct.value == productInfo.value[i].name) {
          productInfo.value[i].path.pop();
          return;
        }
      }
    }
    const doDelUseProduct = (item_name) => {
     let tag = -1;
      while(tag == -1) {
        for(let i=0;i<productInfo.value.length;i++) {
          for(let j=0;j<productInfo.value[i].path.length;j++) {
            if(productInfo.value[i].path[j].item == item_name) {
              tag = i;
              break;
            }
          }
        }
        if(tag != -1) {
          productInfo.value.splice(tag, 1);
          tag = -1;
        }
        else break;
      }
    }



    return {
      Plus,
      itemInfo,
      productInfo,
      doCreateItem,
      createItemRef,
      delItem,
      chooseType,
      delItemConfirmRef,
      delItemMsg,
      delItemName,
      createProductRef,
      doCreateProduct,
      delProductConfirmRef,
      delProductMsg,
      delProductName,
      delProduct,
      selectProductRef,
      doSelectProduct,
      selectProduct,
      addPath,
      deletePath,
      Discount,

    }
  }
}
</script>

<style scoped>
.global {
  height: 100vh;
  background-color: #79bbff;
  padding: 10px 3%;
  color: white;
}

.item-info {
  height: 220px;
  width: 350px;
  background-color: white;
  margin-top: 20px;
  padding: 10px 10px;
  color: #409eff;
  border-radius: 5px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.product-info {
  height: 220px;
  width: 350px;
  background-color: white;
  margin-top: 20px;
  padding: 10px 10px;
  color: #409eff;
  border-radius: 5px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.item-show {
  padding: 5px 10px;
  border-bottom: 1px solid #c8c9cc;
  display: flex;
  align-items: center;
}

.item-show:hover{
  background: #f3f3f3;
}

.title {
  font-size: 20px;
  text-align: center;
  margin-top: 10px;
}

.footer-class {
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 20px 20px;
}


</style>