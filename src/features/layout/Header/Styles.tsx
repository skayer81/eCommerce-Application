const header = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '60px',
  fontFamily: 'Cera Pro',
  maxWidth: 1280,
  margin: '0 auto',
  padding: '0 12px',
};

const main = {
  maxWidth: 1280,
  margin: '0 auto',
  padding: '0 12px',
};

const buttons = {
  display: 'flex',
  gap: '10px',
};

const ul = {
  display: 'flex',
  flexDirection: 'row',
  gap: '40px',
};

const li = {
  '> a': {
    width: 'max-content',
    height: 'max-content',
    textDecoration: 'none',
    fontWeight: '500',
    color: '#3d3d3d',
  },

  '> a::before': {
    content: '""',
    position: 'absolute',
    bottom: '-2px',
    width: '100%',
    height: '2px',
    scale: '0',
    opacity: '0',
    background: '#2e7d32',
    transition: 'all 0.25s linear',
  },

  '> a:hover::before': {
    scale: '1',
    opacity: '1',
    transition: 'all 0.25s linear',
  },

  position: 'relative',
  width: 'max-content',
  listStyle: 'none',
  fontWeight: '500',
  fontSize: 20,
  color: '#3d3d3d',
};

const button = {
  '> a': {
    color: '#fff',
    textDecoration: 'none',
  },
  fontSize: '16px',
  textTransform: 'capitalize',
  height: 35,
  width: 'max-content',
  borderRadius: 2,
};

export { button, buttons, header, li, main, ul };
