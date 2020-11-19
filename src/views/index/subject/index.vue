<template>
  <!-- 头卡 -->
  <div class="subject-container">
    <el-card>
      <el-form
        :inline="true"
        ref="searchForm"
        :model="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="学科编号" prop="rid" class="min-item">
          <el-input v-model="formInline.rid"></el-input>
        </el-form-item>

        <el-form-item label="学科名称" prop="name">
          <el-input v-model="formInline.name" class="inp"></el-input>
        </el-form-item>

        <el-form-item label="创造者" prop="username" class="min-item">
          <el-input v-model="formInline.username"></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-select v-model="formInline.status" placeholder="请选择状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button @click="reset">清除</el-button>
          <el-button type="primary" @click="showAddDialog" icon="el-icon-plus"
            >新增学科</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 底部 -->
    <el-card class="buttom-card">
      <!-- 表格 -->
      <el-table :data="tableData">
        <!-- 索引列 -->
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column prop="rid" label="学科编号"></el-table-column>
        <el-table-column prop="name" label="学科名称"></el-table-column>
        <el-table-column prop="short_name" label="简称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column label="创建日期">
          <template slot-scope="scope">
            {{ scope.row.create_time | formatTime }}
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">启动</span>
            <span v-else style="coler:#ff6f6f">禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="editSubject(scope.row)"
              >编辑</el-button
            >
            <el-button type="text" @click="changeStatus(scope.row)"
              >禁用</el-button
            >
            <el-button type="text" @click="delSubject(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页器 -->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 新增对话框 -->
    <addDialog ref="addDialog"></addDialog>
    <!-- 编辑对话框 -->
    <editDialog ref="editDialog"></editDialog>
  </div>
</template>

<script>
// 获取接口
import { getSubject, changeSubjectStatus, removeSubject } from '@/api/subject'
// 导入moment（修改日期）
import moment from 'moment'
// 导入对话框
import addDialog from './addDialog'
// 导入对话框 编辑
import editDialog from './editDialog'

import {deepClone} from '@/utils/tools'

export default {
  name: 'subject',
  mounted () {
    // 默认获取一次数据
    this.getList()
  },
  data () {
    return {
      user: '',
      // 顶部表单的数据
      formInline: {
        rid: '',
        name: '',
        username: '',
        status: ''
      },
      // tabled的数据
      tableData: [{}],
      // 当前页
      currentPage: 1,
      // // 页容量数据
      pageSizes: [1, 10, 15, 20, 22],
      // // 默认页容量
      pageSize: 1,
      // // 总条数
      total: 31
    }
  },

  // 注册组件
  components: {
    addDialog,
    editDialog
  },

  // 过滤器
  filters: {
    formatTime (value) {
      return moment(value).format('YYYY年MM月DD日')
    }
  },

  methods: {
    // 编辑
    editSubject (item) {
      // 显示对话框
      this.$refs.editDialog.dialogFormVisible = true

      // 深克隆一份表单
      const cloneItem = deepClone(item)

      this.$refs.editDialog.form = cloneItem
      console.log(item === cloneItem)
      // 把原来的数据渲染在  编辑对话框上

      // 可以使用深拷贝
    },
    // 删除
    delSubject (item) {
      this.$confirm('此操作将永久删除该学科哦(灬ꈍ ꈍ灬), 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          removeSubject({
            id: item.id
          }).then(() => {
            // console.log(res)
            // 判断是不是最后一页
            const totalPage = Math.ceil(this.total / this.pageSize)
            if (totalPage == this.currentPage) {
              // 最后一条
              if (this.tableData.length == 1) {
                // 页码-1
                this.currentPage--
                // 小于0
                if (this.currentPage == 0) {
                  this.currentPage = 1
                }
              }
            }
            this.getList()
          })
        })
        .catch(() => {
          this.$message({})
        })
    },
    // 修改状态
    changeStatus (item) {
      changeSubjectStatus({
        id: item.id
      }).then(() => {
        // console.log(res)
        this.getList()
      })  
    },
    // 查询数据
    search () {
      //  调整了getList吧搜索的值直接全部合并所以可以直接调用
      this.getList()
    },
    // 清空表单
    reset () {
      this.$refs.searchForm.resetFields()
      // resetFields()是一个清除元素的方法
      this.getList()
    },
    // 弹出注册框
    showAddDialog () {
      this.$refs.addDialog.dialogFormVisible = true
    },
    // 获取数据方法
    getList () {
      // 获取列表数据 第一页 要十条
      getSubject({
        // 页码
        page: this.currentPage,
        // 页容量
        limit: this.pageSize,
        // 把搜索的参数合并进去
        ...this.formInline
      }).then(res => {
        console.log('res:', res)
        // 保存数据
        this.tableData = res.data.data.items
        // 设置总条数
        this.total = res.data.data.pagination.total
      })
    },
    // 分页器方法 页容量改变
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.getList()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      // 保存当前页
      this.currentPage = val
      this.getList()
    }
  }
}
</script>

<style lang="less">
.subject-container {
  .min-item .el-form-item__content {
    width: 100px;
  }
  .el-select {
    width: 149px;
  }
  .inp {
    width: 149px;
  }
  .buttom-card {
    margin-top: 13px;
  }
  .el-pagination {
    margin-top: 30px;
    text-align: center;
  }
}
</style>
