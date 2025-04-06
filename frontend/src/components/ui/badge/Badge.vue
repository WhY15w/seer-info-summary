<script setup>
import { cn } from '@/lib/utils';
import { Primitive } from 'reka-ui';
import { computed } from 'vue';
import { badgeVariants } from '.';

const props = defineProps({
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  variant: { type: null, required: false },
  class: { type: null, required: false },
});

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <Primitive
    data-slot="badge"
    :class="cn(badgeVariants({ variant }), props.class)"
    v-bind="delegatedProps"
  >
    <slot />
  </Primitive>
</template>
