"use client";

import { useRouter } from "next/navigation";
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';

export default function RemoveBtn({ id }) {
  const router = useRouter();

    const handleConfirmation = async (event) => {
       event.preventDefault();
    const res = await fetch(`http://localhost:3000/api/events?id=${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      toast.success("Event deleted");
      router.push("/");
    }
  };

  const removeEvent = () => {
    toast.info(
      <div>
        <p>Are you sure?</p>
            <button onClick={(event) => handleConfirmation(event)} style={{ width: '60px', height: '35px', border: '1px black solid', borderRadius: '5px', fontSize: '14px' }}>
                Yes
            </button>
      </div>,
    );
  };

  return (
    <Button onClick={removeEvent} variant="outlined" type="button">
      Delete
    </Button>
  );
}