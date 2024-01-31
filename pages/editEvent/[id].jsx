import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import EditEventForm from '@/components/EditEventForm';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"; 

const EditEvent = () => {
  const [singleEvent, setSingleEvent] = useState({});
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { id } = router.query;

useEffect(() => {
  const getEventById = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/api/events/${id}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch event");
      }
      const { event } = await res.json();
      setSingleEvent(event);
      
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

        getEventById(id);
    }, [id]);

 
  return (
    <>
       {loading && <Loader 
            type="Puff"
            color="#00BFFF"
            height={100} 
            width={100} 
            timeout={3000}  
            style={{position: 'absolute',  top: '50%', left: '50%', tranform: 'translate(-50%, -50%)', zIndex: '100'}}
            /> 
      }
      <EditEventForm event={singleEvent} />
    </>
    
    )
}
export default EditEvent;