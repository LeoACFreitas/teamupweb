import Login from "./login";
import CreateRequestButton from "./createRequestButton";

export default function Header() {
    return (
        <header>
            <img className="header-logo" src="/logo.svg" />
            <div className="header-right">
                <span style={{ marginRight: '1.5em' }}>
                    <CreateRequestButton />
                </span>
                <Login />
            </div>
        </header>
    )
}