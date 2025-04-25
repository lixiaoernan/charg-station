<template>
  <div class="min-h-screen flex">
    <!-- 左侧品牌区域 -->
    <div class="w-2/5 bg-[#004D40] relative overflow-hidden">
      <div class="absolute inset-0">
        <img
          :src="brandBgUrl"
          class="w-full h-full object-cover opacity-20"
          alt="background" />
      </div>
      <div
        class="relative h-full flex flex-col items-center justify-between py-16 px-12 text-white">
        <div class="text-center">
          <img :src="logoUrl" alt="Logo" class="w-48 h-48 mx-auto mb-6" />
          <h1 class="text-4xl font-bold mb-4">智充管理系统</h1>
          <p class="text-xl text-gray-200">ChargeMaster</p>
        </div>
        <div class="flex-1 flex items-center justify-center">
          <img
            :src="illustrationUrl"
            alt="Illustration"
            class="w-full max-w-md" />
        </div>
        <div class="text-center">
          <p class="text-xl mb-2">智能充电 绿色出行</p>
          <p class="text-gray-300">让每一次充电都成为美好体验</p>
        </div>
      </div>
    </div>

    <!-- 右侧登录区域 -->
    <div class="w-3/5 bg-white flex items-center justify-center">
      <div class="w-96">
        <div class="mb-12">
          <h2 class="text-3xl font-bold text-gray-800 mb-3">欢迎登录</h2>
          <p class="text-gray-500">请输入您的账号和密码</p>
        </div>
        <el-form
          ref="formRef"
          :model="form"
          @submit.prevent="handleLogin"
          class="space-y-6">
          <el-form-item
            prop="username"
            :rules="[
              { required: true, message: '请输入密码', trigger: 'blur' },
            ]">
            <el-input
              v-model="form.username"
              :class="{ '!rounded-button': true }"
              placeholder="请输入用户名"
              size="large"
              :prefix-icon="User" />
          </el-form-item>
          <el-form-item
            prop="password"
            :rules="[
              { required: true, message: '请输入密码', trigger: 'blur' },
            ]">
            <el-input
              v-model="form.password"
              :class="{ '!rounded-button': true }"
              type="password"
              placeholder="请输入密码"
              size="large"
              :prefix-icon="Lock"
              show-password />
          </el-form-item>
          <div class="flex items-center justify-between">
            <el-checkbox v-model="form.remember">记住密码</el-checkbox>
            <a href="#" class="text-[#00B96B] hover:text-[#006E40]"
              >忘记密码？</a
            >
          </div>
          <el-button
            :class="{ '!rounded-button': true }"
            type="success"
            size="large"
            class="w-full !bg-[#00B96B] hover:!bg-[#006E40]"
            :loading="loading"
            native-type="submit">
            登录
          </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user";
import request from "@/utils/request";

const router = useRouter();
const userStore = useUserStore();

const logoUrl =
  "https://ai-public.mastergo.com/ai/img_res/43965504049514228edc70381e7cf6e1.jpg";

const brandBgUrl =
  "https://ai-public.mastergo.com/ai/img_res/74ff79e145e4e95927145d53d88c92e3.jpg";

const illustrationUrl =
  "https://ai-public.mastergo.com/ai/img_res/0c3b4d46b367f64b78dd9e30be1ba040.jpg";

const form = reactive({
  username: "",
  password: "",
});

const formRef = ref();

const handleLogin = async () => {
  try {
    await formRef.value.validate();
    try {
      const res = await request.post("/api/login", form);
      userStore.loginSuccess({
        token: res.data.token,
        username: form.username,
      });

      const redirect = router.currentRoute.value.query.redirect || "/home";
      router.push(redirect.toString());
    } catch (error) {
      console.error("登录失败", error);
    }
  } catch (error) {
    console.error(error);
  }
};
</script>
<style scoped>
.el-input :deep(.el-input__wrapper) {
  background-color: #f5f5f5;
  border: none;
  box-shadow: none !important;
}

.el-input :deep(.el-input__wrapper.is-focus) {
  border: 1px solid var(--theme-color);
  background-color: white;
}

.el-input :deep(.el-input__inner) {
  height: 42px;
}

.el-checkbox :deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background-color: var(--theme-color);
  border-color: var(--theme-color);
}

.el-checkbox :deep(.el-checkbox__input.is-checked + .el-checkbox__label) {
  color: var(--theme-color);
}

.el-button.el-button--success {
  border: none;
}

.el-button.el-button--success:focus {
  background-color: var(--theme-color);
}
</style>
