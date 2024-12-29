import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div className='grid place-content-center gap-4 text-center h-screen w-full font-display'>
      <h1 className='text-4xl'>Ninja Clan Manager</h1>
      <h2 className='text-2xl'>{"It's all under construction. ALL OF IT!"}</h2>
      <Link 
        href="/mission"
        className='text-black hover:text-primary text-4xl transition-colors'
      >
        {">> Go to Mission Dashboard <<"}
      </Link>
    </div>
  )
}

export default Home
