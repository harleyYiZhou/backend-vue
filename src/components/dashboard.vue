<template>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-header height="50px" class="text-right navbar1">
        <el-row>
          <el-col :span="4">cc</el-col>
          <el-col :offset="12" :span="4">
            <el-button v-show="language==='en'" @click="handleSetLanguage('zh')"  plain>中文</el-button>
            <el-button v-show="language==='zh'" @click="handleSetLanguage('en')" plain>English</el-button>
          </el-col>
          <el-col :span="4">
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
          </el-col>
        </el-row>
      </el-header>
      <el-main>Main</el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters([
      'language'
    ])
  },
  methods: {
    logout: function() {
      this.$confirm("确认要注销账号吗？", "提示", {
        confirmButton: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "注销成功"
          });
          localStorage.removeItem("profile");
          localStorage.removeItem("storeId");
          localStorage.removeItem("token");
          this.$router.push({
            path: "/login"
          });
        })
        .catch(() => {});
    },
    //多语言
    handleSetLanguage: function(lang){
      this.$i18n.locale=lang;
      this.$store.dispatch('setLanguage',lang);
      this.$message({
        message: 'switch language success',
        type: 'success'
      })
    }
  }
};
</script>

<style>
.text-right {
  text-align: center;
}
.navbar1 {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  text-align: right;
  background: #409eff;
}

/* .menu {
  height: 100%;
  vertical-align: center;
} */
</style>
