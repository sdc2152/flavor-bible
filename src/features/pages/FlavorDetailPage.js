import React from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectFlavor,
  selectAdjacentFlavors,
  fetchFlavorDetail,
  init,
} from '../flavor/flavorSlice';

const FlavorDetailPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const flavorId = +params.id;
  const flavor = useSelector((state) => selectFlavor(state, flavorId));
  const adjacent = useSelector((state) => selectAdjacentFlavors(state, flavorId));

  React.useEffect(() => {
    dispatch(fetchFlavorDetail(flavorId));
    return () => dispatch(init());
  }, [flavorId]);

  return <>
    <div>Flavor Detail Page</div>
    {flavor ? <>
      <div>{flavor.name}</div>
      <div>{flavor.id}</div>
    </> : null}
    {adjacent
      ? adjacent.map((adj) => (
        <div key={adj.id}>{adj.name}</div>
      ))
     : null}
  </>;
}

export default FlavorDetailPage;
