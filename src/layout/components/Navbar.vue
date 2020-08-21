<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="login">
      {{name}}，欢迎登录！！！
      <!-- <i class="el-icon-user" style="font-size: 22px;cursor: pointer;color:#97a8be"></i> -->
    </div>

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img src="../../assets/404_images/1.gif" class="user-avatar" />
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import Cookies from "js-cookie";
import Router from "../../router/index";
import Bus from "../../utils/bus";

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      userNameOrEmailAddress: "",
      Token: "",
      name: ""
    };
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"])
  },
  mounted() {
    this.name = localStorage.getItem("name");
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    logout() {
      localStorage.removeItem("name");
      Cookies.remove("Token");
      localStorage.removeItem("token2");

      var id = localStorage.getItem("tenantName");
      if (id) {
        Router.push({
          path: "/login",
          query: { tenancyName: id }
        });

        this.$route.query.tenancyName;
      } else {
        this.$router.push("/login");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  position: fixed;
  width: 100%;
  z-index: 1000;

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    // float: right;
    height: 50px;
    line-height: 50px;
    // padding-right: 200px;
    position: fixed;
    top: 1px;
    right: 10px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}

.login {
  // style="position: fixed;display: inline-block;color: aqua;right: 120px;top: 15px"
  color: aqua;
  height: 50px;
  line-height: 50px;
  margin-left: 30%;
  display: inline;
}
</style>
<style>
.el-dropdown-menu__item--divided {
  border-top: none;
  margin-top: 0;
}

.el-popper[x-placement^="bottom"] {
  margin-top: 0;
}

.el-dropdown-menu__item--divided:before {
  height: 0;
  margin: 0;
}
</style>