import React, { useRef }  from "react";
import "./LandingPage.css";
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import Recommendations from "./Recommended/Recommended";
import SearchBox from "../SearchBox/SearchBox";

export const LandingPage = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const searchBoxRef = useRef<HTMLDivElement>(null);

    const handleUsernameClick = () => {
        if (user) {
            switch (user.role) {
                case 'lister':
                    navigate('/listerdashboard');
                    break;
                case 'agent':
                    navigate('/agentdashboard');
                    break;
                case 'buyer':
                case 'renter':
                    navigate('/buyrentdashboard');
                    break;
                default:
                    navigate('/');
                    break;
            }
        }
    };

    const handleExploreClick = () => {
        searchBoxRef.current?.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    };

    return (
        <div className="desktop">
            <div className="overlap-group-wrapper">
                <div className="overlap-group">
                    <div className="bg" />
                    <div className="darkoverlay">
                        <div className="content">
                            <p className="find-your-perfect">
                            Co-Own. Verify. Trace. <br />
                            
                            Verified Collateral.
                            </p>
                            <p className="we-re-getting-real">
                                We're getting real about real estate. Your Gateway to Global Investing.
                            </p>
                            <button className="explore-button" onClick={handleExploreClick}>
                                Explore
                            </button>
                        </div>
                    </div>
                    <nav className="navbar">
                        <div className="nav-brand">DAOBITAT</div>
                        <div className="nav-items">
                            <div>Buy</div>
                            <div>Rent</div>
                            <div>Sell</div>
                            <div>Advertise</div>
                            <div>Financing</div>
                            <div>About</div>
                        </div>
                        <div className="auth-section">
                            {!user && <Link to="/login">Sign In</Link>}
                            {user && (
                                <div onClick={handleUsernameClick}>
                                    Hi, {user.name}
                                </div>
                            )}
                        </div>
                    </nav>
                </div>
            </div>
            <div ref={searchBoxRef}>
                <SearchBox />
            </div>
            <Recommendations />
        </div>
    );
};