import { Link } from 'react-router-dom'

const Welcome = () => {

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
        <section className="welcome">

            <p>{today}</p>

            <h1>Welcome!</h1>

            <p><Link to="/dash/notes"><button>View techNotes</button></Link></p>

            <p><Link to="/dash/notes/new"><button>Add New techNote</button></Link></p>

            <p><Link to="/dash/users"><button>View User Settings</button></Link></p>

            <p><Link to="/dash/users/new"><button>Add New User</button></Link></p>

        </section>
    )

    return content
}
export default Welcome