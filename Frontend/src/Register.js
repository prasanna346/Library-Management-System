import { Link } from "react-router-dom";

function Home() {
    return (
        <>
        <h2>you are at home</h2>
        <Link to="/log">click to Login</Link>
        <br /><br />
        <Link to="/reg">click to register</Link>
        <br /><br />
        <Link to="/update">click to update details</Link>
        <br /><br />
        <Link to="/delete">click to delete account</Link>
        </>
    );
}
export default Home;