import type { NextPage } from 'next';
import KakaoMap from '../components/KakaoMap';

const Home: NextPage = () => {
  return (
    <div className="flex ">
      <main className="absolute w-screen h-screen left-0 top-0 overflow-hidden">
        <KakaoMap />aa
      </main>
    </div>
  );
};

export default Home;