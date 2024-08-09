<template>
    <div class="global-item">
      <div style="float: right;">
        <el-button :icon="Right" :disabled="isFinish != false" type="primary" @click="doDFSRecursion(rootNode)" >
          开始递归
        </el-button>
      </div>
      <div v-if="isFinish == true">
          <div>深度优先搜索已结束，遍历的结果为：</div>
          <div style="display: flex; align-items: center;">
            <div v-for="(item,index) in dfsResult" :key="index">
              <div class="node-class"><el-button type="success">{{ item + 1 }} </el-button></div>
            </div>
          </div>
      </div>
      <div v-else>
        <el-empty :image-size="80" description="请点击开始递归按钮" style="padding: 0 0; margin: 0 0; margin-top: 5vh;" />
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'
  
  import {
    Right,
  } from '@element-plus/icons-vue'
  
  export default {
    name: 'DepthFirstSearchRecursion',
    components: {
      
    },
    props:['graphInfo','count','rootNode'],
    setup(props) {
  
      const vis = ref([]);
      for(let i=0;i<props.count;i++) vis.value.push(false);
      const dfsResult = ref([]);      // 深度优先搜索结果
      const isFinish = ref(false);    // 深度优先搜索是否结束
  
      // 递归方式
      const doDFSRecursion = (node) => {
        vis.value[node] = true;
        dfsResult.value.push(node);
        for(let i=0;i<props.count;i++) {
            if(props.graphInfo[node][i] == true && vis.value[i] != true) {
                doDFSRecursion(i);
            }
        }
        if(node == props.rootNode) isFinish.value = true;
      }
  
  
      return {
        vis,
        dfsResult,
        isFinish,
        doDFSRecursion,
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