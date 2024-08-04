import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Icon } from '@components/icons';
import { socialMedia } from '@config';

const StyledFooter = styled.footer`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  height: auto;
  min-height: 70px;
  padding: 15px;
  text-align: center;
`;

const StyledSocialLinks = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    max-width: 270px;
    margin: 0 auto 10px;
    color: var(--light-slate);
  }

  ul {
    ${({ theme }) => theme.mixins.flexBetween};
    padding: 0;
    margin: 0;
    list-style: none;

    a {
      padding: 10px;
      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

const StyledCredit = styled.div`
  color: var(--light-slate);
  font-family: var(--font-mono);
  font-size: var(--fz-xxs);
  line-height: 1.4;
  top-margin: 200px;
  margin-top: a {
    padding: 10px;
  }

  .github-stats {
    margin-top: 10px;

    & > span {
      display: inline-flex;
      align-items: center;
      margin: 0 7px;
    }
    svg {
      display: inline-block;
      margin-right: 5px;
      width: 14px;
      height: 14px;
    }
  }
`;

const Footer = () => {
  const [githubInfo, setGitHubInfo] = useState({
    commits: null,
  });

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      return;
    }
    fetch('https://github-contributions-api.jogruber.de/Nathnaelc?y=2023,2024')
      .then(response => response.json())
      .then(json => {
        const commits = json.all.reduce((acc, curr) => acc + curr, 0); // Sum all weekly commits
        setGitHubInfo({ commits });
      })
      .catch(e => console.error(e));
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <StyledFooter>
      <StyledSocialLinks>
        <ul>
          {socialMedia &&
            socialMedia.map(({ name, url }, i) => (
              <li key={i}>
                <a href={url} aria-label={name}>
                  <Icon name={name} />
                </a>
              </li>
            ))}
        </ul>
      </StyledSocialLinks>

      <StyledCredit tabindex="-1">
        <div>Designed &amp; Built by Meron Shibiru. Based on Brittany Chiang's template.</div>
        {githubInfo.commits && (
          <div className="github-stats">
            <span>
              <Icon name="Commit" />
              <span>{githubInfo.commits.toLocaleString()}</span> contributions
            </span>
          </div>
        )}
        <div>&copy; {currentYear} Meron Shibiru. All rights reserved.</div>
      </StyledCredit>
    </StyledFooter>
  );
};

export default Footer;
