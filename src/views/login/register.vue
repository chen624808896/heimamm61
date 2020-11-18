<template>
  <el-dialog
    class="register-dialog" 
    title="用户注册"
    center
    :visible.sync="dialogFormVisible"
  >
    <el-form :model="form" :label-width="formLabelWidth">
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :action="uploadURL"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          v-model="form.name"
          show-password
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item label="图形码">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.code" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <!-- 验证码 -->
            <img @click="changeCode" class="code" :src="codeURL" alt="" />
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="验证码">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <!-- 验证码 -->
            <el-button @click="getPhoneClick" :disabled="delayTime != 0">{{
              btnINFO
            }}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
// 导入方法
import { getRegisterCodeURL, getPhoneCode, getUploadURL } from '@/api/register'

export default {
  name: 'register',
  data () {
    return {
      imageUrl: '',
      formLabelWidth: '100px',
      // 左侧宽度
      dialogTableVisible: false,
      dialogFormVisible: false,
      // 表单数据
      form: {
        name: '',
        // 昵称
        phone: '',
        //  手机号
        code: '',
        // 图形验证码
        desc: ''
      },
      // 图片验证码地址
      codeURL: getRegisterCodeURL(),
      // formLabelWidth: '120px'
      // 文字赋值插值语法
      btnINFO: '获取用户验证码',
      // 倒计时时间
      delayTime: 0,
      // 上传的图片地址
      uploadURL: getUploadURL()
    }
  },
  methods: {
    // 注册页重新生成验证码
    changeCode () {
      this.codeURL = getRegisterCodeURL()
    },
    //  倒计时的点击事件
    getPhoneClick () {
      // 修改内容
      this.delayTime = 60
      // 点击之后修改按钮文字进入倒计时 默认60秒
      this.btnINFO = `倒计时${this.delayTime}秒`
      // 计时器函数
      // 赋值返回值
      const interID = setInterval(() => {
        // 进来时候减减    // 这里要注意点击之后再运行所以要再写一次
        this.btnINFO = `倒计时${this.delayTime}秒`
        this.delayTime--
        if (this.delayTime == 0) {
          // 倒计时结束方法clearInterval
          clearInterval(interID)
          this.btnINFO = '获取用户验证码 '
        }
      }, 1000)
      // 获取参数
      let { code, phone } = this.form
      // 获取验证码
      getPhoneCode({
        code,
        phone
      }).then(res => {
        console.log('res')
        if (res.data.code != 0) {
          this.$message.success(`短信验证码为${res.data.data.captcha}`)
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    // 上传组建的方法
    // 上传组件的方法
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg' || 'image/gif' || 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 1

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG GIF PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 1MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style lang="less">
.el-dialog__header {
    background: linear-gradient(to right, #01c4fa, #1395fa);
    .el-dialog__title {
    color: white;  
  }
     .el-dialog__close.el-icon {
      color: white;
    } 
  }

.register-dialog {

  .code {
    width: 100%;
    height: 40px;
    display: block;
  }
  // 上传组件样式
  .avatar-uploader {
    text-align: center;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  
}
  
</style>
