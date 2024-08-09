<template>
  <div class="path-global">
    <div style="width: 610px; position: fixed;">
      <div style="display: flex; align-items: center;">
        <div>当前产品：{{ selectProduct }}</div>
        <div style="flex: 1;"></div>
        <div>
          <el-input size="small" style="width: 130px;" v-model="now_item" placeholder="请输入要装配的零件" clearable />
        </div>
        <div style="margin-left: 15px;">
          <el-button :disabled="pathInfo.length == 0 || now_item == ''" :icon="Setting" size="small" type="primary" @click="detailInfoRef.DialogVisilble = true" >
            依赖设置
          </el-button>
        </div>
        <div style="margin-left: 15px;">
          <el-button :disabled="now_item == ''" :icon="Plus" size="small" type="primary" @click="addPath" >
            确定添加
          </el-button>
        </div>
        <div style="margin-left: 15px;">
          <el-button :disabled="pathInfo.length == 0" :icon="Delete" size="small" type="primary" @click="deletePath" >
            删除顶层路径
          </el-button>
        </div>
      </div>
    </div>
    <div style="margin-top: 50px; margin-bottom: 10px;">
      <div v-if="pathInfo.length == 0"><el-empty :image-size="80" description="当前产品没有装配路径" style="padding: 0 0; margin: 0 0; margin-top: 10vh;" /></div>
      <div style="display: flex; align-items: center;">
        <div v-for="(path,index) in pathInfo" :key="index" >
          <div v-if="path.isDepend == false" style="margin-right: 20px; display: flex; flex-direction: column; align-items: center;">
            <div><el-button type="success" >{{ path.item }} </el-button></div>
            <div class="a-link" style="margin-top: 5px;">{{ index+1 }}</div>
          </div>
          <div v-else class="node-class" style="margin-right: 20px; display: flex; flex-direction: column; align-items: center;">
            <div><el-button type="danger" >{{ path.item }}（{{ path.start }}-{{ path.end }}） </el-button></div>
            <div class="a-link" style="margin-top: 5px;">{{ index+1 }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <DetailInfo ref="detailInfoRef" 
    :now_item="now_item" :pathInfo="pathInfo" @doSetDetail="doSetDetail" >
  </DetailInfo>


</template>

<script>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import DetailInfo from './Utils/DetailInfo'
import {
  Plus,
  Setting,
  Delete,
} from '@element-plus/icons-vue'

export default {
  name: 'DefinePath',
  components: {
    DetailInfo,
  },
  props:['itemInfo','productInfo','selectProduct'],
  setup(props,context) {

    // 当前要装配的零件
    const now_item = ref('');
    // 装配路径
    const pathInfo = ref([]);
    for(let i=0;i<props.productInfo.length;i++) {
      if(props.selectProduct == props.productInfo[i].name) {
        for(let j=0;j<props.productInfo[i].path.length;j++) {
            pathInfo.value.push(props.productInfo[i].path[j]);
        }
      }
    }

    // 详细设置
    const detailInfoRef = ref();
    const setInfo = ref({
      start:1,
      end:1,
      isDepend:false,
    })
    const doSetDetail = (_start,_end,_isDepend) => {
      setInfo.value.start = _start;
      setInfo.value.end = _end;
      setInfo.value.isDepend = _isDepend;
    }
    // 添加路径
    const addPath = () => {
      // 参数校验
      let tag = 0;
      for(let i=0;i<props.itemInfo.length;i++) {
        if(now_item.value == props.itemInfo[i].name) {
          tag = 1;
          break;
        }
      }
      if(tag == 0) {
        ElMessage({
          showClose: true,
          message: '零件' + now_item.value + '不存在',
          type: 'error',
        })
        now_item.value = '';
        return;
      }
      context.emit('addPath',setInfo.value,now_item.value);
      pathInfo.value.push({
        ...setInfo.value,
        item:now_item.value,
      })
      now_item.value = '';
      setInfo.value = {
        start:1,
        end:1,
        isDepend:false,
      }
      ElMessage({
        showClose: true,
        message: '添加路径成功',
        type: 'success',
      })
    }

    // 删除顶层路径
    const deletePath = () => {
      context.emit('deletePath');
      pathInfo.value.pop();
      ElMessage({
        showClose: true,
        message: '删除顶层路径成功',
        type: 'error',
      })
    }


    return {
      now_item,
      pathInfo,
      addPath,
      Plus,
      Setting,
      detailInfoRef,
      doSetDetail,
      Delete,
      deletePath,
      setInfo,

    }
  }
}
</script>

<style scoped>
.path-global {
  position: relative;
  width: 100%;
  background-color: white;
  color: #409eff;
  border-radius: 5px;
  padding: 20px 20px;
  overflow-x: scroll;
}

.node-class {
  border-radius: 100%;
}
</style>