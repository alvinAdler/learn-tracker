import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='layout-wrapper bg-[var(--var-dark)] flex justify-center'>
      <div className='max-w-[100rem] w-full mx-auto px-4'>
        <Outlet/>
      </div>
    </div>
  )
}

export default Layout