import Link from "next/link"

export default function ToolsPanel() {
    return (
        <nav className="tools-panel">
            <Link href={"/" } className="tools-panel__home">MyDay</Link>
            <Link href="/addEvent" className="tools-panel__action">Add event</Link>
        </nav>
    )
}