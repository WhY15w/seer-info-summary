<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 py-8"
  >
    <Toaster
      richColors
      position="top-right"
      class="opacity-90"
    />

    <div class="mx-auto max-w-3xl px-4">
      <div v-if="loading">
        <SkeletonCard />
      </div>
      <!-- 用户信息卡片 -->
      <div
        v-else
        class="group relative"
      >
        <!-- 渐变背景装饰 -->
        <div
          class="absolute -inset-1 rounded-2xl opacity-30 blur transition-all duration-300 group-hover:opacity-50"
        ></div>

        <div
          class="relative rounded-2xl bg-white/80 p-6 shadow-xl transition-all duration-300 hover:shadow-2xl md:p-8"
        >
          <!-- 头像部分 -->
          <div
            class="mb-8 flex flex-col items-start gap-6 md:flex-row md:items-center"
          >
            <div class="relative">
              <div
                class="absolute inset-0 rounded-full bg-gradient-to-br from-blue-200 to-purple-300 opacity-50 blur"
              ></div>
              <img
                :src="userInfo.avatar"
                alt="用户头像"
                class="relative h-24 w-24 rounded-full border-2 border-white object-cover transition-all duration-300 hover:scale-105"
                @error="handleAvatarError"
              />
            </div>
            <div class="w-[calc(100%-10rem)]">
              <h1
                class="mb-2 flex items-center justify-between text-3xl font-bold text-gray-900"
              >
                <span>
                  {{ userInfo.username }}
                  <span class="ml-1 text-2xl">👋</span>
                </span>
                <span class="flex items-center gap-4">
                  <Button
                    @click="router.push('/')"
                    class="cursor-pointer"
                  >
                    <ArrowLeftIcon></ArrowLeftIcon>
                    返回
                  </Button>
                  <Button
                    @click="logOut"
                    class="cursor-pointer"
                  >
                    <LogOutIcon></LogOutIcon>
                    退出
                  </Button>
                </span>
              </h1>
              <span
                class="inline-block rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-1 text-sm font-medium text-white shadow-md"
              >
                {{ userInfo.role === 'user' ? '普通用户' : userInfo.role }}
              </span>
            </div>
          </div>

          <!-- 详细信息 -->
          <div class="space-y-6">
            <!-- 基础信息 -->
            <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div class="space-y-1">
                <label
                  class="flex items-center gap-1.5 text-sm font-medium text-gray-500"
                >
                  <MailIcon class="h-4 w-4"></MailIcon>
                  <span> 电子邮箱 </span>
                </label>
                <p class="text-lg font-semibold break-all text-gray-800">
                  {{ userInfo.email }}
                </p>
              </div>
              <div class="space-y-1">
                <label
                  class="flex items-center gap-1.5 text-sm font-medium text-gray-500"
                >
                  <CalendarCheck2Icon class="h-4 w-4"></CalendarCheck2Icon>
                  <span>注册时间</span>
                </label>
                <p class="text-lg text-gray-700">
                  {{ formatDate(userInfo.createdAt) }}
                </p>
              </div>
            </div>

            <!-- 订阅设置 -->
            <div class="space-y-2">
              <label
                class="mb-2 flex items-center gap-x-1.5 text-sm font-medium text-gray-500"
              >
                <SettingsIcon class="h-4 w-4"></SettingsIcon>
                <span>订阅设置</span>
              </label>
              <form
                @submit="onSubmit"
                class="space-y-4"
              >
                <FormField name="subscriptions">
                  <FormItem>
                    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <FormField
                        v-for="option in subscriptionOptions"
                        v-slot="{ value, handleChange }"
                        :key="option.id"
                        type="checkbox"
                        :value="option.id"
                        :unchecked-value="false"
                        name="subscriptions"
                      >
                        <FormItem
                          class="flex cursor-pointer items-start space-x-3 rounded-xl bg-gray-50/40 p-4 hover:bg-gray-100/80"
                        >
                          <FormControl>
                            <Checkbox
                              :model-value="value.includes(option.id)"
                              @update:model-value="handleChange"
                              class="mt-0.5 h-5 w-5 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                          </FormControl>
                          <div class="flex-1">
                            <FormLabel
                              class="block text-sm font-medium text-gray-700"
                            >
                              {{ option.label }}
                            </FormLabel>
                            <FormDescription class="mt-1 text-sm text-gray-500">
                              {{ option.description }}
                            </FormDescription>
                          </div>
                        </FormItem>
                      </FormField>
                    </div>
                    <FormMessage />
                  </FormItem>
                </FormField>

                <div class="mr-10 flex justify-around">
                  <Button
                    type="submit"
                    class="w-full cursor-pointer md:w-auto"
                    :loading="isSaving"
                  >
                    <SaveIcon></SaveIcon>
                    {{ isSaving ? '保存中...' : '保存订阅设置' }}
                  </Button>
                </div>
              </form>
            </div>

            <!-- 最后登录时间 -->
            <div
              class="mx-3 flex items-center justify-between border-t border-gray-400 pt-4"
            >
              <p class="flex items-center text-sm text-gray-500">
                <IdCardIcon class="mr-1.5 h-5 w-5"></IdCardIcon>
                <span>ID：{{ userInfo._id }}</span>
              </p>
              <p class="flex items-center text-sm text-gray-500">
                <LogInIcon class="mr-1.5 h-5 w-5"></LogInIcon>
                <span>
                  最后登录时间：{{ formatDate(userInfo.lastLogin) }}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import router from '@/router'
