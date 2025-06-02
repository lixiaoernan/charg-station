<template>
  <el-container style="height: 100vh;">
    <el-aside width="200px" style="height: 100%; border-right: 1px solid #dcdfe6; padding: 20px 8px 0px 8px;">
      <div class="text-14px mb-2">{{ "用户管理" }}</div>
      <el-input v-model="deptFilter" placeholder="筛选部门" />
      <el-tree class="mt-8px" :data="deptTree" :filter-node-method="filterDept" @node-click="handleDeptClick" />
    </el-aside>
    <el-main>
      <div style="margin-bottom: 10px;">
        <div class="text-14px mb-2">{{ "全部" }}</div>
        <el-input v-model="userFilter" placeholder="筛选用户" style="width: 200px;" />
      </div>
      <div style="margin-bottom: 10px; text-align: right;">
        <el-button type="primary" @click="showAddDialog">新增用户</el-button>
      </div>
      <el-table :data="userList.filter(user => user.name.includes(userFilter))">
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="dept" label="部门" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="showEditDialog(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="deleteUser(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑用户' : '新增用户'">
        <el-form :model="userForm" label-width="80px">
          <el-form-item label="姓名">
            <el-input v-model="userForm.name" />
          </el-form-item>
          <el-form-item label="部门">
            <el-input v-model="userForm.dept" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="saveUser">确定</el-button>
          </span>
        </template>
      </el-dialog>
    </el-main>
  </el-container>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue';

const deptFilter = ref('');
const deptTree = ref([{ label: '部门1', children: [{ label: '子部门1' }] }]);
const userList = ref([{ id: 1, name: '用户1', dept: '部门1' }]);
const dialogVisible = ref(false);
const isEdit = ref(false);
const userForm = reactive({ name: '', dept: '' });
const userFilter = ref('');

const filterDept = (value: string, data: any) => {
  if (!value) return true;
  return data.label.indexOf(value) !== -1;
};

const handleDeptClick = (data: any) => {
  // 根据部门筛选用户
};

const showAddDialog = () => {
  isEdit.value = false;
  userForm.name = '';
  userForm.dept = '';
  dialogVisible.value = true;
};

const showEditDialog = (row: any) => {
  isEdit.value = true;
  userForm.name = row.name;
  userForm.dept = row.dept;
  dialogVisible.value = true;
};

const saveUser = () => {
  if (isEdit.value) {
    // 更新用户
  } else {
    // 新增用户
  }
  dialogVisible.value = false;
};

const deleteUser = (id: string) => {
  // 删除用户
};
</script>
<style scoped></style>
