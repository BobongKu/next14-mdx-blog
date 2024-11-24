import { Metadata } from 'next';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import * as D from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Section } from '@/components/ui/section';
import { Award, GlobeIcon, MailIcon } from 'lucide-react';
import { RESUME_DATA } from '@/data/resume-data';
import Particles from '@/components/ui/particles';
import Link from 'next/link';



export function generateMetadata(): Metadata {
  return {
    title: `${RESUME_DATA?.name} | About`,
    description: RESUME_DATA?.summary,
  };
}

export default async function AboutPage() {
  return (
    <main className='container relative mx-auto scroll-my-12 overflow-auto p-6 sm:p-9 md:p-16 print:p-12 print:pt-0'>
      <Section className='mx-auto w-full max-w-2xl space-y-8 print:space-y-4'>
        <div className='flex flex-col-reverse items-center justify-between gap-4 sm:flex-row'>
          <div className='flex-1 space-y-1.5 text-center sm:text-start'>
            <h1 className='mb-4 text-3xl font-bold'>{RESUME_DATA?.name}</h1>
            <p className='max-w-md text-pretty text-muted-foreground print:text-[12px]'>
              {RESUME_DATA?.about}
            </p>
            <p className='max-w-md items-center text-pretty text-sm text-muted-foreground'>
              <a
                className='inline-flex items-center gap-x-1.5 align-baseline leading-none hover:underline'
                href={RESUME_DATA?.locationLink}
                target='_blank'
              >
                <GlobeIcon className='size-3' />
                {RESUME_DATA?.location}
              </a>
            </p>
            <div className='flex justify-center gap-x-2 pt-1 text-sm text-muted-foreground sm:justify-start print:hidden'>
              {RESUME_DATA?.contact.social.map((social) => (
                <Button key={social.name} className='size-8' variant='outline' size='icon' asChild>
                  <a href={social.url} target='_blank'>
                    <social.icon className='size-4' />
                  </a>
                </Button>
              ))}
              {RESUME_DATA?.contact.email && (
                <D.Dialog>
                  <D.DialogTrigger>
                    <Button className='size-8' variant='outline' size='icon' asChild>
                      <MailIcon className='size-4' />
                    </Button>
                  </D.DialogTrigger>
                  <D.DialogContent className='max-w-[300px]'>
                    <D.DialogHeader>
                      <D.DialogTitle className='p-0'>Email Address</D.DialogTitle>
                      <D.DialogDescription></D.DialogDescription>
                    </D.DialogHeader>
                    <div className='flex items-center space-x-2'>
                      <div className='grid flex-1 gap-2'>
                        <label htmlFor='link' className='sr-only'>
                          Link
                        </label>
                        <Input id='link' defaultValue={RESUME_DATA?.contact.email} readOnly />
                      </div>
                    </div>
                  </D.DialogContent>
                </D.Dialog>
              )}
            </div>
            <div className='hidden flex-col gap-x-1 text-sm text-muted-foreground print:flex print:text-[12px]'>
              {RESUME_DATA?.contact.email && (
                <a href={`mailto:${RESUME_DATA?.contact.email}`}>
                  <span className='underline'>{RESUME_DATA?.contact.email}</span>
                </a>
              )}
            </div>
          </div>

          <Avatar className='size-28'>
            <AvatarImage alt={RESUME_DATA?.name} src={RESUME_DATA?.avatarUrl} />
            <AvatarFallback>{RESUME_DATA?.initials}</AvatarFallback>
          </Avatar>
        </div>
        <Section>
          <h2 className='text-2xl font-bold'>About</h2>
          <p className='text-pretty leading-8 text-muted-foreground print:text-[12px]'>
            {RESUME_DATA?.summary}
          </p>
        </Section>
        <Section>
          <h2 className='text-2xl font-bold'>My Team</h2>
          <p className='text-pretty leading-8 text-muted-foreground print:text-[12px]'>
            {RESUME_DATA?.team}
          </p>
        </Section>
        <Section>
          <h2 className='text-2xl font-bold'>Skills</h2>
          <div className='flex flex-wrap gap-1'>
            {RESUME_DATA?.skills.map((skill) => (
              <Badge className='print:text-[10px]' key={skill}>
                {skill}
              </Badge>
            ))}
          </div>
        </Section>
        <Section>
          <h2 className='text-2xl font-bold'>Awards</h2>
            {RESUME_DATA?.awards.map((award)=>(
              <li key={award} className='text-pretty leading-8 text-muted-foreground print:text-[12px]'>
                {award}
              </li>
            ))}
        </Section>
        <Section>
          <h2 className='text-2xl font-bold'>Bucket List</h2>
            {RESUME_DATA?.bucketlist.map((bucketlist)=>(
              <li key={bucketlist} className='text-pretty leading-8 text-muted-foreground print:text-[12px]'>
                {bucketlist}
              </li>
            ))}
        </Section>
      </Section>
      <Section>
        <div className='p-10 flex items-center justify-center'>
            <Link href={RESUME_DATA?.oldLink} className='underline text-gray-400 hover:text-black dark:hover:text-white'>
              (구)Bobonb.blog
            </Link>
        </div>
      </Section>
    </main>
  );
}
