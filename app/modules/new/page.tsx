'use client';
import React from 'react'
import { TextField, TextArea, Button } from '@radix-ui/themes'

const NewModulePage = () => {
  return (
    <div className='max-w-xl space-y-4'>
        <TextField.Root placeholder='Title'>
        </TextField.Root>
        <TextArea placeholder="Write description..." />
        <Button>Create New Issue</Button>
    </div>
  )
}

export default NewModulePage