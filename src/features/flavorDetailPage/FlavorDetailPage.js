import React from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectFlavor,
  fetchFlavorDetail,
} from './flavorDetailPageSlice';

const FlavorDetailPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const flavor = useSelector(selectFlavor);

  React.useEffect(() => {
    dispatch(fetchFlavorDetail(params.id));
  }, [dispatch, params]);

  return <>
    <div>Flavor Detail Page</div>
    {flavor ? <>
      <div>{flavor.name}</div>
      <div>{flavor.id}</div>
    </> : null}
  </>;
}

export default FlavorDetailPage;