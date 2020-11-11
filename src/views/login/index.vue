<template>
  <div class="login-container">
    <div class="left-box">
      <div class="head">
        <span class="png">
          <img src="../../assets/图层 8.png" alt />
        </span>
        <span class="left-script">黑马面面</span>
        <span class="division"></span>
        <span class="right-script">用户登录</span>
      </div>
      <div class="inpbody">
      <el-form ref="form" :model="form" :rules="rules" >
        <el-form-item prop="name">
          <el-input v-model="form.name" placeholder="请输入手机号码" prefix-icon="el-icon-s-custom"></el-input>
           </el-form-item>  
           <el-form-item  prop="security">
           <el-input placeholder="请输入密码" v-model="form.security" show-password  prefix-icon="el-icon-lock"></el-input>
           </el-form-item>  
           <el-form-item prop="verification">
           <el-row >
           <el-col :span="17" >
            <el-input v-model="form.verification" placeholder="请输入验证码" prefix-icon="el-icon-key"></el-input>
            </el-col>
            <el-col :span="7">
              <img class="checking" src="../../assets/Snipaste_2020-11-10_10-24-33.png" alt="">
            </el-col>
            </el-row>
        </el-form-item>          
        <div class="clause">
   <el-checkbox v-model="form.checked">我已阅读并同意<el-link type="primary">用户协议</el-link>和
   <el-link type="primary">隐私条款</el-link></el-checkbox>
</div>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
          <el-button type="primary">注册</el-button>
        </el-form-item>
      </el-form>
</div>

    </div>
    <img src="../../assets/login_banner_ele.png" alt />
  </div>
</template>

<script>
export default {
  name: "login",
    data() {
      return {
        form: {
          name: '',
          security:"",
          delivery: false,
        verification:'',
        checked: false
        },
         rules: {
          name: [          
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { 
              pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
              message: '手机号码有误请重新输入', 
              trigger: 'blur'},
          ],
            security: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 10, message: '密码有误请重新输入', trigger: 'blur' }
          ],
           verification: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            { min: 4, max: 4, message: '验证码有误请重新输入', trigger: 'blur' }
          ],
        },
      }     
    },

    methods: {
         onSubmit () {
            // 获取到的是 el-form这个组件
            // validate 是el-form 提供的方法
            this.$refs.form.validate(valid => {
              console.log('valid:', valid)
              // valid true 校验通过
              if (valid) {
                alert('submit!')
              } else {
                // 校验失败!
                console.log('error submit!!')
                return false
              }
            })
            
          },
                resetForm () {
            // this.$refs[formName].resetFields()
            // resetFields 是el-form 提供的方法
            // 重置表单 包括校验
            this.$refs.form.resetFields()
          }
    }
};
</script>

<style lang="less">

.login-container {
  height: 100%;
  // 开启弹性
  display: flex;
  // 上下居中
  align-items: center;
  // 均分
  justify-content: space-around;
  background: linear-gradient(#1493fa 28%, #01c6fa 96%);

  .left-box {
    width: 478px;
    height: 550px;
    background: #f5f5f5;
    .checking{
      widows: 100%;
      height: 40px;
    }
    .el-button{
 width: 100%;
 margin-left: 0;
 margin-bottom: 26px;
}
.clause{
  height: 30px;
  widows: 478px;

}

  }
  img {
    height: 435px;
  }
}
.head {
  margin-bottom: 32px;
  height: 24px;
  margin-top: 48px;
  img {
    display: inline-block;
    height: 18px;
    padding-left: 48px;
    padding-right: 13px;
  }
  .left-script {
    display: inline-block;
    height: 24px;
    line-height: 24px;
    font-size: 24px;
    color: #0c0c0c;
  }
  .right-script {
    display: inline-block;
    height: 24px;
    line-height: 24px;
    font-size: 22px;
    color: #0c0c0c;
  }
  .division {
    display: inline-block;
    width: 1px;
    height: 28px;
    background: #c7c7c7;
    margin: 0 14px;
  }
}
.inpbody{
  margin: 0 43px ;  
}



</style>