import { toast, Toaster } from 'vue-sonner'
import axios from '@/utils/axios'
import SkeletonCard from '@/components/public/skeleton/SkeletonCard.vue'

import Button from '@/components/ui/button/Button.vue'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'

import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import {
  SettingsIcon,
  MailIcon,
  CalendarCheck2Icon,
  IdCardIcon,
  LogInIcon,
  LogOutIcon,
  ArrowLeftIcon,
  SaveIcon,
} from 'lucide-vue-next'

// 状态管理
const token = ref(localStorage.getItem('token'))
const userInfo = ref({
  username: '',
  avatar: '',
  email: '',
  bio: '',
  role: 'user',
  createdAt: '',
  lastLogin: '',
  subscriptions: [],
})
const loading = ref(true)
const isSaving = ref(false)

// 订阅选项
const subscriptionOptions = ref([
  { id: 'bilibili', label: '官方动态', description: '赛尔号B站图文动态' },
  { id: 'lxy', label: '雷小伊', description: '雷小伊相关软件更新订阅 (推荐)' },
  { id: 'cj', label: '重聚系列', description: '重聚相关软件更新订阅 (推荐)' },
  {
    id: 'plugin',
    label: '插件中心',
    description: '重聚系列DLL插件扩展更新订阅',
  },
])

// 表单 schema
const subscriptionSchema = toTypedSchema(
  z.object({
    subscriptions: z.array(z.string()),
  }),
)

// 初始化表单
const { handleSubmit, setValues } = useForm({
  validationSchema: subscriptionSchema,
  initialValues: {
    subscriptions: [],
  },
})

// 提交订阅设置
const onSubmit = handleSubmit(async (values) => {
  try {
    isSaving.value = true
    const { data } = await axios.post('/user/updateSubscriptions', {
      subscriptions: values.subscriptions,
    })

    if (data.code === 0) {
      toast.success('订阅设置已保存')
      userInfo.value.subscriptions = data.data.subscriptions
    } else {
      toast.error(data.msg || '保存失败')
    }
  } catch (error) {
    toast.error('保存失败，请稍后重试')
  } finally {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    isSaving.value = false
  }
})

// 获取用户信息
const getUserInfo = async () => {
  try {
    loading.value = true
    const { data } = await axios.get('/user/getUserInfo')
    if (data.code === 0) {
      userInfo.value = {
        subscriptions: data.data.subscriptions || [],
        ...data.data,
      }
      setValues({ subscriptions: userInfo.value.subscriptions }) // 同步表单值
      // 处理默认头像
      if (!userInfo.value.avatar) {
        const basePath = import.meta.env.BASE_URL
        userInfo.value.avatar = basePath + '/img/avatar/defaultavatar.png'
      }
    } else {
      toast.error(data.msg || '获取用户信息失败')
    }
  } catch (error) {
    toast.error('获取用户信息失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

// 处理头像加载失败
const handleAvatarError = (e) => {
  const basePath = import.meta.env.BASE_URL
  e.target.src = basePath + '/img/avatar/defaultavatar.png'
}

// 日期格式化方法
const formatDate = (isoString) => {
  if (!isoString) return '未知时间'
  const date = new Date(isoString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// 退出登录
const logOut = async () => {
  try {
    localStorage.removeItem('token')
    toast.success('退出登录成功')
    await new Promise((resolve) => setTimeout(resolve, 1500))
    router.push('/auth/login')
  } catch (error) {
    toast.error('退出失败，请稍后重试')
  }
}

// 生命周期钩子
onMounted(() => {
  if (!token.value) {
    router.push('/auth/login')
  } else {
    getUserInfo()
  }
})
</script>
