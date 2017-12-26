<template>
  <div class="order-manage">
    <el-row class="search-boxs">
      <search-boxs 
        @handleChange="handleChange" 
        @query="searchByQuery">
      </search-boxs>
    </el-row> 
    <el-table
      v-loading.body="dataLoading"
      :data="orders"
      border
      tooltip-effect="dark">
      <el-table-column 
        label="订单号" 
        width="120" 
        fixed
        prop="orderNo">
      </el-table-column>
      <el-table-column 
        label="所报课程" 
        width="120" 
        prop="course.courseName">
      </el-table-column>
      <el-table-column 
        label="价格" 
        width="80" 
        prop="price">
      </el-table-column>
      <el-table-column 
        label="应交" 
        width="80" 
        prop="receivable">
      </el-table-column>
      <el-table-column 
        label="实交" 
        width="80" 
        prop="revenue">
      </el-table-column>
      <el-table-column 
        label="学员姓名" 
        width="100" 
        prop="student.studentName">
      </el-table-column>
      <el-table-column 
        label="欠费" 
        width="80">
        <template scope="scope">
          <el-tag :type="scope.row.revenue < scope.row.receivable > 0 ? 'danger' : 'primary'">
            {{ scope.row.revenue < scope.row.receivable ? scope.row.receivable - scope.row.revenue : '无'}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column 
        label="所属校区" 
        width="100" 
        prop="campus">
      </el-table-column>
      <el-table-column 
        label="经办校区" 
        width="100" 
        prop="handleCampus">
      </el-table-column>
      <el-table-column 
        label="经办人" 
        width="100" 
        prop="handlePeople">
      </el-table-column>
      <el-table-column 
        label="付款方式" 
        width="100" 
        prop="payment">
      </el-table-column>
      <el-table-column 
        label="报名时间" 
        width="160">
        <template scope="scope">{{ scope.row.date | formatDate }}</template>
      </el-table-column>
      <el-table-column 
        label="操作" 
        width="140">
        <template scope="scope">
          <el-button type="danger" size="small">删除</el-button>
          <el-button 
            :plain="true" 
            type="info" 
            size="small" 
            v-if="scope.row.revenue < scope.row.receivable"
            @click="afterPayment(scope.$index, scope.row)">
            补交
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="24" class="pagination" v-show="!dataLoading && orders.length > 0 && total > 10">
        <el-pagination 
          layout="total, prev, pager, next" 
          :total="total"
          :current-page.sync="currentPage"
          @current-change="handleCurrentChange">
        </el-pagination>
      </el-col>
    </el-row>
    <el-dialog
      title="补交金额"
      :visible.sync="dialogVisible"
      size="tiny">
      <el-input v-model="data.renewFee" placeholder="请输入补交金额"></el-input>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitPayment">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {getOrders} from 'api/order'
import {OK_CODE} from 'api/config'
import {addAfterPayment} from 'api/renew'
import {mapGetters} from 'vuex'
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
      pagenum: 1,
      data: {
        renewFee: 0
      },
      dialogVisible: false
    }
  },
  created () {
    this._getOrdersByQuery()
  },
  computed: {
    ...mapGetters([
      'campus'
    ])
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
    afterPayment (index, row) {
      this.renewFee = row.receivable - row.revenue
      this.data = {
        order: row._id,
        campus: this.campus,
        renewFee: this.renewFee,
        createAt: +new Date()
      }
      this.dialogVisible = true
    },
    submitPayment () {
      addAfterPayment(this.data).then(res => {
        if (res.code === OK_CODE) {
          this._getOrdersByQuery()
        }
        this.dialogVisible = false
      })
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
