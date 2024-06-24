import { Box, Link, Typography } from '@mui/material';

import gitHubLogo from '../../assets/icons/github.svg';
import { developers } from './DevelopersData';
import { developerCard, imgContainer } from './styled';

function DeveloperCard(): JSX.Element {
  return (
    <Box component="section" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
      {developers.map((el, ind) => {
        return (
          <Box key={ind} sx={developerCard}>
            <Box sx={imgContainer}>
              <img alt="olga" src={el.photo} />
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 600 }}>
                Name: <Typography component="span">{el.name}</Typography>
              </Typography>
              <Typography sx={{ fontWeight: 600 }}>
                Role: <Typography component="span">{el.role}</Typography>
              </Typography>
              <Typography sx={{ fontWeight: 600 }}>
                Shortbio: <Typography component="span">{el.shortbio}</Typography>
              </Typography>
              <Typography component="ul" sx={{ fontWeight: 600, paddingLeft: 0 }}>
                Contribution in project:
                {el.contributionInProject.map((el, ind) => {
                  return (
                    <Typography component="li" key={ind} sx={{ listStyle: 'square', ml: 4 }}>
                      {el}
                    </Typography>
                  );
                })}
              </Typography>
              <Typography sx={{ mt: 1 }}>
                <Link href={el.linkGitHub} target="_blank">
                  <img alt="github" src={gitHubLogo} />
                </Link>
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

export default DeveloperCard;
