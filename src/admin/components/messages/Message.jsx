import AdminMenu from "../adminMenu/AdminMenu"
import './message.css'

const Message  = () => {
    return(
        <>
            <AdminMenu/>
            <section id="message">
                <form className="search-form">
                    <div className="search">
                        <label htmlFor="search">s</label>
                        <input
                            type="text"
                            id="search"
                        />
                    </div>
                </form>
            </section>
        </>
    )
}

export default Message