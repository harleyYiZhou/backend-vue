<template>
	<el-container>
		<el-header class="text-right">
			<el-dropdown trigger="click">
				<span>Account
				<i class="el-icon-setting" style="margin-right: 15px"></i>
        </span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item>
						<span @click="logout" style="display:block;">LogOut</span>
					</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
      <div>
        <!-- {{$t('LOGIN_SIGN_IN')}} -->
      </div>
		</el-header>
		<el-main>
			<div class="contain">
				<!-- 表格 -->
				<el-table stripe border :data="gridData">
					<el-table-column v-for="(item,index) in showData" :key="index" :sortable="item.sortable" :label="item.label">
						<template slot-scope="scope">
							<div>
								<img v-if="item.type ==='image'" :src="scope.row|deepGet(item.prop)" alt="" style="width: 50px;height: 50px">
								<span v-if="item.type ==='string'">{{scope.row|deepGet(item.prop)}}</span>
								<!-- <el-button v-if="item.type ==='button'" @click="toUrl(item.url + scope.row._id)">{{item.prop}}</el-button> -->
							</div>
						</template>
					</el-table-column>
					<el-table-column fixed="right" label="选择" width="100">
						<template slot-scope="scope">
							<el-button @click="storeSel(scope.row)" type="text" size="small">选择</el-button>
							<!-- <el-button type="text" size="small">编辑</el-button> -->
						</template>
					</el-table-column>
				</el-table>
				<!-- 分页 -->
				<el-pagination class="pagination" @current-change="handleCurrentChange" layout="prev, pager, next" :current-page.sync="pagination.currentPage" :total="pagination.total">
				</el-pagination>
				<div class="clearfix"></div>
			</div>
		</el-main>
	</el-container>

</template>

<script>
import { doGet } from "@/api/api.js";
export default {
  mounted() {
    this.storeGet();
  },
  data() {
    return {
      gridData: [],
      showData: [
        { prop: "logo.url", label: "image", width: 120, type: "image" },
        { prop: "name.en", label: "name", width: 120, type: "string" }
        // { prop: 'products.length', label: 'quantity', width: 120, type: 'string' },
      ],
      pagination: {
        currentPage: 1,
        total: 50
      },

      storeGridData: [],
      storeShowData: [
        { prop: "logo.url", label: "logo", width: 120, type: "image" },
        { prop: "name.en", label: "name", width: 120, type: "string" }
      ],
      storeDialog: false,
      storePagination: {
        currentPage: 1,
        total: 0
      }
    };
  },
  methods: {
    storeGet() {
      this.gridData = [];
      doGet("/stores").then(res => {
        console.log(res);
        this.pagination.total = parseInt(res.headers["x-total-count"]);

        this.gridData = res.data;
      });
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.storeGet();
    },
    storeSel(row) {
      console.log(row);

      this.$store.dispatch("setStoreId", row._id).then(() => {
        this.$router.push({ path: "/home" });
      });
		},
		logout: function() {
      localStorage.removeItem('profile');
      localStorage.removeItem('storeId');
      localStorage.removeItem('token');
      this.$router.push({
        path: '/login'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.contain {
  // width: 1000px;
  margin: 10px;
  min-height: 300px;
  background: #fff;
  padding: 20px 100px;
  // box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.2);
  .addBtn {
    margin: 10px 0;
  }
}
.pagination {
  margin: 5px 0;
  float: right;
}
.btn {
  margin: 5px 0;
  float: right;
}
.clearfix {
  clear: both;
}
.text-right{
  text-align: right;
}
</style>

