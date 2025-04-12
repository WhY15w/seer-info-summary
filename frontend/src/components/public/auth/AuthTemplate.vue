<template>
  <MainTemplate>
    <template #main>
      <div
        class="flex h-[85vh] items-center justify-center pt-8 sm:px-6 lg:px-8"
      >
        <div class="w-full max-w-md">
          <div
            class="rounded-lg bg-white/80 px-6 py-8 shadow-2xl ring-1 ring-black/5 backdrop-blur-sm dark:bg-gray-800/95 dark:ring-white/10"
          >
            <h1
              class="animate-gradient mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-center text-3xl font-bold tracking-tight text-transparent sm:text-4xl"
            >
              欢迎{{ typeMap[type] }}
            </h1>

            <form
              @submit="onSubmit"
              class="space-y-4"
            >
              <!-- 用户名 -->
              <FormField
                v-slot="{ componentField }"
                name="username"
              >
                <FormItem>
                  <FormLabel>账号</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="请输入账号"
                      v-bind="componentField"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <!-- 密码 -->
              <FormField
                v-if="type !== 'recover'"
                v-slot="{ componentField }"
                name="password"
              >
                <FormItem>
                  <FormLabel>密码</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="请输入密码"
                      v-bind="componentField"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <!-- 邮箱 -->
              <FormField
                v-if="['register', 'recover'].includes(type)"
                v-slot="{ componentField }"
                name="email"
              >
                <FormItem>
                  <FormLabel>邮箱</FormLabel>
                  <div class="flex gap-2">
                    <FormControl class="flex-1">
                      <Input
                        type="email"
                        placeholder="请输入邮箱"
                        v-bind="componentField"
                      />
                    </FormControl>
                    <Button
                      type="button"
                      @click="sendEmailCaptcha"
                      class="bg-gradient-to-r from-blue-500 to-purple-500"
                      :disabled="isSending"
                    >
                      {{ isSending ? `${countdown}s` : '发送验证码' }}
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              </FormField>

              <!-- 邮箱验证码 -->
              <FormField
                v-if="['register', 'recover'].includes(type)"
                v-slot="{ componentField }"
                name="emailCode"
              >
                <FormItem>
                  <FormLabel>邮箱验证码</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="请输入邮箱验证码"
                      v-bind="componentField"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <!-- 图形验证码 -->
              <FormField
                v-slot="{ componentField }"
                name="captcha"
              >
                <FormItem>
                  <FormLabel>验证码</FormLabel>
                  <div class="flex gap-3">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="请输入验证码"
                        v-bind="componentField"
                      />
                    </FormControl>
                    <img
                      :src="captchaSrc"
                      @click="loadCaptcha"
                      class="h-10 w-30 cursor-pointer rounded-md"
                      alt="验证码"
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              </FormField>

              <!-- 新密码 -->
              <template v-if="type === 'recover'">
                <FormField
                  v-slot="{ componentField }"
                  name="newPwd"
                >
                  <FormItem>
                    <FormLabel>新密码</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="请输入新密码"
                        v-bind="componentField"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>

                <FormField
                  v-slot="{ componentField }"
                  name="confirmPwd"
                >
                  <FormItem>
                    <FormLabel>确认密码</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="请确认新密码"
                        v-bind="componentField"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
              </template>

              <!-- 操作链接 -->
              <div class="flex justify-between pt-2 text-sm">
                <RouterLink
                  v-if="type === 'login'"
                  to="/auth/recover"
                  class="text-blue-500 hover:text-blue-600 hover:underline"
                >
                  找回密码
                </RouterLink>
                <RouterLink
                  v-if="type === 'login'"
                  to="/auth/register"
                  class="text-blue-500 hover:text-blue-600 hover:underline"
                >
                  注册账号
                </RouterLink>
                <RouterLink
                  v-if="['register', 'recover'].includes(type)"
                  to="/auth/login"
                  class="text-blue-500 hover:text-blue-600 hover:underline"
                >
                  前往登录
                </RouterLink>
              </div>

              <Button
                type="submit"
                class="mt-6 h-10 w-full bg-gradient-to-r from-sky-600 to-pink-500 text-lg text-white/90 hover:opacity-90"
              >
                {{ typeMap[type] }}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </template>
  </MainTemplate>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from '@/utils/axios'
