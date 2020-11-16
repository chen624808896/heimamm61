<template>
  <!-- 头卡 -->

  <div class="subject-container">
    <el-card>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科编号" class="min-item">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>

        <el-form-item label="学科名称">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>

        <el-form-item label="创造者" class="min-item">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>

        <el-form-item label="状态">
          <el-select v-model="formInline.region" placeholder="请选择状态">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button>清除</el-button>
          <el-button type="primary" @click="onSubmit" icon="el-icon-plus"
            >新增学科</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'subject',
  data () {
    return {
      formInline: {}
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>

<style lang="less">
.subject-container {
  .min-item {
    .el-form-item__content {
      width: 100px;
    }
  }
}
</style>
