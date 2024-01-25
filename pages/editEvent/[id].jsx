import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import EditEventForm from '@/components/EditEventForm';




const EditEvent = () => {
  const [singleEvent, setSingleEvent] = useState({});

  const router = useRouter();
  const { id } = router.query;

useEffect(() => {
  const getEventById = async (id) => {
    try {
      const res = await fetch(`http://localhost:3001/api/events/${id}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch event");
      }
      const { event } = await res.json();
      setSingleEvent(event);
      // return res.json();
    } catch (error) {
      console.log(error);
    }
  };

        getEventById(id);
    }, [id]);

 
  return (
    <EditEventForm event={singleEvent} />
    )
}
export default EditEvent;