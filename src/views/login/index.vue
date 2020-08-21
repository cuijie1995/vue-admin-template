<template>
  <div class="login-container">
    <div class="title-container">
      <img src="../../assets/404_images/未标题-1.png" />
    </div>
    <div class="choice">
      <el-button
        type="text"
        @click="dialogFormVisible = true"
        style="font-size:16px;border-bottom: 1px solid #ffffff;color:#DDDDDD;margin-bottom: 22px;width:340px;cursor: default"
      >
        <span class="svg-container" style="padding-right:32px">
          <svg-icon icon-class="tenant" />
        </span>
        <span v-if="name">{{ name}}</span>
        <span v-if="!name">管理员</span>
      </el-button>
    </div>
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="off"
      label-position="left"
    >
      <el-form-item prop="userNameOrEmailAddress">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="userNameOrEmailAddress"
          v-model="loginForm.userNameOrEmailAddress"
          placeholder="请输入账号"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="off"
        />
      </el-form-item>

      <el-tooltip content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="请输入密码"
            name="password"
            tabindex="2"
            autocomplete="off"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >登录</el-button>
    </el-form>

    <div class="token">
      <el-form
        ref="tokenForm"
        :model="tokenForm"
        class="login-form"
        autocomplete="off"
        label-position="left"
      >
        <el-form-item prop="Name">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            v-model="tokenForm.Name"
            placeholder="请输入名称"
            name="name"
            type="text"
            tabindex="1"
            autocomplete="off"
          />
        </el-form-item>

        <el-tooltip content="Caps lock is On" placement="right" manual>
          <el-form-item prop="Password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :key="passwordType"
              v-model="tokenForm.Password"
              :type="passwordType"
              placeholder="请输入密码"
              name="password"
              tabindex="2"
              autocomplete="off"
              @keyup.enter.native="tokenLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>
        </el-tooltip>

        <el-button
          :loading="loading"
          type="primary"
          style="width:100%;margin-bottom:30px;"
          @click.native.prevent="tokenLogin"
        >登录</el-button>
      </el-form>
    </div>
  </div>
</template>



<script>
import { validUsername } from "@/utils/validate";
import Cookies from "js-cookie";
import { tenantlogin, login, getTenant, findTenant } from "@/api/login";
import { GetToken } from "../../api/erp";
import axios from "axios";
import Bus from "@/utils/bus";

let self;
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        userNameOrEmailAddress: "",
        password: ""
      },
      form: {
        tenancyName: ""
      },
      dialogFormVisible: false,
      loginRules: {
        userNameOrEmailAddress: [
          { required: true, message: "请输入账号", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      tenantloginRules: {
        tenancyName: [{ trigger: "blur" }]
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
      tenantName: "",
      tenantId: "",
      tokenForm: {
        Name: "",
        Password: ""
      },
      name: ""
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;

        if (route.query.tenancyName) {
          this.form.tenancyName = route.query.tenancyName;
          this.save();
        } else {
          this.name = "";
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.form.tenancyName = this.$route.query.tenancyName;
    // console.log()
    this.save();
    this.tokenLogin();
    // self = this;
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    save() {
      if (this.form.tenancyName) {
        tenantlogin(this.form).then(response => {
          console.log("5555555555555555");
          this.tenantName = this.form.tenancyName;
          this.name = response.result.name;
          this.tenantId = response.result.tenantId;

          localStorage.setItem("tenantName", this.tenantName);
          localStorage.setItem("tenantId", this.tenantId);
          localStorage.setItem("name", this.name);
        });
      }
    },
    handleLogin() {
      if (!this.$route.query.tenancyName) {
        var name1 = "管理员";
        localStorage.setItem("name", name1);

        localStorage.removeItem("tenantName");
        localStorage.removeItem("tenantId");
      }

      let name = this.tenantName;
      let id = this.tenantId;
      this.$refs["loginForm"].validate(valid => {
        if (valid) {
          this.$Message.loading("正在登录中...", 0);

          let millisecond = new Date().getTime();
          // let expiresTime = new Date(millisecond + 864000);

          login(this.loginForm, this.tenantId)
            .then(response => {
              console.log(response);

              sessionStorage.setItem("id", response.result.clientId);

              Cookies.set(
                "Token",
                response.result.accessToken
                // , {
                //   expires: expiresTime
                // }
              );
              this.$router.push({ path: this.redirect || "/" });
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          return false;
        }
      });
    },
    tokenLogin() {
      this.$refs["tokenForm"].validate(valid => {
        if (valid) {
          GetToken({
            name: "ADMIN",
            passWord: ""
          }).then(response => {
            localStorage.setItem("token2", response);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
$bg: white;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;
    }
  }

  .el-form-item {
    color: #454545;
    border-bottom: 1px solid #ffffff;
  }

  .choice .el-input input {
    border: 1px solid #dcdfe6 !important;
    color: rgb(11, 14, 20) !important;
  }

  .choice .el-dialog {
    width: 35%;
    height: 175px;
    border-radius: 5px;
  }

  .choice .el-dialog__header {
    text-align: left;
    padding: 10px 0px 10px 10px;
  }

  .choice .el-dialog__title {
    font-size: 14px;
    font-weight: 700;
  }

  .choice .el-dialog__body {
    padding: 10px 0px;
    border-top: 1px #e8eaec solid;
    border-bottom: 1px #e8eaec solid;
  }

  .choice .el-input {
    width: 96%;
  }

  .choice .el-input__inner {
    height: 30px;
    line-height: 30px;
  }

  .choice .el-button {
    padding: 0 !important;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  background-image: url(../../assets/404_images/beijing.jpg);

  .login-form {
    position: relative;
    width: 340px;
    max-width: 100%;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    text-align: center;
    margin-bottom: 20px;
    margin-top: 200px;

    img {
      margin-left: 23px;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  .choice {
    text-align: center;

    .el-button {
      text-align: left;
      padding: 8px 0;
    }
  }

  .el-button--primary {
    background: #5db75d !important;
    border-color: #5db75d !important;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}

.token {
  display: none;
}
</style>