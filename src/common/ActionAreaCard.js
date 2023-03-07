import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

const ActionAreaCard = ({ label, icon, onClick }) => (
  <Card>
    <CardActionArea
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: 105,
        height: 105 
      }}
      onClick={onClick}
    >
      {icon}
      <CardContent sx={{ p: 0 }}>
        <Typography variant="h6">{label}</Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

export default ActionAreaCard;

