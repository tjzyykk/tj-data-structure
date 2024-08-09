<template>
  <div class="text-info">
    <div style="font-size: 16px; text-align: center;">说明</div>
    <div class="item-info">1. 点击新建按钮建立邻接矩阵，选择节点数（2-6）</div>
    <div class="item-info">2. 点击对应位置的按钮可以设置邻接矩阵（红色/绿色代表该位置无双向边/有双向边，不可自环）</div>
    <div class="item-info">3. 点击选择根节点按钮选择遍历搜索开始的根节点</div>
    <div class="item-info">4. 点击生成图按钮生成当前邻接矩阵对应的图</div>
    <div class="item-info">5. 点击首页按钮回到说明页</div>
    <div class="item-info">6. 点击邻接链表按钮展示当前邻接矩阵对应的邻接链表</div>
    <div class="item-info">7. 点击深搜(递归)按钮进行深度优先搜索（展示结果）</div>
    <div class="item-info">8. 点击深搜(非递归)按钮进行深度优先搜索（展示过程）</div>
    <div class="item-info" style="margin-bottom: 0;">9. 点击广度优先搜索按钮进行广度优先搜索（展示过程）</div>
  </div>
</template>

<script>

export default {
  name: 'InfoMsg',
  components: {
  }
}
</script>

<style scoped>
.text-info {
  width: 100%;
  background-color: white;
  color: #909399;
  border-radius: 5px;
  padding: 20px 20px;
}

.item-info {
  margin: 15px 0;
}

</style>