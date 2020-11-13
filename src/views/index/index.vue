<template>
  <el-container class="index-container">
    <el-header class="my-header">
      <!-- 左边盒子 -->
      <div class="left-box">
        <i class="el-icon-s-fold"></i>
        <img src="../../assets/图层 6 (1).png" alt="" />
        <span>黑马西蓝花</span>
      </div>
      <!-- 右边盒子 -->
      <div class="right-box">
        <img src="../../assets/微信图片2.jpg" alt="" />
        <span>见鹿：你好</span>
        <el-button size="mini" type="primary" @click="centerDialogVisible = true"
          >退出</el-button
        >
        <el-dialog
          title="提示"
          :visible.sync="centerDialogVisible"
          width="30%"
          center
        >
          <span>您确定要离开吗？o(╥﹏╥)o！！!</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="centerDialogVisible = false"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </div>
    </el-header>
    <el-container>
      <el-aside class="my-aside" width="200px">Aside</el-aside>
      <el-main class="my-main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'index',
  created () {
    const token = window.localStorage.getItem('mmtoken')
    if (token) {
      //  登录啦
    } else {
      this.$message.error('请先登录！')
      //  返回首页
      this.$router.push('/login')
    }
  },
  // 退出按钮设置
  data () {
    return {
      centerDialogVisible: false
    }
  }
}
</script>

<style lang="less">
.index-container {
  height: 100%;
  .my-header {
    background-color: gray;
    display: flex;
    // 左右定格
    justify-content: space-between;
    // 上下居中
    align-items: center;
    .left-box {
      i {
        font-size: 28px;
        width: 28px;
        height: 24px;
        margin-right: 22px;
      }
      img {
        width: 33px;
        height: 28px;
        margin-right: 12px;
      }
      span {
        font-size: 22px;
        color: #49a1ff;
        line-height: 22px;
      }
    }
    .right-box {
      display: flex;
      align-items: center;
      img {
        width: 43px;
        height: 43px;
        border-radius: 50%;
        margin-right: 9px;
      }
      .el-button{
        margin-left: 10px;
      }
    }
  }
  .my-aside {
    background-color: dodgerblue;
  }
  .my-main {
    background-color: lightblue;
  }
}
</style>
