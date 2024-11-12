import React from 'react'
import { Button } from '@radix-ui/themes';
import Link from 'next/link';

const ModulesPage = () => {
  return (
    <div>
      <Button><Link href='/modules/new'>New Module</Link></Button>
    </div>
  )
}

export default ModulesPage