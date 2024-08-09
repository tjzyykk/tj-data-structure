<template>
  <div class="svg-class">
    <div style="position:absolute; right: 0; top: 0; cursor: pointer;">
      <el-popover
        title="说明"
        width="270"
        trigger="hover"
        :content="msg"
      >
        <template #reference>
          <el-icon size="20" ><Warning /></el-icon>
        </template>
      </el-popover>
    </div>
    <svg id="svg" width="330" height="180">
    </svg>
  </div>
</template>

<script>
import { onMounted,ref } from 'vue';
import * as d3 from 'd3';

import {
  Warning,
} from '@element-plus/icons-vue'

export default {
  name: 'D3Show',
  components: {
    
  },
  props:['graphInfo','count'],
  setup(props) {

    // 说明
    const msg = ref('图中颜色分别对应节点：绿色-1，粉色-2，蓝色-3，灰色-4，黄色-5，紫色-6');

    function circleColor (d) {
      return colorArr[d.index];
    }
    function linkColor () {
      return 'black';
    }

    const colorArr = ['#67c23a','#f89898','#409eff','#909399','#e6a23c','#626aef'];
    const nameArr = ['Lillian','Gordon','Sylvester','Mary','Helen','Jamie'];


    onMounted(() => {
      let svg = d3.select('#svg')
      let width = +svg.attr('width')
      let height = +svg.attr('height')
  
      // 添加数据
      let nodesData = []
      for(let i=0;i<props.count;i++) {
        nodesData.push({name:nameArr[i],index:i});
      }
  
      // 添加连线，指定链接数据
      let linksData = []
      for(let i=0;i<props.count;i++) {
        for(let j=0;j<props.count;j++) {
          if(props.graphInfo[i][j] == true) {
            linksData.push({source:nameArr[i],target:nameArr[j]});
          }
        }
      }
   
      // 使用节点数据设置模拟器
      let simulation = d3.forceSimulation()
        .nodes(nodesData)
   
      // 添加定心力和充电力
      simulation
        .force('charge_force', d3.forceManyBody().strength(-15))
        .force('center_force', d3.forceCenter(width / 2, height / 2))
   
      // 在svg元素中绘制圆圈
      let node = svg.append('g')
        .attr('class', 'nodes')
        .selectAll('circle')
        .data(nodesData)
        .enter()
        .append('circle')
        .attr('r', 10)
        .attr('fill', circleColor)
   
      simulation.on('tick', tickAction)
   
      function tickAction () {
        node
          .attr('cx', (d) => { return d.x })
          .attr('cy', (d) => { return d.y })
   
        link
          .attr('x1', (d) => { return d.source.x })
          .attr('y1', (d) => { return d.source.y })
          .attr('x2', (d) => { return d.target.x })
          .attr('y2', (d) => { return d.target.y })
      }
   
      // 创建链接力
      let linkForce = d3.forceLink(linksData)
        .id((d) => { return d.name })
        .strength(0.002)
   
      // 把链接力添加到模拟器中
      simulation.force('links', linkForce)
   
      // 在页面绘制链接
      let link = svg.append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data(linksData)
        .enter()
        .append('line')
        .attr('stroke-width', 1)
        .style('stroke', linkColor)
    });

    return {
      circleColor,
      linkColor,
      colorArr,
      Warning,
      msg,
    }
    
  }
}
</script>

<style scoped>
svg {
  border: 1px solid #ccc;
}

.svg-class {
  position: relative;
}

</style>

<style>
.links line {
  stroke: #999;
  stroke-opacity: 0.6;
}
.nodes circle {
  stroke: #fff;
  stroke-width: 1.5px;
}
</style>