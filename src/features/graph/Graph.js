import React from 'react';
import { ForceGraph2D } from 'react-force-graph';

import ContainedElement from '../../common/ContainedElement';

const Graph = ({ nodes, links, ...params }) => {
  const parent = React.useRef(null);
  const [height, setHeight] = React.useState(null);
  const [width, setWidth] = React.useState(null);
  const graphData = {
    nodes: nodes.map((n) => ({ ...n })),
    links: links.map((l) => ({ ...l })),
  }

  React.useEffect(() => {
    const resizeObserver = new ResizeObserver((event) => {
      setWidth(event[0].contentBoxSize[0].inlineSize);
      setHeight(event[0].contentBoxSize[0].blockSize);
    });
    if (parent) {
      resizeObserver.observe(parent.current);
    }
  }, [parent]);

  return (
    <ContainedElement ref={parent}>
      {(parent && height && width) ? (
      <ForceGraph2D
        {...params}
        graphData={graphData}
        width={width}
        height={height}
      />) : null}
    </ContainedElement>
  );
}

export default Graph;