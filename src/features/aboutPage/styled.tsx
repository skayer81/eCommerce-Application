const imgContainer = {
  '> img': {
    width: '100%',
  },

  maxWidth: '250px',
  maxHeight: '250px',
  overflow: 'hidden',
  borderRadius: '50%',
  '@media(max-width: 860px)': {
    maxWidth: '200px',
    maxHeight: '200px',
  },
};

const developerCard = {
  display: 'flex',
  alignAtems: 'center',
  padding: 2,
  gap: 2,
  borderRadius: '20px',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
  backgroundColor: 'white',

  '@media(max-width: 860px)': {
    flexDirection: 'column',
    alignItems: 'center',
  },
};

export { developerCard, imgContainer };
