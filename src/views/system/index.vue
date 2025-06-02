<template>
  <el-container style="height: 100vh;">
    <el-main style="padding: 20px;">
      <div style="margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
        <div class="text-14px mb-2">{{ "系统设置" }}</div>
        <div>
          <el-button v-if="!isEditing" @click="startEdit">编辑</el-button>
          <el-button v-if="isEditing" type="primary" @click="saveForm">保存</el-button>
          <el-button v-if="isEditing" @click="cancelEdit">取消</el-button>
        </div>
      </div>
      <el-form :model="settingsForm" :disabled="!isEditing" label-position="top">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="设备参数">
              <el-input v-model="settingsForm.parameter" placeholder="请输入设备参数" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="设备状态">
              <el-input v-model="settingsForm.status" placeholder="请输入设备状态" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="故障报警">
              <el-select v-model="settingsForm.faultAlarm" placeholder="请选择故障报警">
                <el-option label="启用" value="enabled" />
                <el-option label="禁用" value="disabled" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-main>
  </el-container>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue';

const isEditing = ref(false);

const settingsForm = reactive({
  parameter: '',
  status: '',
  faultAlarm: 'enabled'
});

const startEdit = () => {
  isEditing.value = true;
};

const saveForm = () => {
  // 这里添加保存逻辑
  console.log('保存设置:', settingsForm);
  isEditing.value = false;
};

const cancelEdit = () => {
  isEditing.value = false;
};
</script>
<style scoped></style>
