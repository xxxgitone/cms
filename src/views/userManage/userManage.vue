<template>
  <div class="user-manage">
    <div class="panel-header">
      <el-select v-model="campusVal" clearable placeholder="请选择校区" class="campus">
        <el-option 
          v-for="item in options" 
          :key="item.value" 
          :label="item.label" 
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input
        placeholder="请输入关键字"
        icon="search"
        v-model="query"
        class="search"
      ></el-input>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      options: [
        {
          value: '校区一',
          label: '浦东校区'
        },
        {
          value: '校区二',
          label: '九亭校区'
        },
        {
          value: '校区三',
          label: '泗泾校区'
        },
        {
          value: '校区四',
          label: '七宝校区'
        },
        {
          value: '校区五',
          label: '华泾校区'
        }
      ],
      campusVal: '',
      query: ''
    }
  }
}
</script>

<style lang="scss" socped>
.user-manage {
  .panel-header {
    display: flex;
    margin-bottom: 24px;
    .campus {
      width: 120px;
      margin-right: 8px;
    }
    .search {
      width: 220px;
    }
  }
}
</style>
