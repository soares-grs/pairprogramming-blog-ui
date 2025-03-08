<script setup lang="ts">
import postService from '@/services/post-service';
import dateUtils from '@/utils/date.utils';
import { Card, Button } from 'primevue';
import { onMounted, ref } from 'vue';

type Post = {
  id: string,
  title: string,
  content: string,
  createdAt: string,
}

const posts = ref<Post[]>([]);

onMounted(() => {
  postService.getAll()
    .then(({ data }) => {
      posts.value = data;
    })
})

</script>

<template>
  <header class="flex mt-8 justify-between items-center w-full max-w-5xl mx-auto">
    <h1 class="text-3xl text-center font-press-start">PairProgramming Blog</h1>
    <Button @click="$router.push('/create-post')" icon="pi pi-plus" label="Novo Post" class="ml-auto"></Button>
  </header>
  <main class="flex justify-center">
    <section class="grid grid-cols-2 gap-y-10 mt-20 gap-x-12 w-full max-w-5xl">
      <Card class="w-full" v-for="post in posts">
        <template #title><h2 class="text-2xl">{{ post.title }}</h2></template>
        <template #content>
          <div v-html="post.content"></div>
        </template>
        <template #footer>
          <section class="flex justify-between items-center">
            <div>
              <small class="text-gray-300">Criado em {{ dateUtils.formatDateTime(post.createdAt) }}</small>
            </div>
            <div class="flex justify-end gap-4">
              <!-- <i class="pi pi-heart text-red-400 cursor-pointer" style="font-size: 1.2rem" v-tooltip.top="'Curtir'"></i> -->
              <i class="pi pi-eye text-green-300 400 cursor-pointer" style="font-size: 1.2rem"
                v-tooltip.top="'Ver mais'"></i>
            </div>
          </section>
        </template>
      </Card>
    </section>
  </main>
</template>
