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
  justifyContent: 'space-between',
  width: '600px',
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

export { button, buttons, header, main, ul };
