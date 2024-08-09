<template>
  <div class="global-item">
    <div style="float: right;">
      <el-button :icon="Right" :disabled="isFinish != false" type="primary" @click="doBFS" >
        下一步
      </el-button>
    </div>
    <div>
      <div v-if="isFinish == false" >队列信息（队首 => 队尾）：</div>
      <div v-if="isFinish == false" style="display: flex; align-items: center;">
        <div v-for="(item,index) in queue" :key="index">
          <div class="node-class"><el-button type="warning">{{ item + 1 }}</el-button></div>
        </div>
        <div v-if="queue.length == 0" style="color: #f56c6c; margin: 10px 0;">队列为空，搜索已完成，点击下一步查看遍历结果</div>
      </div>
      <div v-if="isFinish == true">
        <div>广度优先搜索已结束，遍历的结果为：</div>
        <div style="display: flex; align-items: center;">
          <div v-for="(item,index) in bfsResult" :key="index">
            <div class="node-class"><el-button type="success">{{ item + 1 }} </el-button></div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isFinish == false">
      <div style="margin-bottom: 10px;">本次搜索队列的入、出情况：</div>
      <div>
        <div v-if="nowQueueInfo.leave.length > 0 "  style="display: flex; align-items: center;">
          <div>出队节点：</div>
          <div class="node-class"><el-button type="danger" >{{ nowQueueInfo.leave[0] + 1 }} </el-button></div>
        </div>
        <div v-else>无节点出队</div>
        <div v-if="nowQueueInfo.enter.length == 0">无节点入队</div>
        <div v-else style="display: flex; align-items: center;">
          <div>入队节点：</div>
          <div v-for="(item,index) in nowQueueInfo.enter" :key="index" style="display: flex; align-items: center;">
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
  name: 'BreadthFirstSearch',
  components: {
    
  },
  props:['graphInfo','count','rootNode'],
  setup(props) {

    // 广度优先搜索
    const queue = ref([]);  // 模拟队列
    const vis = ref([]);
    for(let i=0;i<props.count;i++) vis.value.push(false);
    const bfsResult = ref([]);      // 广度优先搜索结果
    const nowQueueInfo = ref({leave:[],enter:[]});   // 本次队列出入情况
    const isFinish = ref(false);    // 广度优先搜索是否结束

    const startBFS = (node) => {
      queue.value.push(node);
      vis.value[node] = true;
      bfsResult.value.push(node);
      nowQueueInfo.value.leave = [];
      nowQueueInfo.value.enter = [node];
    }
    startBFS(props.rootNode);
    const doBFS = () => {
      if(queue.value.length != 0) {
        let node = queue.value[0];
        queue.value.shift();
        nowQueueInfo.value.leave = [node];
        nowQueueInfo.value.enter = [];
        for(let i=0;i<props.count;i++) {
          if(props.graphInfo[node][i] == true && vis.value[i] != true) {
            queue.value.push(i);
            bfsResult.value.push(i);
            nowQueueInfo.value.enter.push(i);
            vis.value[i] = true;
          }
        }
      }
      else isFinish.value = true;
    }

    return {
      queue,
      vis,
      bfsResult,
      isFinish,
      nowQueueInfo,
      startBFS,
      doBFS,
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
