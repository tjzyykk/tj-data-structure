<template>
  <div class="global">
    <div style="width: 400px; float: left;">
      <div class="body">
        <div style="display: flex; flex-direction:column; ">
          <div class="graph-info">
            <div style="display: flex; align-items: center;">
              <el-button :disabled="isD3Show == true || count == 0" :icon="RefreshRight" size="small" type="primary" @click="isD3Show = true" style="float: right;">
                生成图
              </el-button>
              <div style="flex: 1;"></div>
              <div style="text-align: center;">邻接矩阵</div>
              <div style="flex: 1;"></div>
              <el-button :icon="Plus" size="small" type="primary" @click="createNodesRef.DialogVisilble = true; isD3Show = false" style="float: right;">
                新建
              </el-button>
            </div>
            <div v-if="count == 0" style="padding: 0 0; margin: 0 0;">
              <div><el-empty :image-size="80" description="当前没有节点" style="padding: 0 0; margin: 0 0; margin-top: 5vh;" /></div>
            </div>
            <div v-else>
              <div style="display: flex; align-items: center;" >
                <div style="flex: 1;"></div>
                <div style="width: 38px;"></div>
                <div v-for="col in graphInfo.length" :key="col" style="margin-right: 26px;">
                  {{ col }}
                </div>
                <div style="flex: 1;"></div>
              </div>
              <div v-for="(row,rowIndex) in graphInfo" :key="rowIndex" style="display: flex; align-items: center; margin: 7px 0;">
                <div style="flex: 1;"></div>
                <div style="margin-right: 10px;">{{ rowIndex + 1 }}</div>
                <div v-for="(item,itemIndex) in row" :key="itemIndex" style="margin-right: 10px;">
                  <div v-if="item == true">
                    <el-button size="small" type="success" @click="changeState(rowIndex,itemIndex,false)" :icon="Plus" circle />
                  </div>
                  <div v-else>
                    <el-button size="small" type="danger" @click="changeState(rowIndex,itemIndex,true)" :icon="Minus" circle />
                  </div>
                </div>
                <div style="flex: 1;"></div>
              </div>
            </div>
          </div>
          <div class="graph-show">
            <D3Show v-if="isD3Show == true"
              :count="count" :graphInfo="graphInfo" ></D3Show>
            <div v-else><el-empty :image-size="80" description="点击生成图查看" style="padding: 0 0; margin: 0 0; margin-top: 5vh;" /></div>
          </div>
        </div>
      </div>
    </div>
    <div style="width: 650px; float: right;">
      <div class="title">邻接矩阵</div>
      <div style="height: 400px; display: flex; flex-direction: column; align-items: center; ">
        <div style="flex: 1;"></div>
        <InfoMsg style="box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);" v-if="chooseType == 0"></InfoMsg>
        <BreadthFirstSearch style="box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);" 
          ref="breadthFirstSearchRef" v-if="chooseType == 1"
          :count="count" :graphInfo="graphInfo" :rootNode="rootNode" >
        </BreadthFirstSearch>
        <DepthFirstSearch style="box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);"  ref="depthFirstSearchRef" v-if="chooseType == 2"
          :count="count" :graphInfo="graphInfo" :rootNode="rootNode">
        </DepthFirstSearch>
        <DepthFirstSearchRecursion style="box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);"  ref="depthFirstSearchRecursionRef" v-if="chooseType == 3"
          :count="count" :graphInfo="graphInfo" :rootNode="rootNode">
        </DepthFirstSearchRecursion>
        <LinkInfo style="box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);"  ref="linkInfoRef" v-if="chooseType == 4"
          :count="count" :graphInfo="graphInfo">
        </LinkInfo>
        <div style="flex: 1;"></div>
      </div>
    </div>

  </div>

  <!-- 操作按钮 -->
  <div class="footer-class">
    <div style="display: flex; align-items: center;">
      <el-button :disabled="chooseType == 4 || count == 0" type="info" plain @click="chooseType = 4" >
        邻接链表
      </el-button>
      <el-button :disabled="chooseType == 3 || count == 0" type="info" plain @click="chooseType = 3" >
        深搜(递归)
      </el-button>
      <el-button :disabled="chooseType == 2 || count == 0" type="info" plain @click="chooseType = 2" >
        深搜(非递归)
      </el-button>
      <el-button :disabled="chooseType == 1 || count == 0" type="info" plain @click="chooseType = 1" >
        广度优先搜索
      </el-button>
      <el-button :disabled="chooseType != 0 || count == 0" type="info" plain @click="chooseRootNodeRef.DialogVisilble = true" >
        选择根节点
      </el-button>
      <el-button :disabled="chooseType == 0" :icon="Discount" type="info" plain @click="chooseType = 0" >
        首页
      </el-button>
    </div>
  </div>

  <CreateNode ref="createNodesRef" @doCreateNodes="doCreateNodes"></CreateNode>
  <ChooseRootNode ref="chooseRootNodeRef" @doChooseRootNode="doChooseRootNode" :count="count" ></ChooseRootNode>

