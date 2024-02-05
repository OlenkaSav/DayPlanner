import React from 'react';
import Calendar from '@/components/Calendar';
import UserInfo from '@/components/UserInfo';
import ToolsPanel from '../components/ToolsPanel';
import SignIn from './signIn';


const HomePage = (props) => {
    

    return (
        <div>
            <ToolsPanel />
            <SignIn/>
        </div>
    )
};
export default HomePage;