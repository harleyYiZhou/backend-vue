<template>
  <el-container style="height: 100%;">
    <!-- sidebar -->
    <el-aside width="sideBarWidth">
      <el-menu background-color="#545c64" text-color="#fff" default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
        <template v-for="(item,index) in routes" v-if="item.hidden">
          <template v-if="child.show" v-for="(child,index1) in item.children">
            <router-link :key="index" :to="child.path">
              <el-menu-item :index="child.path" >
                  <i :class="child.icon"></i>
                  <span slot="title" v-if="language==='en'">{{child.name.en}}</span>
                  <span slot="title" v-if="language==='zh'">{{child.name.zh}}</span>
              </el-menu-item>
            </router-link>
          </template>
        </template>
        <!-- <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">导航一</span>
          </template>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item> -->
      </el-menu>
    </el-aside>
    <el-container>
      <!-- navbar -->
      <el-header height="50px" class="text-right navbar1">
        <el-row>
          <el-col :span="4" class="text-left">
            <el-radio-group v-model="isCollapse">
              <el-radio-button :label="false" v-if="isCollapse">
                <i class="el-icon-menu"></i>
              </el-radio-button>
              <el-radio-button :label="true" v-if="!isCollapse">
                <i class="el-icon-menu"></i>
              </el-radio-button>
            </el-radio-group>
          </el-col>
          <el-col :offset="14" :span="6">
            <el-row class="text-center">
              <el-col :span="8">
                <el-dropdown trigger="click">
                  <span class="font-color">
                    <i class="el-icon-setting"></i>
                    {{$t('BILLING')}}
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <span v-show="language==='en'" @click="handleSetLanguage('zh')" style="display:block;">中文</span>
                      <span v-show="language==='zh'" @click="handleSetLanguage('en')" style="display:block;">ENGLISH</span>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
              <el-col :span="8">
                <el-dropdown trigger="click">
                  <span class="font-color">
                    <i class="el-icon-setting"></i>
                    {{$t('LANGUAGE')}}
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <span @click="handleSetLanguage('zh')" style="display:block;">中文</span>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <span @click="handleSetLanguage('en')" style="display:block;">ENGLISH</span>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
              <el-col :span="8">
                <el-dropdown trigger="click">
                  <span class="font-color">
                    <i class="el-icon-setting"></i>
                    {{$t('ACCOUNT')}}
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <span @click="logout" style="display:block;">{{$t('LOGOUT')}}</span>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-header>
      <!-- content -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      isCollapse: false,
      sideBarWidth: "200px",
      routes: this.$router.options.routes
    };
  },
  computed: {
    ...mapGetters(["language"]),
    languange(){
      return this.language;
    }
  },
  methods: {
    logout: function() {
      console.log(this.language);
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
    handleSetLanguage: function(lang) {
      this.$i18n.locale = lang;
      localStorage.setItem('language',lang);
      this.$store.dispatch("setLanguage", lang);
      this.$message({
        message: "switch language success",
        type: "success"
      });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style>
.text-right {
  text-align: right;
}
.text-left {
  text-align: left;
}
.text-center {
  text-align: center;
}
.navbar1 {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  text-align: right;
  background: #409eff;
}
.el-container {
  height: 100%;
}
.el-aside {
  height: 100%;
}
.el-menu {
  height: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
  color: #ffffff;
}
.font-color {
  color: #ffffff;
  cursor: pointer;
}
/* .sidebar1 {
  background: #0000a0;
  color: #000000;
} */
/* .menu {
  height: 100%;
  vertical-align: center;
} */
</style>
