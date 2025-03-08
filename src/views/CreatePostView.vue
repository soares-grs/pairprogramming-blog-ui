<script lang="ts" setup>
import Editor from 'primevue/editor';
import { ref } from "vue";
import { InputText, Button } from 'primevue';
import { useToast } from 'primevue/usetoast';
import postService from '@/services/post-service';
import router from '@/router';

const toast = useToast();
const isLoading = ref(false);

const showSuccess = () => {
    toast.add({ severity: 'success', summary: 'Post publicado com sucesso', life: 3000 });
};

const showError = () => {
    toast.add({ severity: 'error', summary: 'Ocorreu um erro ao publicar o post', detail: 'Tente novamente mais tarde', life: 3000 });
};

const payload = ref({
    content: "",
    title: "",
    author: "Gabriel Soares"
});

const handleCreatePost = () => {
    isLoading.value = true;
    postService.create({
        title: payload.value.title,
        content: payload.value.content,
        author: payload.value.author,
    }).then(({data}) => {
        showSuccess();
    }).catch(() => {
        showError();
    }).finally(() => {
        clearPost();
        isLoading.value = false
        router.push('/');
    });
};

const clearPost = () => {
    payload.value = {
    content: "",
    title: "",
    author: "Gabriel Soares"
}
}

</script>

<template>
    <h1 class="text-3xl flex justify-center mt-4">Publicar Novo Post</h1>
    <div class="flex justify-center">
        <div class="flex flex-col gap-4 mt-8 w-7/12">
            <div>
                <p class="mb-2">Título</p>
                <InputText v-model="payload.title" class="w-full"/>
            </div>
            <Editor v-model="payload.content" editorStyle="height: 320px" />
            <Button :loading="isLoading" @click="handleCreatePost" :disabled="payload.content.length < 25 || payload.title.length < 4">Publicar</Button>
        </div>
    </div>
</template>

