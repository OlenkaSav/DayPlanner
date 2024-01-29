import Link from "next/link"
import ExportButton from "./ExportButton"
import Button from '@mui/material/Button';


export default function ToolsPanel() {
 
    return (
        <>
        <nav className="tools-panel">
            <Link href={"/"} className="tools-panel__home">MyDay</Link>
            <div className="tools-panel__actions">
                <Link href="/addEvent" className="tools-panel__action">Add event</Link>
                {/* <ExportButton /> */}
            </div>
        </nav>
            {/* <ExportButton /> */}
            </>
    )
}