import React from 'react';
import { Link } from 'react-router-dom';
import '../style/QuickLinksCard.scss';
const QuickLinksCard = ({adminLevel}) =>{
    return (
        <div className='card'>
            <div className='cardHeader'>
                <h2 className='cardHeader__header'>Quick Links</h2>
            </div>
            <div className='quickLinkList'>
                <div className='quickLinkList__item'>
                    <Link to='/edit-information' className='quickLinkList__link'>Edit Information</Link>
                </div>
                {(adminLevel === 'Admin') && 			
                <div className='quickLinkList__item'>
                    <Link to='/create-employee' className='quickLinkList__link'>
                        Create Employee
                    </Link>
                </div>}
                {(adminLevel !== 'Employee') && 
                <div className='quickLinkList__item'>
                    <Link to='/employees-list' className='quickLinkList__link'>
                        { adminLevel === 'Manager' ? "View Your Team" : "View Employees" }
                    </Link>
                </div>}
                <div className='quickLinkList__item'>
                    <Link to='/create-visit' className='quickLinkList__link'>Create Visit</Link>
                </div>
                <div className='quickLinkList__item'>
                    <Link to='/visits-list'  className='quickLinkList__link' >View Visits</Link>
                </div>
            </div>
        </div>
    )

}

export default QuickLinksCard;