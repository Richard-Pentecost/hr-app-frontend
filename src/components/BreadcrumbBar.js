import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '@govuk-react/breadcrumbs';
import '../style/BreadcrumbBar.scss';

const BreadcrumbBar = ({page, prevPages}) => {

  
  return (
    <div className='breadcrumbBar'>
      <Breadcrumbs>
        <Breadcrumbs.Link as={Link} to='/home' className='breadcrumbs'>Home</Breadcrumbs.Link>
        {prevPages && prevPages.map(({name, link}) => (
          <Breadcrumbs.Link as={Link} to={link} className='breadcrumbs'>{name} </Breadcrumbs.Link>
        ))}
        {page}
      </Breadcrumbs>
    </div>
  )
}

export default BreadcrumbBar
