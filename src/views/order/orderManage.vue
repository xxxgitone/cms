<template>
  <div class="order-manage">
    <el-row class="search-boxs">
      <!-- @click="deleteSelection" -->
      <el-button type="danger" icon="delete">批量删除</el-button>
      <search-boxs 
        @handleChange="handleChange" 
        @query="searchByQuery"
      ></search-boxs>
    </el-row> 
    <!-- @selection-change="handleSelectionChange" -->
    <el-table
      v-loading.body="dataLoading"
      :data="orders"
      border
      tooltip-effect="dark"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column 
        label="订单号" 
        width="120" 
        fixed
        prop="orderNo"
      ></el-table-column>
      <el-table-column 
        label="所报课程" 
        width="120" 
        prop="course.courseName"
      >
      </el-table-column>
      <el-table-column 
        label="价格" 
        width="80" 
        prop="price"
      ></el-table-column>
      <el-table-column 
        label="应交" 
        width="80" 
        prop="receivable"
      ></el-table-column>
      <el-table-column 
        label="实交" 
        width="80" 
        prop="revenue"
      ></el-table-column>
      <el-table-column 
        label="学员姓名" 
        width="100" 
        prop="student.studentName"
      >
      </el-table-column>
      <el-table-column 
        label="所属校区" 
        width="100" 
        prop="campus"
      ></el-table-column>
      <el-table-column 
        label="经办校区" 
        width="100" 
        prop="handleCampus"
      ></el-table-column>
      <el-table-column 
        label="经办人" 
        width="100" 
        prop="handlePeople"
      ></el-table-column>
      <el-table-column 
        label="付款方式" 
        width="100" 
        prop="payment"
      ></el-table-column>
      <el-table-column 
        label="报名时间" 
        width="160"
      >
        <template scope="scope">{{ scope.row.date | formatDate }}</template>
      </el-table-column>
      <el-table-column 
        label="操作" 
        width="140" 
      >
        <template scope="scope">
           <!-- @click="handleEdit(scope.$index, scope.row)" -->
           <!-- @click="handleDelete(scope.$index, scope.row)" -->
          <el-button :plain="true" type="info" size="small">编辑</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="24" class="pagination" v-show="!dataLoading && orders.length > 0 && total > 10">
        <el-pagination 
          layout="total, prev, pager, next" 
          :total="total"
          :current-page.sync="currentPage"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {getOrders} from 'api/order'
import {OK_CODE} from 'api/config'
import SearchBoxs from 'components/search-boxs/search-boxs'

export default {
  data () {
    return {
      orders: [],
      total: 0,
      dataLoading: true,
      campusVal: '',
      currentPage: 1,
      query: '',
      pagenum: 1
    }
  },
  created () {
    this._getOrdersByQuery()
  },
  methods: {
    handleChange (val) {
      this.campusVal = val
      this._getOrdersByQuery()
      this.currentPage = 1
      if (!val) {
        this._getOrdersByQuery()
        this.currentPage = 1
      }
    },
    searchByQuery (newQyery) {
      this.query = newQyery
      this._getOrdersByQuery()
      this.currentPage = 1
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.$router.push(`/admin/order?pagenum=${this.pagenum}`)
    },
    _getOrders (data) {
      this.dataLoading = true
      getOrders(data).then((res) => {
        this.dataLoading = false
        if (res.code === OK_CODE) {
          this.total = res.total
          this.orders = res.orders
          console.log(this.orders)
        }
      })
    },
    _getOrdersByQuery () {
      const {pagenum} = this.$route.query
      const campusVal = this.campusVal ? this.campusVal : ''
      const studentName = this.query ? this.query : ''
      const data = {
        pagenum,
        campus: campusVal,
        studentName
      }
      this.currentPage = Number(pagenum) || 1
      this._getOrders(data)
    }
  },
  watch: {
    $route () {
      this._getOrdersByQuery()
    }
  },
  components: {
    SearchBoxs
  }
}
</script>

<style lang="scss" scoped>
.order-manage {
  .search-boxs {
    display: flex;
  }
  .el-table {
    margin-top: 24px;
  }
  .pagination {
    margin: 16px 0 8px 0;
    text-align: right;
  }
}
</style>
