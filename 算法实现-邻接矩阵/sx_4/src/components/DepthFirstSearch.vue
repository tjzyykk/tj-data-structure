<template>
  <div class="global-item">
    <div style="float: right;">
      <el-button :icon="Right" :disabled="isFinish != false" type="primary" @click="doDFSNotRecursion" >
        下一步
      </el-button>
    </div>
    <div>
      <div v-if="isFinish == false" >栈信息（栈底 => 栈顶）：</div>
      <div v-if="isFinish == false" style="display: flex; align-items: center;">
        <div v-for="(item,index) in stack" :key="index">
          <div class="node-class"><el-button type="warning">{{ item + 1 }}</el-button></div>
        </div>
        <div v-if="stack.length == 0" style="color: #f56c6c; margin: 10px 0;">栈为空，搜索已完成，点击下一步查看遍历结果</div>
      </div>
      <div v-if="isFinish == true">
        <div>深度优先搜索已结束，遍历的结果为：</div>
        <div style="display: flex; align-items: center;">
          <div v-for="(item,index) in dfsResult" :key="index">
            <div class="node-class"><el-button type="success">{{ item + 1 }} </el-button></div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isFinish == false">
      <div style="margin-bottom: 10px;">本次搜索栈的入、出情况：</div>
      <div>
        <div v-if="nowStackInfo.leave.length > 0 "  style="display: flex; align-items: center;">
          <div>出栈节点：</div>
          <div class="node-class"><el-button type="danger" >{{ nowStackInfo.leave[0] + 1 }} </el-button></div>
        </div>
        <div v-else>无节点出栈</div>
        <div v-if="nowStackInfo.enter.length == 0">无节点入栈</div>
        <div v-else style="display: flex; align-items: center;">
          <div>入栈节点：</div>
          <div v-for="(item,index) in nowStackInfo.enter" :key="index" style="display: flex; align-items: center;">
            <div class="node-class"><el-button type="danger" >{{ item + 1 }} </el-button></div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { ref } from 'vue'

import {
  Right,
} from '@element-plus/icons-vue'

export default {
  name: 'DepthFirstSearch',
  components: {
    
  },
  props:['graphInfo','count','rootNode'],
  setup(props) {

    const stack = ref([]);  // 模拟栈
    const vis = ref([]);
    for(let i=0;i<props.count;i++) vis.value.push(false);
    const dfsResult = ref([]);      // 深度优先搜索结果
    const nowStackInfo = ref({leave:[],enter:[]});   // 本次栈出入情况
    const isFinish = ref(false);    // 深度优先搜索是否结束
    const startDFS = (node) => {
      stack.value.push(node);
      vis.value[node] = true;
      dfsResult.value.push(node);
      nowStackInfo.value.leave = [];
      nowStackInfo.value.enter = [node];
    }
    startDFS(props.rootNode);

    // 非递归方式
    const doDFSNotRecursion = () => {
      if(stack.value.length != 0) {
        // 获取栈顶元素
        let node = stack.value[stack.value.length - 1];
        nowStackInfo.value.leave = [];
        nowStackInfo.value.enter = [];
        for(let i=0;i<props.count;i++) {
          if(props.graphInfo[node][i] == true && vis.value[i] != true) {
            stack.value.push(i);
            dfsResult.value.push(i);
            nowStackInfo.value.enter.push(i);
            vis.value[i] = true;
            return;
          }
        }
        // 叶子节点，出栈
        stack.value.pop();
        nowStackInfo.value.leave.push(node);

      }
      else isFinish.value = true;
    }


    return {
      stack,
      vis,
      dfsResult,
      nowStackInfo,
      isFinish,
      startDFS,
      doDFSNotRecursion,
      Right,

    }
  }
}
</script>

<style scoped>
.global-item {
  width: 100%;
  background-color: white;
  color: #409eff;
  border-radius: 5px;
  padding: 20px 20px;
}

.node-class {
  border-radius: 100%;
  margin: 10px 0; 
  margin-right: 20px;
}
</style>