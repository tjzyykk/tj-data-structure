<template>
  <div class="path-global">
    <div style="width: 610px; position: fixed;">
      <div style="display: flex; align-items: center;">
        <div>当前产品：{{ selectProduct }}</div>
        <div style="flex: 1;"></div>
        <div>
          <el-input size="small" style="width: 130px;"  v-model="now_item" placeholder="请输入要维修的零件" clearable />
        </div>
        <div style="margin-left: 15px;">
          <el-button v-if="showType == true" :disabled="pathInfo.length == 0 || now_item == ''" :icon="Search" size="small" type="primary" @click="getItemIndex" >
            查询拆解路径
          </el-button>
          <el-button v-else :disabled="pathInfo.length == 0 || now_item == ''" :icon="Search" size="small" type="primary" @click="getItemIndex" >
            查询安装路径
          </el-button>
          <el-icon style="margin-left: 5px;" class="a-link" @click="showType = !showType"><Refresh /></el-icon>
        </div>
        <div style="margin-left: 15px;">
          <el-button :disabled="pathInfo.length == 0 || now_item == '' || now_num == 0 || itemIndex.length == 0" :icon="Back" size="small" type="primary" @click="now_num--;getRepairPath()" >
            上一个
          </el-button>
        </div>
        <div style="margin-left: 15px;">
          <el-button :disabled="pathInfo.length == 0 || now_item == '' || now_num == itemIndex.length - 1 || itemIndex.length == 0" size="small" type="primary" @click="now_num++;getRepairPath()" >
            下一个&nbsp;<el-icon><Right /></el-icon>
          </el-button>
        </div>
      </div>
    </div>
    <div style="margin-top: 50px; margin-bottom: 10px;">
      <div v-if="pathInfo.length == 0 || itemIndex.length == 0"><el-empty :image-size="80" description="未查到当前零件的维修拆解路径" style="padding: 0 0; margin: 0 0; margin-top: 10vh;" /></div>
      <div v-if="showType == false">
        <div style="display: flex; align-items: center;">
            <div v-for="(path,index) in repairPath" :key="index" >
            <div v-if="path.isDepend == false" style="margin-right: 20px; display: flex; flex-direction: column; align-items: center;">
                <div><el-button type="success" >{{ path.item }} </el-button></div>
                <div class="a-link" style="margin-top: 5px;">{{ repairPathIndex[index]+1 }}</div>
            </div>
            <div v-else class="node-class" style="margin-right: 20px; display: flex; flex-direction: column; align-items: center;">
                <div><el-button type="danger" >{{ path.item }}（{{ path.start }}-{{ path.end }}） </el-button></div>
                <div class="a-link" style="margin-top: 5px;">{{ repairPathIndex[index]+1 }}</div>
            </div>
            </div>
        </div>
      </div>
      <div v-if="showType == true">
        <div style="display: flex; align-items: center;">
            <div v-for="(path,index) in repairPathReverse" :key="index" >
            <div v-if="path.isDepend == false" style="margin-right: 20px; display: flex; flex-direction: column; align-items: center;">
                <div><el-button type="success" >{{ path.item }} </el-button></div>
                <div class="a-link" style="margin-top: 5px;">{{ repairPathIndexReverse[index]+1 }}</div>
            </div>
            <div v-else class="node-class" style="margin-right: 20px; display: flex; flex-direction: column; align-items: center;">
                <div><el-button type="danger" >{{ path.item }}（{{ path.start }}-{{ path.end }}） </el-button></div>
                <div class="a-link" style="margin-top: 5px;">{{ repairPathIndexReverse[index]+1 }}</div>
            </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

import {
  Search,
  Back,
  Right,
} from '@element-plus/icons-vue'

export default {
  name: 'RepairWork',
  components: {
    
  },
  props:['itemInfo','productInfo','selectProduct'],
  setup(props) {

    // 展示拆解还是装配
    const showType = ref(true);

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
    // 指令零件的所有索引
    const itemIndex = ref([]);
    const now_num = ref(0);
    const getItemIndex = () => {
      // 清空
      itemIndex.value.length = 0;
      for(let i=0;i<pathInfo.value.length;i++) {
        if(pathInfo.value[i].item == now_item.value) {
          itemIndex.value.push(i);
        }
      }
      now_num.value = 0;
      if(itemIndex.value.length == 0) {
        doAllEmpty();
        return;
      }
      getRepairPath();
    }

    // 根据索引查询拆解与装配路径
    const repairPath = ref([]);
    const repairPathIndex = ref([]);
    const repairPathReverse = ref([]);
    const repairPathIndexReverse = ref([]);
    const getRepairPath = () => {
      let index = itemIndex.value[now_num.value];
      // 清空
      doAllEmpty();
      repairPathIndex.value.push(index);
      // 进行宽搜，根据依赖查找
      let queue = [];
      let vis = [];
      // 初始化
      for(let i=index+1;i<pathInfo.value.length;i++) {
        vis.push(false);
        if(pathInfo.value[i].isDepend == true 
          && (pathInfo.value[i].start <= index+1 && pathInfo.value[i].end >= index+1)) {
            queue.push(i);
            repairPathIndex.value.push(i);
            vis[i-index-1] = true;
          }
      }
      // 宽搜
      while(queue.length != 0) {
        let tmpIndex = queue[0];
        queue.shift();
        for(let i=index+1;i<pathInfo.value.length;i++) {
            if(vis[i-index-1] == false
            && (pathInfo.value[i].start <= tmpIndex+1 && pathInfo.value[i].end >= tmpIndex+1)) {
                queue.push(i);
                repairPathIndex.value.push(i);
                vis[i-index-1] = true;
            }
        }
      }
      // 根据索引排序
      repairPathIndex.value.sort(function(a,b){
        return a - b;
      })
      for(let k=0;k<repairPathIndex.value.length;k++) repairPath.value.push(pathInfo.value[repairPathIndex.value[k]]);
      // 定义拆解路径
      for(let r=repairPath.value.length-1;r>=0;r--) repairPathReverse.value.push(repairPath.value[r]);
      for(let r=repairPathIndex.value.length-1;r>=0;r--) repairPathIndexReverse.value.push(repairPathIndex.value[r]);
    }
    // 全部清空
    const doAllEmpty = () => {
      repairPath.value.length = 0;
      repairPathIndex.value.length = 0;
      repairPathReverse.value.length = 0;
      repairPathIndexReverse.value.length = 0;
    }
    

    return {
      now_item,
      pathInfo,
      itemIndex,
      getItemIndex,
      repairPath,
      getRepairPath,
      Search,
      now_num,
      Back,
      Right,
      repairPathIndex,
      showType,
      repairPathReverse,
      repairPathIndexReverse,

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