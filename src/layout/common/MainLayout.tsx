import AdminFooter from '@/components/admin/AdminFooter'
import AdminNavbar from '@/components/admin/AdminNavbar'
import AdminSidebar from '@/components/admin/AdminSidebar'

const MainLayout = function ({
  children,
  isFooter = true,
}: Readonly<{ children: React.ReactNode; isFooter: boolean }>) {
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <AdminNavbar />
      <div className="flex items-start pt-16">
        <AdminSidebar />
        <MainContent isFooter={isFooter}>{children}</MainContent>
      </div>
    </div>
  )
}

const MainContent = function ({
  children,
  isFooter,
}: {
  children: React.ReactNode
  isFooter: boolean
}) {
  return (
    <main className="relative h-full w-full overflow-y-auto bg-gray-50 dark:bg-gray-900 lg:ml-64">
      {children}
      {isFooter && (
        <div className="mx-4 mt-4">
          <AdminFooter />
        </div>
      )}
    </main>
  )
}

export default MainLayout
