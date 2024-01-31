import React from 'react';
import Calendar from '@/components/Calendar';
import UserInfo from '@/components/UserInfo';
import ToolsPanel from '@/components/ToolsPanel';

const Schedule = () => {
 
    return (
        <div>
            <ToolsPanel />
            <UserInfo/>
            <Calendar/>
        </div>
    )
};
export default Schedule;