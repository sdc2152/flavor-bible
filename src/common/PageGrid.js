import { styled } from '@mui/system';

const PageGrid = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateRows: 'auto 1fr',
  height: '100%',
  gap: theme.spacing(2),
  overflow: 'hidden',
}));

export default PageGrid;