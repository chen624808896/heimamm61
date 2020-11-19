<template>
  <el-dialog center title="编辑学科" :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules" label-width="80px" ref="addForm">
      <!-- rules为校验 -->
      <el-form-item label="学科编号" prop="rid">
        <el-input v-model="form.rid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科名称" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简称" prop="short_name">
        <el-input v-model="form.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简介" prop="intro">
        <el-input v-model="form.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科备注" prop="remark">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入接口
import { editSubject } from '@/api/subject'
export default {
  name: 'addDialog',
  data () {
    return {
      // 是否显示对话框
      dialogFormVisible: false,
      //   表单数据
      form: {
        rid: '',
        name: '',
        short_name: '',
        intro: '',
        remark: ''
      },
      //   校验规则
      rules: {
        rid: [
          {
            required: true,
            message: '学科编号不能为空',
            trigger: 'change'
          }
        ],
        name: [
          {
            required: true,
            message: '学科名称不能为空',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          //   前端校验成功
          editSubject(this.form).then(res => {
              console.log('res:',res);
            //    成功
            if (res.data.code === 200) {
              this.$message.success('学科修改成功')
              // 关闭
              this.dialogFormVisible = false
              // 清空输入栏
              this.$refs.addForm.resetFields()
              // 刷新数据
              this.$parent.getList()
            }
          })
        } else {
          //   前端校验失败
          this.$message.error('数据格式有误请检查')
          return false
        }
      })
    }
  }
}
</script>

<style></style>
