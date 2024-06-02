const main = {
  boxSizing: 'border-box',
  display: 'grid',
  gridTemplateAreas: `"top top"
  "left right"`,
  justifyContent: 'space-between',
  pt: '30px',
  backgroundColor: '#ffffff',
  borderRadius: '10px',
  overflow: 'hidden',
  pb: '10px',
  margin: 0,
  maxWidth: '1280px',
};

const topEl = {
  gridArea: 'top',
  display: 'flex',
  height: 'max-content',
};

const linkList = {
  flexWrap: 'wrap',
  gap: '16px',
  mb: '16px',
};

const left = {
  gridArea: 'left',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  height: 'max-content',
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
  '@media(max-width: 860px)': {
    marginTop: '25px',
    fontSize: '16px',
  },
  '@media(max-width: 660px)': {
    marginTop: '15px',
    fontSize: '14px',
  },
  '@media(max-width: 540px)': {
    marginTop: '7px',
    fontSize: '13px',
  },
  '@media(max-width: 480px)': {
    marginTop: '0px',
    fontSize: '12px',
    letterSpacing: 'normal',
  },
};

const title = {
  fontFamily: 'Cera Pro',
  fontWeight: '900',
  fontSize: '70px',
  lineHeight: '100%',
  textTransform: 'uppercase',
  color: '#3D3D3D',
  '@media(max-width: 940px)': {
    fontSize: '56px',
  },
  '@media(max-width: 860px)': {
    fontSize: '46px',
  },
  '@media(max-width: 660px)': {
    fontSize: '36px',
  },
  '@media(max-width: 540px)': {
    fontSize: '30px',
  },
  '@media(max-width: 480px)': {
    fontSize: '24px',
  },
};

const accent = {
  fontFamily: 'Cera Pro',
  fontWeight: 900,
  fontSize: '70px',
  lineHeight: '100%',
  textTransform: 'uppercase',
  color: '#46A358',
  '@media(max-width: 940px)': {
    fontSize: '56px',
  },
  '@media(max-width: 860px)': {
    fontSize: '46px',
  },
  '@media(max-width: 660px)': {
    fontSize: '36px',
  },
  '@media(max-width: 540px)': {
    fontSize: '30px',
  },
  '@media(max-width: 480px)': {
    fontSize: '24px',
  },
};

const description = {
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '171%',
  color: '#727272',
  marginTop: '15px',
  '@media(max-width: 860px)': {
    fontSize: '14px',
  },
  '@media(max-width: 540px)': {
    marginTop: '7px',
    fontSize: '13px',
  },
  '@media(max-width: 480px)': {
    fontSize: '12px',
  },
};

const right = {
  gridArea: 'right',
  '> img': {
    maxWidth: '380px',
    width: '100%',
  },

  position: 'relative',
  display: 'flex',
  alignSelf: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: '580px',
  height: '100%',
};

export { accent, description, left, linkList, main, right, subtitle, title, topEl };
