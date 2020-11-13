<template>
  <el-dialog
    class="register-dialog"
    title="用户注册"
    center
    :visible.sync="dialogFormVisible"
  >
    <el-upload
      class="avatar-uploader"
      :action="uploadURL"
      name="image"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>

    <el-form :model="form">
      <el-form-item label="昵称">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机">
        <el-input :model="form.name" autocomplete="off"></el-input>
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
          <el-col :span="18">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="5" :offset="1">
            <!-- 验证码 -->
            <img src="../../assets/Snipaste_2020-11-10_10-24-33.png" alt="" />
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="验证码">
        <el-row>
          <el-col :span="18">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="5" :offset="1">
            <!-- 验证码 -->
            <el-button>获取用户验证码</el-button>
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
export default {
  data () {
    return {
      imageUrl: '',
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
  
  }
}
</script>

<style>
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
</style>
