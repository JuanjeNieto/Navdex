import { useEffect } from 'react';
import PropTypes from 'prop-types';

const Logout = ({ setIsLoggedIn }) => {
    useEffect(() => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        window.location.href = '/';

    }, [setIsLoggedIn]);
    return null;
};

Logout.propTypes = {
    setIsLoggedIn: PropTypes.func.isRequired,
};

export default Logout;
