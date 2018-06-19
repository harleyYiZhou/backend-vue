<template>
  <div id="orders">
    <h4>{{$t('ORDER_TITLE')}}</h4>
    <div class="orders mt-4 mb-2 py-2 ">
      <div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column sortable fixed prop="refId" :label="$t('ORDER_NUMBER')">
          </el-table-column>
          <el-table-column prop="type" :label="$t('ORDER_TYPE')">
          </el-table-column>
          <el-table-column sortable prop="createdAt" :label="$t('ORDER_CREATETIME')" :formatter="setTime">
          </el-table-column>
          <el-table-column prop="status" :label="$t('ORDER_STATUS')" :formatter="setStatus">
          </el-table-column>
          <el-table-column prop="paymentStatus" :label="$t('ORDER_PAYMENT_STATUS')" :formatter="setPayStatus">
          </el-table-column>
          <el-table-column prop="shippingStatus" :label="$t('ORDER_SHIPPING_STATUS')" :formatter="setShippingStatus">
          </el-table-column>
          <el-table-column sortable prop="totalCost" :label="$t('ORDER_TOTAL_COST')" :formatter="setMoney">
          </el-table-column>
          <el-table-column fixed="right" :label="$t('ORDER_OPERATE')">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">{{$t('ORDER_CHECK')}}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block text-right px-4 my-4">
          <el-pagination  @current-change="handleCurrentChange" :current-page="currentPage"  :page-size="5" layout="total,  prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="orders mt-4 mb-2">
      <div></div>
    </div>
  </div>
</template>

<script>
import { doGet } from "@/api/api.js";
import { formatTime, setTimeout } from "@/utils/formatTime.js";
export default {
  data() {
    return {
      tableData: [],
       currentPage: 1,
       total: 100
    };
  },
  methods: {
    setTime: function(row, column) {
      var time = formatTime(new Date(row.createdAt), "{y}-{m}-{d} {h}:{i}");
      return time;
    },
    setMoney: function(row, column) {
      var cost = row.totalCost / 100;
      var money = `￥${cost}`;
      return money;
    },
    setStatus: function(row, column) {
      if (localStorage.getItem("language") === "zh") {
        if (row.status === "open") {
          return "进行中";
        } else {
          return "已取消";
        }
      } else {
        if (row.status === "open") {
          return "open";
        } else {
          return "close";
        }
      }
    },
    setPayStatus: function(row, column) {
      if (localStorage.getItem("language") === "zh") {
        if (row.paymentStatus === "paid") {
          return "已支付";
        } else {
          return "未支付";
        }
      } else {
        if (row.paymentStatus === "paid") {
          return "paid";
        } else {
          return "unpaid";
        }
      }
    },
    setShippingStatus: function(row, column) {
      if (localStorage.getItem("language") === "zh") {
        if (row.shippingStatus === "shipped") {
          return "已配送";
        } else {
          return "未配送";
        }
      } else {
        if (row.shippingStatus === "shipped") {
          return "shipped";
        } else {
          return "unshipped";
        }
      }
    },
    getOrderList: function() {
      var that = this;
      let storeId = localStorage.getItem("storeId");
      let param = {
        pageSize: 5,
        p: that.currentPage-1
      };
      doGet(`/stores/${storeId}/orders`, param)
        .then(res => {
          that.tableData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getTotal: function(){
      var that = this;
      let storeId = localStorage.getItem("storeId");
      let param = {
      };
      doGet(`/stores/${storeId}/orders`, param)
        .then(res => {
          that.total=res.data.length;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleCurrentChange: function(val){
      this.currentPage=val;
      this.getOrderList();
    },
    handleClick: function(row){
      this.$router.push({
        path: '/order/orderDetail',
        query: {
          id: row._id
        }
      });
    }
  },
  mounted() {
    this.getOrderList();
    this.getTotal();
  }
};
</script>

<style scoped>
.orders {
  /* border: 1px solid #e7e7e7; */
  background: #ffffff;
}
.text-right{
  text-align: right;
}
</style>
