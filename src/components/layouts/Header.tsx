'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useSpyElem } from '@/hook/useSpy';
import ThemeSwitch from '@/components/layouts/theme/Switch';
import { cn } from '@/lib/utils';
import { Github } from 'lucide-react';
import { RESUME_DATA } from '@/data/resume-data';
import { TransitionLink } from '../common/TransitionLink';

const navList = [
  { name: 'Bobong', href: '//'},
  { name: 'Posts', href: '/blog'},
  { name: 'About', href: '/about' },
];


export const Header = () => {
  const { ref, marginTop } = useSpyElem(65);
  const pathname = usePathname();
  return (
    <nav
      style={{ marginTop }}
      ref={ref}
      className='dark:bg-black bg-slate-400 sticky top-0 z-40 bg-opacity-30 dark:bg-opacity-20 backdrop-blur-sm flex w-full flex-col items-center justify-center shadow-sm print:hidden '
    >
      <div className='flex h-[50px] w-full max-w-[1200px] items-center justify-between px-4'>
        <div className='flex items-center font-medium'>
          {navList.map((navItem) => (
            <TransitionLink
              href={navItem.href}
              key={navItem.name}
          >
              <div className={cn(
                'rounded-full px-4 text-center text-sm transition-colors hover:text-primary',
                pathname?.startsWith(navItem.href)
                  ? 'bg-muted font-medium text-primary'
                  : 'text-muted-foreground'
              )}>
                {navItem.name}
              </div>
            </TransitionLink>
          ))}
        </div>

        <div className='flex gap-3'>
          <ThemeSwitch />
          <Button asChild variant='ghost' size='icon'>
            <Link href={RESUME_DATA.contact.social[0].url} target='_blank'>
              <Github className='size-[1.2rem]' />
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};
