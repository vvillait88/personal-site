import React, { Fragment } from 'react';
import ParticlesBG from 'particles-bg';

import projects from './projects';
import skills from './skills';

import './styles.scss';


export default () => (
  <Fragment>
    <header className="cover">
      <ParticlesBG
        color="#FFFFFF"
        type="cobweb"
        bg
      />
      <section className="cover-content-container">
        <section className="cover-content">
          <h1 className="greeter">Hi, I&apos;m</h1>
          <section className="name-container">
            <h1 className="name">Varun Villait</h1>
          </section>
          <h3 className="subline">I&apos;m a San Francisco based startup executive with a background in Product Management, Development, Design, Marketing, and IT Management</h3>
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
    <section className="resume-content-container">
      <section className="resume-content">
        {false ? (
          <Fragment>
            <section className="education row">
              <section className="title col-xs-3">
                <h1><span>Education</span></h1>
              </section>
              <section className="content col-xs-9">
                <p>Coming Soon</p>
              </section>
            </section>
            <section className="experience row">
              <section className="title col-xs-3">
                <h1><span>Experience</span></h1>
              </section>
              <section className="content col-xs-9">
                <p>Coming Soon</p>
              </section>
            </section>
            <section className="projects row">
              <section className="title col-xs-3">
                <h1><span>Projects</span></h1>
              </section>
              <section className="content col-xs-9">
                <section className="row">
                  {projects.map((project) => (
                    <section className="project-card col-xs-12 col-lg-4">
                      <img className="project-img" src={project.image} alt={project.title} />
                      <section className="project-card-container">
                        <p className="project-roles">{project.roles}</p>
                        <p className="project-description">{project.description}</p>
                      </section>
                    </section>
                  ))}
                </section>
              </section>
            </section>
          </Fragment>
        ) : null}
        <section className="skills row">
          <section className="title col-xs-3">
            <h1><span>Skills</span></h1>
          </section>
          <section className="content col-xs-9">
            <section className="row">
              {skills.map((skill) => (
                <section key={skill.title} className="skill-card col-xs-3 col-md-2 col-lg-2">
                  {skill.fa
                    ? (
                      <i
                        className={`skill-icon ${skill.noBrand ? 'fa' : 'fab'} fa-${skill.icon}`}
                        style={{ color: skill.color }}
                      />
                    )
                    : (
                      <i
                        className={`skill-icon fi fi-${skill.icon}`}
                        style={{ color: skill.color }}
                      />
                    )}
                  <section className="skill-card-container">
                    <p className="skill-title">{skill.title}</p>
                  </section>
                </section>
              ))}
            </section>
          </section>
        </section>
        <section className="contact row">
          <section className="title col-xs-3">
            <h1><span>Get In Touch</span></h1>
          </section>
          <section className="content col-xs-9">
            <form className="row" action="https://formspree.io/mnqjvgbj" method="post">
              <section className="row col-xs-12">
                <label htmlFor="name" className="col-xs-2">Name</label>
                <input id="name" name="name" type="text" className="col-xs-10" required />
              </section>
              <section className="row col-xs-12">
                <label htmlFor="email" className="col-xs-2">Email</label>
                <input id="email" name="email" type="email" className="col-xs-10" required />
              </section>
              <section className="row col-xs-12">
                <label htmlFor="message" className="col-xs-2">Message</label>
                <textarea id="message" name="message" className="col-xs-10" required />
              </section>
              <section className="row col-xs-12 button-container">
                <button type="submit">Submit</button>
              </section>
            </form>
          </section>
        </section>
      </section>
    </section>
  </Fragment>
);
