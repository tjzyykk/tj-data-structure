<template>
  <div class="text-info">
    <div style="font-size: 16px; text-align: center;">说明</div>
    <div class="item-info">1. 点击生成零件按钮生成零件</div>
    <div class="item-info">2. 点击添加产品按钮可以新增产品</div>
    <div class="item-info">3. 点击选择产品按钮选择目标操作产品</div>
    <div class="item-info">4. 点击定义产品装配路径按钮，选择零件进行产品装配</div>
    <div class="item-info">5. 点击首页按钮回到说明页</div>
    <div class="item-info">6. 依赖关系说明：存在依赖关系的零件表示为红色，格式为：零件名（依赖起始序号-依赖结束序号），
      表示若想拆掉起始序号到结束序号之间的任一零件，均须先拆掉本零件，以此对产品加工进行模拟仿真；可通过点击依赖设置按钮设置零件间的依赖关系
    </div>
    <div class="item-info">7. 点击拆解安装按钮，选择目标零件，获取对应拆解/安装的路径</div>
    <div class="item-info" style="margin-bottom: 0;">8. 拆解安装模式显示产品中所有目标零件的路径，点击上/下一个按钮切换</div>
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