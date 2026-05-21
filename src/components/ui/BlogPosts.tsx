import { BlogPost } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import NewTab from './NewTab';

export default function BlogPosts ({ posts }: { posts: BlogPost[] }) {
  return (
    <ul className='grid-container grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
      {posts.map(({ title, url, date, snippet, imageUrl }) => (
        <li key={date}>
          <Link
            className='card h-full card-link-hover-style card-link-active-style card-reset-focus'
            href={url as string}
            target='_blank'
            rel='noopener noreferrer'
          >
            <figure className='post-container'>
              <div className='relative w-full aspect-[4/3]'>
                <Image src={imageUrl as string} fill alt='' className='object-cover' sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw" />
              </div>
              <figcaption>
                <span className='card-caption'>{title}<NewTab /></span>
                <span className='block'>{snippet}</span>
              </figcaption>
            </figure>
          </Link>
        </li>
      ))}
    </ul>
  )
}
