'use client';
import { TextField, TextArea, Button } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const NewModulePage = () => {
  return (
    <div className='max-w-xl space-y-4'>
        <TextField.Root placeholder='Title'>
        </TextField.Root>
        <SimpleMDE placeholder="Write description..." />
        <Button>Create New Issue</Button>
    </div>
  )
}

export default NewModulePage