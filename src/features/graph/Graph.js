import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { ForceGraph2D } from 'react-force-graph';
import {
  fetchFlavor,
  removeParentFlavor,
  selectAllFlavors,
  selectLinks,
  selectParentFlavorIds,
} from '../graph/graphSlice';

import ContainedElement from '../../common/ContainedElement';

const Graph = () => {
  const dispatch = useDispatch();
  const parentFlavorIds = useSelector(selectParentFlavorIds);
  const nodes = useSelector(selectAllFlavors, shallowEqual);
  const links = useSelector(selectLinks, shallowEqual);
  const graphData = {
    nodes: nodes.map((n) => ({ ...n })),
    links: links.map((l) => ({ ...l })),
  }

  // resize graph on parent resize
  const parent = React.useRef(null);
  const [height, setHeight] = React.useState(null);
  const [width, setWidth] = React.useState(null);
  React.useEffect(() => {
    const resizeObserver = new ResizeObserver((event) => {
      setWidth(event[0].contentBoxSize[0].inlineSize);
      setHeight(event[0].contentBoxSize[0].blockSize);
    });
    if (parent.current) {
      resizeObserver.observe(parent.current);
    }
  }, [parent]);

  // zoom to fit graph
  const graphRef = React.useRef(null);
  const zoomDuration = 400;
  const zoomPadding = 100;
  React.useEffect(() => {
    if (graphRef.current) {
      setTimeout(() => {
        graphRef.current.zoomToFit(zoomDuration, zoomPadding);
      }, 1);
    }
  }, [nodes]);

  const handleNodeClick = (node) => {
    if (parentFlavorIds.includes(node.id)) {
      dispatch(removeParentFlavor(node.id));
    } else {
      dispatch(fetchFlavor(node.id));
    }
  }

  return (
    <ContainedElement ref={parent}>
      {(parent && height && width) ? (
        <ForceGraph2D
          ref={graphRef}
          onNodeClick={handleNodeClick}
          graphData={graphData}
          width={width}
          height={height}
          warmupTicks={50}
          />) : null}
    </ContainedElement>
  );
}

export default Graph;
