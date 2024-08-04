import React, { useState, useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { usePrefersReducedMotion } from '@hooks';

const StyledJobsSection = styled.section`
  max-width: 700px;
  margin: 0 auto;

  .inner {
    display: flex;

    @media (max-width: 600px) {
      display: block; // Switch to block layout on mobile devices
    }
  }
`;

const StyledTabList = styled.div`
  position: relative;
  z-index: 3;
  width: max-content;
  padding: 0;
  margin: 0;
  list-style: none;

  @media (max-width: 600px) {
    display: none; // Hide tabs on mobile
  }
`;

const StyledTabButton = styled.button`
  ${({ theme }) => theme.mixins.link};
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--tab-height);
  padding: 0 20px 2px;
  border-left: 2px solid var(--lightest-navy);
  background-color: transparent;
  color: ${({ isActive }) => (isActive ? 'var(--green)' : 'var(--slate)')};
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  text-align: left;
  white-space: nowrap;

  &:hover,
  &:focus {
    background-color: var(--light-navy);
  }

  @media (max-width: 600px) {
    display: none; // Hide tab buttons on mobile
  }
`;

const StyledJobButton = styled.button`
  display: none;
  width: 100%;
  background-color: transparent;
  color: ${({ isActive }) => (isActive ? 'var(--green)' : 'var(--slate)')};
  font-family: var(--font-mono);
  text-align: left;
  padding: 15px 20px;
  border: none;
  border-bottom: 2px solid var(--lightest-navy);
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: var(--light-navy);
  }

  @media (max-width: 600px) {
    display: block; // Show collapsible buttons on mobile
  }
`;

const StyledHighlight = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 2px;
  height: var(--tab-height);
  border-radius: var(--border-radius);
  background: var(--green);
  transform: translateY(calc(${({ activeTabId }) => activeTabId} * var(--tab-height)));
  transition: transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-delay: 0.1s;

  @media (max-width: 600px) {
    display: none; // Hide highlight on mobile
  }
`;

const StyledTabPanels = styled.div`
  position: relative;
  width: 100%;
  margin-left: 20px;

  @media (max-width: 600px) {
    margin-left: 0; // Remove left margin on mobile
  }
`;

const StyledTabPanel = styled.div`
  width: 100%;
  padding: 10px 5px;
  display: none; // Start with all panels hidden

  &.active {
    display: block; // Only display the active panel
  }
  ul {
    ${({ theme }) => theme.mixins.fancyList};
  }
  h3 {
    margin-bottom: 2px;
    font-size: var(--fz-xxl);
  }
  .range {
    margin-bottom: 25px;
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
  }
`;

const Jobs = () => {
  const data = useStaticQuery(graphql`
    query {
      jobs: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/jobs/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            id
            frontmatter {
              title
              company
              location
              range
              url
            }
            html
          }
        }
      }
    }
  `);

  const jobsData = data.jobs.edges;
  const [activeTabId, setActiveTabId] = useState(0);
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!prefersReducedMotion) {
      sr.reveal(revealContainer.current, srConfig());
    }
  }, [prefersReducedMotion]);

  return (
    <StyledJobsSection id="jobs" ref={revealContainer}>
      <h2 className="numbered-heading">My Work Experience</h2>

      <div className="inner">
        <StyledTabList role="tablist" aria-label="Job tabs">
          {jobsData.map(({ node }, i) => {
            const { company } = node.frontmatter;
            return (
              <StyledTabButton
                key={node.id}
                isActive={activeTabId === i}
                onClick={() => setActiveTabId(i)}
                aria-selected={activeTabId === i}>
                {company}
              </StyledTabButton>
            );
          })}
          <StyledHighlight activeTabId={activeTabId} />
        </StyledTabList>

        {jobsData.map(({ node }, i) => (
          <StyledJobButton
            key={node.id}
            isActive={activeTabId === i}
            onClick={() => setActiveTabId(i)}
            aria-selected={activeTabId === i}>
            {node.frontmatter.company}
          </StyledJobButton>
        ))}

        <StyledTabPanels>
          {jobsData.map(({ node }, i) => (
            <CSSTransition
              key={node.id}
              in={activeTabId === i}
              timeout={250}
              classNames="fade"
              unmountOnExit>
              <StyledTabPanel
                id={`panel-${i}`}
                role="tabpanel"
                aria-labelledby={`tab-${i}`}
                hidden={activeTabId !== i}
                className={activeTabId === i ? 'active' : undefined}>
                <h3>
                  {node.frontmatter.title}{' '}
                  <span className="company">
                    @{' '}
                    <a href={node.frontmatter.url} className="inline-link">
                      {node.frontmatter.company}
                    </a>
                  </span>
                </h3>
                <p className="range">{node.frontmatter.range}</p>
                <div dangerouslySetInnerHTML={{ __html: node.html }} />
              </StyledTabPanel>
            </CSSTransition>
          ))}
        </StyledTabPanels>
      </div>
    </StyledJobsSection>
  );
};

export default Jobs;
