import React from 'react'
import ExploreBtn from "./components/ExploreBtn"
import EventCard from './components/EventCard'
import { events } from '../lib/constants'

const page = () => {
  return (
    <section>
      <h1 className='text-center'>The Hub for Every Dev <br />Event You Can't Miss</h1>
      <p className='text-center mt-5'>Hackathons, Meetups and Conferences all in one place</p>
      <ExploreBtn />
      <div className="mt-20 space-y-7">
        <h3>Features Evens</h3>
        <ul className='events list-none'>
          {events.map((event) => (
            <li key={event.title}>
              <EventCard {...event} />
            </li>

          ))}
        </ul>
      </div>
    </section>
  )
}

export default page