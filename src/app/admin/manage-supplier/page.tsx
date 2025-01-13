import AdminTableSupplier from '@/components/admin/admin-table-supplier'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Suspense } from 'react'

const ManageResource = () => {
  return (
    <div className='p-16'>
      <div className='flex justify-between items-center pb-6'>
         <h1 className='text-2xl font-medium text-primary-one'>Manage Supplier</h1>
         <Button className='px-4 dark:bg-blue-400' asChild>
          <Link href='/admin/manage-supplier/add-supplier'>Add Supplier</Link>
         </Button>
      </div>
      <Suspense fallback={<p>Loading Project table...</p>}>
      <AdminTableSupplier />
      </Suspense>
    </div>
  )
}

export default ManageResource