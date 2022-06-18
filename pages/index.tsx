import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div className='grid place-items-center h-screen w-full'>
      <Link href={"/mission"}>
        <a className='font-display text-black hover:text-primary text-4xl transition-colors'>Go to Mission Dashboard</a>
      </Link>
    </div>
  )
}

export default Home
