<template>
  <div>
    <el-select 
      v-model="campusVal" 
      clearable 
      placeholder="请选择校区" 
      class="campus" 
      @change="handleChange"
    >
      <el-option 
        v-for="item in options" 
        :key="item.value" 
        :label="item.label" 
        :value="item.value"
      ></el-option>
    </el-select>
    <el-input
      placeholder="输入姓名查询"
      icon="search"
      v-model="query"
      class="search"
    ></el-input>
  </div>
</template>

<script>
import {debounce} from 'common/js/utils'

export default {
  data () {
    return {
      options: [
        {
          value: '浦东校区',
          label: '浦东校区'
        },
        {
          value: '九亭校区',
          label: '九亭校区'
        },
        {
          value: '泗泾校区',
          label: '泗泾校区'
        },
        {
          value: '七宝校区',
          label: '七宝校区'
        },
        {
          value: '华泾校区',
          label: '华泾校区'
        }
      ],
      campusVal: '',
      query: ''
    }
  },
  created () {
    this.$watch('query', debounce((newQuery) => {
      this.$emit('query', newQuery)
    }, 200))
  },
  methods: {
    handleChange () {
      this.$emit('handleChange', this.campusVal)
    }
  }
}
</script>

<style lang="scss" scoped>
.campus {
  margin-left: 8px;
  width: 120px;
  margin-right: 8px;
}
.search {
  width: 220px;
}
</style>
