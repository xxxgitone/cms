<template>
  <el-card class="info-card">
    <el-row>
      <el-col :span="6" class="info-icon" :style="{background: leftColor}">
        <i :class="iconClass"></i>
      </el-col>
      <el-col :span="18" class="info-count">
        <span class="info-number" :style="{color: numberColor}">{{ number }}</span>
        <span class="info-des">{{ description }}</span>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  props: {
    leftColor: String,
    iconClass: String,
    number: Number,
    description: String,
    numberColor: String
  }
}
</script>

<style>
.info-card {
  width: 180px;
  height: 75px;
  margin-right: 16px;
  border: none;
}
.info-card .el-row {
  height: 100%;
}
.el-card__body {
  padding: 0;
}
.info-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75px;
  color: #ffffff;
}
.info-count {
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.info-number {
  font-size: 28px;
  font-weight: bold;
}
.info-des {
  font-size: 12px;
  padding: 4px 0;
  color: #666666;
}
</style>
