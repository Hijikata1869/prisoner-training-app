import { makeStyles } from '@material-ui/core/styles';

 export const useStyles = makeStyles((theme) => ({
  topWrapper : {
    backgroundColor: theme.palette.background.paper,
    paddingTop: '5rem',
    paddingBottom: '3rem',
  },
  mainLogoImage: {
    width: '100%',
    height: '100%',
  },
  secondWrapper: {
    margin: '4rem 0',
  },
  thirdWrapper: {
    marginTop: '4rem',
    paddingBottom: '4rem',
  },
  card: {
    marginTop: '15px',
    height: '100%',
    paddingBottom: 0,
  },
  cardMedia: {
    height: '100%',
  },
  cardContent: {
    flexGrow: 1,
  },
  contentTitle: {
    textAlign: 'center',
  },
  cardAction: {
    width: '100%',
    marginTop: '20px',
    marginBottom: '10px',
    paddingTop: 0,
    paddingBottom: 0,
  },
  actionButton: {
    margin: '0 auto',
  },
  trainingCard: {
    borderRadius: '1rem',
  },
  toTrainingLogButton: {
    display: 'block',
    margin: '20px 0 0 auto',
  }
}));
