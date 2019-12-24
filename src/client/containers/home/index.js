import React, { Fragment } from 'react';
import ParticlesBG from 'particles-bg';

import educations from './educations';
import experiences from './experiences';
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
            <a href="/varunvillait-resume.pdf" target="_blank" rel="noopener noreferrer">
              <i className="fa-2x fa-fw fas fa-file" />
            </a>
          </section>
        </section>
      </section>
    </header>
    <section className="container-fluid resume-content-container">
      <section className="container resume-content">
        <section className="experience row">
          <section className="title col-3">
            <h1><span>Experience</span></h1>
          </section>
          <section className="content col-9">
            {experiences.map((experience) => (
              <section className="col-12">
                <section className="card mb-3" style={{ border: 'none' }}>
                  <section className="row">
                    <section className="col-md-2">
                      <img src={experience.image} className="card-img" alt={experience.name} />
                    </section>
                    <section className="col-md-8">
                      <section className="card-body">
                        <p className="card-text"><strong>{experience.timePeriod}</strong></p>
                        <h5 className="card-title">{`${experience.title} at ${experience.name}`}</h5>
                      </section>
                    </section>
                  </section>
                </section>
              </section>
            ))}
          </section>
        </section>
        <section className="education row">
          <section className="title col-3">
            <h1><span>Education</span></h1>
          </section>
          <section className="content col-9">
            {educations.map((education) => (
              <section className="col-12">
                <section className="card mb-3" style={{ border: 'none' }}>
                  <section className="row">
                    <section className="col-md-2">
                      <img src={education.image} className="card-img" alt={education.name} />
                    </section>
                    <section className="col-md-8">
                      <section className="card-body">
                        <h2 className="card-title">{education.name}</h2>
                        <p className="card-text"><strong>{education.study}</strong></p>
                      </section>
                    </section>
                  </section>
                </section>
              </section>
            ))}
          </section>
        </section>
        <section className="projects row">
          <section className="title col-3">
            <h1><span>Projects</span></h1>
          </section>
          <section className="content col-9">
            <section className="row">
              {projects.map((project) => (
                <section
                  className="col-12"
                  style={{ cursor: 'pointer' }}
                  onClick={() => { window.open(project.link, '_blank'); }}
                >
                  <section className="card mb-3" style={{ border: 'none' }}>
                    <section className="row">
                      <section className="col-md-4">
                        <img src={project.image} className="card-img" alt={project.title} />
                      </section>
                      <section className="col-md-8">
                        <section className="card-body">
                          <h2 className="card-title">{project.title}</h2>
                          <h6 className="card-text">{`Roles: ${project.roles}`}</h6>
                          <p className="card-text">{project.description}</p>
                        </section>
                      </section>
                    </section>
                  </section>
                </section>
              ))}
            </section>
          </section>
        </section>
        <section className="skills row">
          <section className="title col-3">
            <h1><span>Skills</span></h1>
          </section>
          <section className="content col-9">
            <section className="row">
              {skills.map((skill) => (
                <section key={skill.title} className="skill-card col-4 col-sm-3 col-md-2 col-lg-2">
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
          <section className="title col-3">
            <h1><span>Get In Touch</span></h1>
          </section>
          <section className="content col-9">
            <form className="row" action="https://formspree.io/mnqjvgbj" method="post">
              <section className="row col-12">
                <label htmlFor="name" className="col-2">Name</label>
                <input id="name" name="name" type="text" className="col-10" required />
              </section>
              <section className="row col-12">
                <label htmlFor="email" className="col-2">Email</label>
                <input id="email" name="email" type="email" className="col-10" required />
              </section>
              <section className="row col-12">
                <label htmlFor="message" className="col-2">Message</label>
                <textarea id="message" name="message" className="col-10" required />
              </section>
              <section className="row col-12 button-container">
                <button type="submit">Submit</button>
              </section>
            </form>
          </section>
        </section>
      </section>
    </section>
  </Fragment>
);
