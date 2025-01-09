import AdminTableResource from '@/components/admin/admin-table-resource'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Suspense } from 'react'

const ManageResource = () => {
  return (
    <div className='p-16'>
      <div className='flex justify-between items-center pb-6'>
         <h1 className='text-2xl font-medium text-primary-one'>Manage Resource</h1>
         <Button className='px-4 dark:bg-blue-400' asChild>
          <Link href='/admin/manage-resource/add-resource'>Add Resource</Link>
         </Button>
      </div>
      <Suspense fallback={<p>Loading Project table...</p>}>
      <AdminTableResource />
      </Suspense>
    </div>
  )
}

export default ManageResource