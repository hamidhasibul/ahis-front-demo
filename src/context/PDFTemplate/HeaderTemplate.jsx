import React from 'react'
import ahis from "../../assets/images/ahis-logo.png";

function HeaderTemplate() {
    return (
        <div className='mt-4 container flex-column d-flex justify-content-center align-items-center'>

            <img src={ahis} width="30%" />
            <p className='my-4'>Road#1, Plot#728, Panchlaish, Chattogram, Bangladesh</p>

        </div>
    )
}

export default HeaderTemplate