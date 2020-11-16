<template>
  <el-container class="index-container">
    <el-header class="my-header">
      <!-- 左边盒子 -->
      <div class="left-box">
        <i
          :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
          @click="isCollapse = !isCollapse"
        ></i>
        <img src="../../assets/图层 6 (1).png" alt="" />
        <span>黑马西蓝花</span>
      </div>
      <!-- 右边盒子 -->
      <div class="right-box">
        <img src="../../assets/微信图片2.jpg" alt="" />
        <span>见鹿：你好</span>
        <el-button
          size="mini"
          type="primary"
          @click="centerDialogVisible = true"
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
    <!-- 侧边导航 -->
    <el-container>
      <el-aside class="my-aside" width="auto">
        <el-menu
          :collapse="isCollapse"        
          :default-active="$route.Path"
          class="el-menu-vertical-demo"
          router
        >
        <!-- 设置点击高亮 default-active="$route.path" -->
          <el-menu-item index="chart">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>

          <el-menu-item index="user">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>

          <el-menu-item index="question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>

          <el-menu-item index="company">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>

          <el-menu-item index="subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-main class="my-main">
        <!-- 嵌套路由的出口 -->
        <router-view></router-view>
      </el-main>
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
      centerDialogVisible: false,
      isCollapse: false
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
   // 目前只是自动执行，细的created或者deforeCreate都是OK的
//   created() {
//     // 获取token 并判断
// const token = getToken()
// if (token) {
//   // 登录获取用户信息
//   getUserInfo().then(res=>{
//   if (res.data.code === 206) {
//     // 提示用户
//     this.$message.error("请重新登录")
//     // 移除token
//     removeToken()
//     // 去登录
//     this.$router.push("/login")
//   }else{
//  this.userInfo = res.data.data
//  }
// })
// }else{
// this.$message.error("请先登录！")
// // 打回登录页
// this.$router.push("/login")
// }
//   }
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
      .el-button {
        margin-left: 10px;
      }
    }
  }

  .my-main {
    background-color: lightblue;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu--collapse {
    width: 0;
  }
}
</style>
