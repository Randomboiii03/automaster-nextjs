'use client';
import { TextField, TextArea, Button } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from 'react-hook-form';
import "easymde/dist/easymde.min.css";
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface ModuleForm {
    title: string;
    description: string;
}

const NewModulePage = () => {
    const router = useRouter();

    const {register, control, handleSubmit} = useForm<ModuleForm>();

  return (
    <form 
    className='max-w-xl space-y-4' 
    onSubmit={handleSubmit(async (data) => { 
        await axios.post('/api/modules', data);
        router.push('/modules');
    })}>
        <TextField.Root placeholder='Title' {...register('title')}>
        </TextField.Root>
        <Controller
            name="description"
            control={control}
            render={({ field }) => <SimpleMDE placeholder="Write description..." {...field}/> }
         />
        <Button>Create New Issue</Button>
    </form>
  )
}

export default NewModulePage