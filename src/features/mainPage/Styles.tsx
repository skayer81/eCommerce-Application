const main = {
  boxSizing: 'border-box',
  display: 'flex',
  justifyContent: 'space-between',
  pt: '30px',
};

const left = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  width: 620,
  height: 450,
};

const subtitle = {
  fontFamily: 'Cera Pro',
  fontWeight: 500,
  fontSize: '18px',
  lineHeight: '114%',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#3D3D3D',
  marginTop: '50px',
};

const title = {
  fontFamily: 'Cera Pro',
  fontWeight: '900',
  fontSize: '70px',
  lineHeight: '100%',
  textTransform: 'uppercase',
  color: '#3D3D3D',
};

const accent = {
  fontFamily: 'Cera Pro',
  fontWeight: 900,
  fontSize: '70px',
  lineHeight: '100%',
  textTransform: 'uppercase',
  color: '#46A358',
};

const description = {
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '171%',
  color: '#727272',
  marginTop: '15px',
};

const right = {
  '> img': {
    maxWidth: '380px',
  },

  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: '580px',
};

export { accent, description, left, main, right, subtitle, title };
