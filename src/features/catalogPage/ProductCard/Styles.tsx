const cardStyle = {
  cursor: 'pointer',
  maxHeight: '450px',
  position: 'relative',
  transition: 'background-color 0.3s, box-shadow 0.3s',
  '&:hover': {
    backgroundColor: '#f4fbf0',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
  },
};

const boxStyle = { position: 'relative', backgroundColor: '#ffffff' };

const chipStyle = {
  position: 'absolute',
  bottom: '10px',
  left: '10px',
  zIndex: 1,
  height: '25px',
  borderRadius: '10px',
};

const descriptionStyle = {
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 4,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

const startPriceStyle = { textDecoration: 'line-through', ml: '10px', color: 'grey' };

export { boxStyle, cardStyle, chipStyle, descriptionStyle, startPriceStyle };