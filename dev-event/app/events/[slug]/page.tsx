import { notFound } from 'next/navigation';
import Image from 'next/image';
import React from 'react'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const EventDetailItem = ({ icon, alt, label }: { icon: string, alt: string, label: string }) => (
  <div className="flex-row-gap-2 items-center">
    <Image src={icon} alt={alt} width={24} height={24} />
    <p>{label}</p>
  </div>
)

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => (
  <div className="agends">
    <h2>Agenda</h2>
    <ul>{agendaItems.map((item) => (
      <li key={item}>{item}</li>
    ))}</ul>
  </div>
)

const EventTags = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-row gap-1.5 flex-wrap">
    
      {tags.map((tag) => ( 
        <div className='pill' key={tag}>{tag}</div>
      ))}
    
    </div>
)

const EventsDetailPage = async ({ params }: { params: Promise<{ slug: string }> }) => {

  const { slug } = await params;
  const request = await fetch(`${BASE_URL}/api/events/${slug}`);
  const { event: { description, image, date, time, overview, agenda, location, mode, audience, tags, organizer } } = await request.json();

  if (!description) return notFound()

  return (
    <section id="event">
      <div className="header">
        <h1>Event Description</h1>
        <p>{description}</p>
      </div>
      <div className="details">
        {/* Left Side - Event Content */}
        <div className='content'>
          <Image src={image} alt="Event Banner" width={800} height={800} className='banner' />
          <section className="flex-col-gap-2">
            <h2>Overview</h2>
            <p>{overview}</p>
          </section>

          <section className="flex-col-gap-2">
            <h2>Event Details</h2>
            <EventDetailItem icon="/icons/calendar.svg" alt="calender" label={date.split('T')[0]} />
            <EventDetailItem icon="/icons/clock.svg" alt="clock" label={time} />
            <EventDetailItem icon="/icons/pin.svg" alt="pin" label={location} />
            <EventDetailItem icon="/icons/mode.svg" alt="mode" label={mode} />
            <EventDetailItem icon="/icons/audience.svg" alt="auidence" label={audience} />
          </section>
          <EventAgenda agendaItems={JSON.parse(agenda[0])}/>
          <section className="flex-gap-clo-2">
            <h2>About The Organizer</h2>
            <p>{organizer}</p>
          </section>
          <EventTags tags={JSON.parse(tags[0])}/>
        </div>
        {/* Right Side - Booking Content */}
        <aside className="booking">
          <p className='text-lg font-semibold'>Book Event</p>
        </aside>
      </div>
    </section>
  )
}

export default EventsDetailPage