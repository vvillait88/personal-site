import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import ParticlesBG from 'particles-bg';
import SkillBar from 'react-skillbars';
import './styles.scss';

import skills from './skills';

export default () => (
  <Fragment>
    <Helmet>
      <title>Home</title>
    </Helmet>
    <header className="cover">
      <ParticlesBG
        color="#FFFFFF"
        type="cobweb"
        bg
      />
      <section className="cover-content-container">
        <section className="cover-content">
          <h1 className="name">I&apos;m Varun Villait</h1>
          <h3 className="subline">I&apos;m an San Francisco based startup executive with a background in Product, Development, Design, IT and, Operations</h3>
          <section className="social">
            <a href="https://www.facebook.com/vvillait" target="_blank" rel="noopener noreferrer">
              <i className="fa-2x fa-fw fab fa-facebook-f" />
            </a>
            <a href="https://www.twitter.com/vvillait88" target="_blank" rel="noopener noreferrer">
              <i className="fa-2x fa-fw fab fa-twitter" />
            </a>
            <a href="https://www.linkedin.com/in/vvillait" target="_blank" rel="noopener noreferrer">
              <i className="fa-2x fa-fw fab fa-linkedin-in" />
            </a>
            <a href="https://www.github.com/vvillait88" target="_blank" rel="noopener noreferrer">
              <i className="fa-2x fa-fw fab fa-github" />
            </a>
            <a href="/varun-resume.pdf" target="_blank" rel="noopener noreferrer">
              <i className="fa-2x fa-fw fas fa-file" />
            </a>
          </section>
        </section>
      </section>
    </header>
    {false ? (
      <section className="resume-content-container">
        <section className="resume-content">
          <section className="education row">
            <section className="title column">
              <h1><span>Education</span></h1>
            </section>
            <section className="content column">
              <SkillBar skills={skills} />
            </section>
          </section>
          <section className="experience row">
            <section className="title column">
              <h1><span>Experience</span></h1>
            </section>
            <section className="content column">
              <SkillBar skills={skills} />
            </section>
          </section>
          <section className="skills row">
            <section className="title column">
              <h1><span>Skills</span></h1>
            </section>
            <section className="content column">
              <SkillBar skills={skills} />
            </section>
          </section>
        </section>
      </section>
    ) : null}
  </Fragment>
);
