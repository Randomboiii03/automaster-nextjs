'use client';
import { TextField, Callout, Button } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from 'react-hook-form';
import "easymde/dist/easymde.min.css";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CiCircleInfo } from "react-icons/ci";

interface ModuleForm {
    title: string;
    description: string;
}

const NewModulePage = () => {
    const router = useRouter();
    const {register, control, handleSubmit} = useForm<ModuleForm>();
    const [error, SetError] = useState('');

  return (
    <div className='max-w-xl'>
        { error && <Callout.Root color='red' className='mb-5'>
            <Callout.Icon>
                <CiCircleInfo />
            </Callout.Icon>
            <Callout.Text>
                You will need admin privileges to install and access this application.
            </Callout.Text>
        </Callout.Root>}
        <form 
        className='max-w-xl space-y-4' 
        onSubmit={handleSubmit(async (data) => { 
            try {
                await axios.post('/api/modules', data);
                router.push('/modules');
            } catch (error) {
                SetError('An unexpected error occured.');
            }
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
    </div>
  )
}

export default NewModulePage