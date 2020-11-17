import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '@govuk-react/breadcrumbs';
import '../style/BreadcrumbBar.scss';

const BreadcrumbBar = ({page, prevPage, prevLink}) => {

  return (
    <div className='breadcrumbBar'>
      <Breadcrumbs>
        <Breadcrumbs.Link as={Link} to='/home' className='breadcrumbs'>Home</Breadcrumbs.Link>
        {prevPage && <Breadcrumbs.Link as={Link} to={prevLink} className='breadcrumbs'>{prevPage}</Breadcrumbs.Link>}
        {page}
      </Breadcrumbs>
    </div>
  )
}

export default BreadcrumbBar
