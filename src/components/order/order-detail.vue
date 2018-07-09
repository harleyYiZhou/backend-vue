<template>
  <div>
    <div class="mx-4 mb-4">
      <el-row>
        <el-col :span="1">
          <i class="el-icon-back backIcon" @click="backToOrderList"></i>
        </el-col>
        <el-col :span="21">
          <h4>#{{orderDetail.refId}}/{{setTime(orderDetail.createdAt)}}
            <span class="status">{{orderDetail.status==='closed'?$t('ORDER_DETAIL_CLOSE'):$t('ORDER_DETAIL-OPEN')}}</span>
            <span class="status">{{orderDetail.shippingType==='shipped'?$t('ORDER_DETAIL_SHIP'):$t('ORDER_DETAIL_UNSHIP')}}</span>
          </h4>
        </el-col>
        <el-col :span="2" class="text-right">
          <el-button type="text">··· {{$t('ORDER_DETAIL_MORE')}}</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="mt-4 mx-4" >
      <el-row>
        <el-col :span="16" class="height">
          <div class="mx-2 p-3 bg-white">
            <h5>订单信息</h5>
            <el-row>
              <el-col :span="24">
                <i class=""></i>
                订单状态： {{orderDetail.status==="open"?$t('ORDER_DETAIL_OPEN'):$t('ORDER_DETAIL_CLOSE')}}
              </el-col>
              <el-col :span="24">
                <i class=""></i>
                物流状态： {{orderDetail.shippingStatus==="ship"?$t('ORDER_DETAIL_SHIP'):$t('ORDER_DETAIL_UNSHIP')}}
              </el-col>
            </el-row>
            <div class="mx-2">
              <el-row class="height-100" v-for="(goods,index) in orderDetail.items" :key="index">
                <el-col :span="6"><img :src="goods.image.url" alt="图片"></el-col>
                <el-col :span="9" class="height-100">{{language==="en"||!goods.name.zh?goods.name.en:goods.name.en}}</el-col>
                <el-col :span="3" class="height-100">￥2.00</el-col>
                <el-col :span="3" class="height-100">x1</el-col>
                <el-col :span="3" class="text-right height-100">￥2.00</el-col>
              </el-row>
              <el-row v-if="orderDetail.discountItem.itemIndexes.length!==0">
                <el-col :span="6">
                  <div>优惠名称</div>
                  <div>折扣商品</div>
                </el-col>
                <el-col :span="9">
                  <div>折扣123</div>
                  <div>哈哈哈</div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="21" class="text-right">
                  <div>优惠</div>
                  <div>代用金</div>
                  <div>税额</div>
                  <div>运输费用</div>
                  <div>共需</div>
                  <hr>
                  <div>客户已支付</div>
                </el-col>
                <el-col :span="3" class="text-right">
                  <div>-￥{{orderDetail.discount===0?"0.00":orderDetail.discount/100}}</div>
                  <div>-￥{{orderDetail.credit===0?"0.00":orderDetail.credit/100}}</div>
                  <div>￥{{orderDetail.serviceCost===0?"0.00":orderDetail.serviceCost/100}}</div>
                  <div>￥{{orderDetail.shippingCost===0?"0.00":orderDetail.shippingCost/100}}</div>
                  <div>￥{{orderDetail.totalCost===0?"0.00":orderDetail.totalCost/100}}</div>
                  <hr>
                  <div>￥{{orderDetail.totalPaid===0?"0.00":orderDetail.totalPaid/100}}</div>
                </el-col>
              </el-row>
            </div>
            <div class="border-t p-3 mt-2">订单奖励</div>
            <div class="border-t p-3">
              <el-row>
                <el-col :span="6">
                  <span>等待支付</span>
                </el-col>
                <el-col :span="18" class="text-right">
                  <el-button type="primary">标记成已支付</el-button>
                </el-col>
              </el-row>
            </div>
            <div class="border-t p-3">
              <el-row>
                <el-col :span="6">
                  <span>物流</span>
                </el-col>
                <el-col :span="18" class="text-right">
                  <el-button type="primary">订单发货</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="mx-2 bg-white" id="shippingInfo">
            <div class="p-3 pt-4">
              <div>配送方式</div>
              <div>{{orderDetail.shippingType}}</div>
            </div>
            <div class="p-3">
              <div>收件人：{{orderDetail.shippingAddress.name}}</div>
              <div>{{orderDetail.shippingAddress.mobilePhone}}</div>
            </div>
            <div class="p-3">
              <div>送货地址</div>
              <div>{{orderDetail.shippingAddress.address}}</div>
              <div>{{orderDetail.shippingAddress.province}},{{orderDetail.shippingAddress.city}},{{orderDetail.shippingAddress.district}},{{orderDetail.shippingAddress.street}},{{orderDetail.shippingAddress.address}}</div>
              <div>{{orderDetail.shippingAddress.provinceId}},{{orderDetail.shippingAddress.cityId}},{{orderDetail.shippingAddress.districtId}},{{orderDetail.shippingAddress.streetId}}</div>
            </div>
            <div class="p-3 pb-4">
              <div>客户留言</div>
              <div>{{orderDetail.shippingAddress.customOrderFields}}</div>
            </div>
          </div>
          <div class="mx-2 bg-white" style="height: 400px;">

          </div>
        </el-col>
      </el-row>
    </div>
    <div class="p-4 px-5">
      <h5>时间表</h5>
      <ul>
        <li class="mt-2" v-for="(log,index) in orderDetail.log" :key="index">
          <div class="color">{{setTime(log.timestamp)}}</div>
          <div >{{log.type}}</div>
        </li>
      </ul>
    </div>
    <div class="mx-5 m-4">
      <el-row>
        <el-col :span="12">
          <span>支付方式：</span>
          <div></div>
        </el-col>
        <el-col :span="12">
          <span>状态：</span>
          <div></div>
        </el-col>
      </el-row>
    </div>
  </div>
  
</template>

<script>
import { doGet } from "@/api/api.js";
import { formatTime, setTimeout } from "@/utils/formatTime.js";
export default {
  data() {
    return {
      orderDetail: {},
      language: localStorage.getItem("language")
    };
  },
  methods: {
    setTime: function(time) {
      var time = formatTime(new Date(time), "{y}-{m}-{d} {h}:{i}");
      return time;
    },
    getOrderDetail: function() {
      var that = this;
      let storeId = localStorage.getItem("storeId");
      let orderId = this.$route.query.id;
      doGet(`stores/${storeId}/orders/${orderId}`).then(res => {
        that.orderDetail = res.data;
      });
    },
    backToOrderList: function(){
      this.$router.push({
        path: '/order'
      })
    }
  },
  mounted() {
    this.getOrderDetail();
  }
};
</script>

<style>
.backIcon {
  cursor: pointer;
  font-size: 20px;
}
.bg-white {
  background: #fff;
}
.text-right {
  text-align: right;
}
.el-button--text {
  color: #000;
}
.height {
  height: 30px;
  line-height: 30px;
  font-size: 15px;
}
.height-100 {
  height: 100%;
  line-height: 100%;
}
img {
  width: 80%;
}
.border-t {
  border-top: 1px solid #cfcfcf;
}
#shippingInfo {
  font-size: 15px;
}
.status{
  font-size: 18px;
  color: #6f6f6f;
}
.color{
  color: #6f6f6f;
}
</style>
