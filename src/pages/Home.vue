<script setup>
import { inject, onMounted, ref } from 'vue';
import MyButton from '@/components/MyButton.vue';
import MyInput from '@/components/MyInput.vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const local_items = inject('local_items');
const items = ref({});
const todo = ref('');
const edit = ref({
    todo: '',
    index: null,
    status: null
});

onMounted(() => {
    //asign the value of local storage data
    items.value = local_items.value;
});

const addTodo = () => {
    //add todo list
    items.value.pending.push(todo.value);
    local_items.value = items.value; //update the local storage values
    todo.value = '';
    toast("Todo list Added", {
        autoClose: 1000,
    });
}

const doneTodo = (index) => {
    items.value.done.push(items.value.pending[index])
    items.value.pending.splice(index, 1);
    local_items.value = items; //update the local storage values
    toast("Todo Completed", {
        autoClose: 1000,
    });
}

const removeTodo = (status, index) => {
    items.value[status].splice(index, 1);
    local_items.value= items.value; //update the local storage values
    toast("Todo Deleted !", {
        autoClose: 1000,
    });
}

const editTodo = (status, index) => {
    //show the edit input of todo list
    edit.value.todo = items.value[status][index];
    edit.value.index = index;
    edit.value.status = status;
}

const saveTodo = () => {
    if (edit.value.todo == '') {
        toast("Todo must not be empty !", {
            autoClose: 1000,
        });
        return
    }
    items.value[edit.value.status][edit.value.index] = edit.value.todo;
    // reset values edit todo
    edit.value.todo = '';
    edit.value.status = null;
    edit.value.index = null;
    local_items.value = items.value; //update the local storage values
    toast("Saved !", {
        autoClose: 1000,
    });
}
</script>
<template>
    <div class="flex items-center justify-center bg-teal-lightest font-sans">
        <div class="max-w-7xl md:w-8/12 w-full">
            <div class="flex mt-4 w-full md:w-1/2 ml-4">
                <MyInput v-model="todo" class="w-full mr-1" placeholder="Add Todo" />
                <MyButton @click="addTodo()" :disabled="todo == ''">Add</MyButton>
            </div>
            <div class="grid grid-cols-6 gap-1">
                <div class="md:col-span-3 col-span-6 bg-white rounded shadow p-6 m-4 w-full">
                    <div class="mb-4">
                        <h1 class="text-grey-darkest">Todo List</h1>
                    </div>
                    <div>
                        <template v-for="(item, index) in items.pending">
                            <MyInput v-model="edit.todo" v-if="edit.index == index && edit.status == 'pending'" class="w-full mr-1 mb-1" placeholder="Add Todo" />
                            <div v-else class="w-full text-grey-darkest p-2 mb-1 border rounded">{{ item }}</div>
                            <div class="flex justify-between mb-4 items-center">
                                <MyButton class="px-2 py-1 text-sm bg-red-500" @click="removeTodo('pending', index)">Remove</MyButton>
                                <div class="flex gap-1">
                                    <MyButton class="px-2 py-1 text-sm" v-if="edit.index == index && edit.status == 'pending'" @click="saveTodo()">save</MyButton>
                                    <MyButton class="px-2 py-1 text-sm" v-else @click="editTodo('pending', index)">Edit</MyButton> 
                                    <MyButton class="px-2 py-1 text-sm bg-green-500" @click="doneTodo(index)">Done</MyButton>                            
                                </div>
                            </div>
                        </template>
                    </div>
                </div>

                <div class="md:col-span-3 col-span-6 bg-white rounded shadow p-6 m-4 w-full">
                    <div class="mb-4">
                        <h1 class="text-grey-darkest">Completed List</h1>
                    </div>
                    <div>
                        <template v-for="(item, index) in items.done">
                            <MyInput v-model="edit.todo" v-if="edit.index == index && edit.status == 'done'" class="w-full mr-1 mb-1" placeholder="Add Todo" />
                            <div v-else class="w-full text-grey-darkest p-2 mb-1 border rounded">{{ item }}</div>
                            <div class="flex justify-between mb-4 items-center">
                                <MyButton class="px-2 py-1 text-sm bg-red-500" @click="removeTodo('done', index)">Remove</MyButton>
                                <div class="flex gap-1">
                                    <MyButton class="px-2 py-1 text-sm" v-if="edit.index == index && edit.status == 'done'" @click="saveTodo()">save</MyButton>
                                    <MyButton class="px-2 py-1 text-sm" v-else @click="editTodo('done', index)">Edit</MyButton>                           
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>