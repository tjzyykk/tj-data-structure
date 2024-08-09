<template>
  <div class="link_block_info">
    <div style="font-size: large;">邻接链表：</div>
    <div v-for="(item,indexTable) in linkTable" :key="indexTable">
      <div style="display: flex; align-items: center; margin: 15px 0">
        <div>{{ item.node + 1 }}号节点：</div>
        <div v-for="(nodeItem,indexLink) in item.link" :key="indexLink" style="display: flex; align-items: center;">
          <div class="node-class"><el-button type="success" plain>{{ nodeItem + 1 }}</el-button></div>
          <div v-if="indexLink != item.link.length - 1" style="margin: 0 10px;">=></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'LinkInfo',
  components: {
    
  },
  props:['graphInfo','count'],
  setup(props) {

    // 邻接链表
    const linkTable = ref([]); 
    for(let i=0;i<props.count;i++) {
      linkTable.value.push({'node':i,'link':[]});
      for(let j=0;j<props.count;j++) {
        if(props.graphInfo[i][j] == true) {
          linkTable.value[i].link.push(j);
        }
      }
    }


    return {
      linkTable,
    }
  }
}
</script>

<style scoped>
.link_block_info {
  width: 100%;
  background-color: white;
  color: #409eff;
  border-radius: 5px;
  padding: 20px 20px;
}

.node-class {
  border-radius: 100%;
  margin: 10px 0; 
}
</style>