</template>

<script>
import { ref } from 'vue'
import CreateNode from './Utils/CreateNode'
import BreadthFirstSearch from './BreadthFirstSearch'
import DepthFirstSearch from './DepthFirstSearch'
import ChooseRootNode from './Utils/ChooseRootNode'
import DepthFirstSearchRecursion from './DepthFirstSearchRecursion'
import LinkInfo from './LinkInfo'
import D3Show from './D3Show'
import InfoMsg from './Utils/InfoMsg'

import {
  Plus,
  Minus,
  Discount,
  RefreshRight,
} from '@element-plus/icons-vue'

export default {
  name: 'FrameBlock',
  components: {
    CreateNode,
    BreadthFirstSearch,
    ChooseRootNode,
    DepthFirstSearch,
    DepthFirstSearchRecursion,
    LinkInfo,
    D3Show,
    InfoMsg,
    
  },
  setup() {

    // 展示选择
    const chooseType = ref(0);

    // 邻接矩阵
    const count = ref(0);
    const graphInfo = ref([]);

    // 画图
    const isD3Show = ref(false);

    // 建立图
    const createNodesRef = ref();
    const doCreateNodes = (num) => {
      count.value = num;
      // 清空
      graphInfo.value.length = 0;
      for(let i=0;i<num;i++) {
        graphInfo.value.push([]);
        for(let j=0;j<num;j++) graphInfo.value[i].push(false);
      }
      chooseType.value = 0;
    }
    const changeState = (rowIndex,itemIndex,state) => {
      if(rowIndex == itemIndex) return;
      if(chooseType.value == 0) {
        graphInfo.value[rowIndex][itemIndex] = state;
        graphInfo.value[itemIndex][rowIndex] = state;
        isD3Show.value = false;
      }
    }

    // 选择根节点
    const rootNode = ref(0);
    const chooseRootNodeRef = ref();
    const doChooseRootNode = (node) => {
      rootNode.value = node;
    }

    // 邻接链表
    const linkInfoRef = ref();

    // 广度优先搜索
    const breadthFirstSearchRef = ref();

    // 深度优先搜索
    const depthFirstSearchRef = ref();
    const depthFirstSearchRecursionRef = ref();


    return {
      count,
      graphInfo,
      createNodesRef,
      doCreateNodes,
      Plus,
      Minus,
      breadthFirstSearchRef,
      chooseType,
      chooseRootNodeRef,
      doChooseRootNode,
      rootNode,
      RefreshRight,
      Discount,
      changeState,
      depthFirstSearchRef,
      depthFirstSearchRecursionRef,
      isD3Show,
      linkInfoRef,

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

.title {
  font-size: 20px;
  text-align: center;
  margin-top: 10px;

}

.body {
  width: 100%;
}

.graph-info {
  max-height: 500px;
  width: 350px;
  background-color: white;
  margin-top: 20px;
  padding: 10px 10px;
  color: #409eff;
  border-radius: 5px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.graph-show {
  height: 200px;
  width: 350px;
  background-color: white;
  margin-top: 20px;
  padding: 10px 10px;
  color: #409eff;
  border-radius: 5px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.footer-class {
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 20px 20px;
}

</style>
