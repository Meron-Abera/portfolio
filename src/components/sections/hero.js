import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;
  padding-top: var(--nav-height); // Ensure padding to account for nav height

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: calc(var(--nav-height) + 20px); // Add extra padding for smaller screens
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }

  .scroll-down-button {
    background-color: transparent;
    color: var(--slate);
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;
    margin-top: 50px; // Reduced margin to adjust positioning

    &:hover {
      transform: translateY(5px);
    }

    svg {
      margin-right: 0;
      width: 30px;
      height: 30px;
      animation: bounce 2s infinite;
    }
  }

  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(true);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }
    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hello, this is</h1>;
  const two = <h2 className="big-heading">Meron Shibiru.</h2>;
  const three = <h3 className="big-heading">I design and develop Software</h3>;
  const four = (
    <>
      <p>
      My goal is to provide software solutions that increase system efficiency and improve user experiences. Currently, I work at{' '}
        <a href="https://www.huawei.com/en/" target="_blank" rel="noreferrer">
          Huawei Technologies Ethiopia P.L.C
        </a>{' '}
        as an Intern and I am also a developer at{' '}
        <strong>TamaCares</strong> building{' '}
        <a href="https://www.tamacares.com" target="_blank" rel="noreferrer">
          tamacares.com
        </a>
        .
      </p>
      <a className="email-link" target="_top" href="mailto:meronabera2121@gmail.com">
        Say Hi
      </a>
    </>
  );

  const items = [one, two, three, four];

  const handleScrollDown = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setShowScrollButton(false);
    }
  };

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
          {showScrollButton && (
            <button className="scroll-down-button" onClick={handleScrollDown}>
              <FontAwesomeIcon icon={faChevronDown} style={{ color: '#d69e9e' }} />
            </button>
          )}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
          {showScrollButton && (
            <CSSTransition key="scroll-button" classNames="fadeup" timeout={loaderDelay}>
              <button
                className="scroll-down-button"
                onClick={handleScrollDown}
                style={{ transitionDelay: '600ms' }}>
                <FontAwesomeIcon icon={faChevronDown} style={{ color: '#d69e9e' }} />
              </button>
            </CSSTransition>
          )}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