import MainTemplate from '../MainTemplate.vue'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'vue-sonner'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'

const route = useRoute()
const router = useRouter()

// props
const props = defineProps({
  type: {
    type: String,
    default: 'login',
  },
})
// emits
const emit = defineEmits(['submitFunc'])

// 类型映射
const typeMap = {
  login: '登录',
  register: '注册',
  recover: '找回',
}

// 当前类型
const type = computed(() => props.type)

// 验证码状态
const captchaSrc = ref('')
const captchaId = ref('')
const emailCodeId = ref('')

// 邮箱验证码发送状态
const isSending = ref(false)
const countdown = ref(0)

// 动态表单校验规则
const formSchema = computed(() => {
  const baseSchema = z.object({
    username: z.string().min(2).max(50),
    captcha: z.string().length(4),
  })

  if (type.value === 'login') {
    return baseSchema.extend({
      password: z.string().min(6).max(50),
    })
  }

  if (type.value === 'register') {
    return baseSchema.extend({
      email: z.string().email('无效的邮箱格式'),
      emailCode: z.string().length(6, '邮箱验证码必须为6位'),
      password: z.string().min(6).max(50),
    })
  }

  if (type.value === 'recover') {
    return baseSchema
      .extend({
        email: z.string().email('无效的邮箱格式'),
        emailCode: z.string().length(6, '邮箱验证码必须为6位'),
        newPwd: z.string().min(6).max(50),
        confirmPwd: z.string(),
      })
      .refine((data) => data.newPwd === data.confirmPwd, {
        message: '两次密码输入不一致',
        path: ['confirmPwd'],
      })
  }

  return baseSchema
})

const { handleSubmit, resetForm } = useForm({
  validationSchema: toTypedSchema(formSchema.value),
})

// 加载验证码
const loadCaptcha = async () => {
  try {
    const response = await axios.get('/captcha', {
      responseType: 'blob',
    })
    captchaSrc.value = URL.createObjectURL(response.data)
    captchaId.value = response.headers['captchaid']
  } catch (error) {
    toast.error('验证码加载失败')
  }
}

// 发送邮箱验证码
const sendEmailCaptcha = async () => {
  const email = document.querySelector('input[name="email"]')?.value
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    toast.error('请输入有效的邮箱地址')
    return
  }

  try {
    isSending.value = true
    countdown.value = 60
    const interval = setInterval(() => {
      if (countdown.value <= 0) {
        clearInterval(interval)
        isSending.value = false
        return
      }
      countdown.value--
    }, 1000)

    const response = await axios.post('/email/sendMailCaptcha', { email })
    emailCodeId.value = response.data.data.uuid
    toast.success('验证码已发送，十分钟内有效')
  } catch (error) {
    toast.error('验证码发送失败')
    isSending.value = false
    countdown.value = 0
  }
}

// 表单提交
const onSubmit = handleSubmit(async (values) => {
  try {
    const payload = {
      ...values,
      captchaID: captchaId.value,
      emailCodeId: emailCodeId.value,
    }

    // 根据类型调用不同接口
    let url = '/auth/login'
    if (type.value === 'register') url = '/auth/register'
    if (type.value === 'recover') url = '/auth/recoverpwd'

    const { data } = await axios.post(url, payload)
    if (data.code === 0) {
      toast.success(`${typeMap[type.value]}成功`)
      // 如果类型是login, 将token写入localStorage
      if (type.value === 'login') {
        localStorage.setItem('token', data.data.token)
      }
      // 延迟
      await new Promise((resolve) => setTimeout(resolve, 1500))
    } else {
      toast.error(data.msg)
      loadCaptcha()
      return
    }
    router.push(type.value === 'register' ? '/auth/login' : '/')
  } catch (error) {
    toast.error(error.response?.data?.msg || '操作失败')
    loadCaptcha()
  }
})

// 监听路由变化重置表单
watch(
  () => route.path,
  () => {
    resetForm()
    loadCaptcha()
  },
  { immediate: true },
)
</script>
