import Hscroll from '../components/Hscoll';
import Image from 'next/image';

export default function Marquee() {
  const logos = [
    '/logos/nike.png',
    '/logos/prada.png',
    '/logos/versace.png',
    '/logos/gucci.png',
    '/logos/burberry.png',
    '/logos/lv.png',
  ];

  return (
    <Hscroll speed={30}>
      {logos.map((logo, index) => (
        <div key={index} className="flex items-center justify-center min-w-[150px]">
          <Image
            src={logo}
            alt={`Brand ${index}`}
            width={100}
            height={100}
            className="brand-logo"
          />
        </div>
      ))}
    </Hscroll>
  );
}
