<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>
<style lang="scss">
.filter-container {
  margin-bottom: 10px;

  .el-input__inner {
    height: 35px ;
    line-height: 35px !important;
  }
}
 .el-button {
    padding: 8px 16px !important;
    cursor: pointer;
  }
.el-table td,
.el-table th {
  padding: 5px 0 !important;
}
.el-button--mini, .el-button--mini.is-round{
  padding: 3px 18px !important
}
.el-table__empty-block{
  min-height: 40px !important;
  height: 40px !important;
}
ul li{
  list-style: none
}
i.el-icon-folder {
    font-weight: 1000;
    margin-top: -5px;
    font-size: 25px;
  }

  i.el-icon-folder-opened {
    font-weight: 1000;
    margin-top: -5px;
    font-size: 25px;
  }
  
  i.el-icon-document-checked {
    font-weight: 1000;
    margin-top: -5px;
    font-size: 25px;
  }

  i.el-icon-folder-add {
    font-weight: 1000;
    margin-top: -5px;
    font-size: 25px;
  }
</style>