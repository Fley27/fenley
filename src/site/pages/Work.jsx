'use client'
import { useI18n } from '../useI18n.js'
import { PageHero } from '../components.jsx'
import { Mock, TagRow } from '../mocks.jsx'

const SHOW_PROJECTS = false

export default function Work() {
  const { copy } = useI18n()
  const page = copy.work

  return (
    <>
      <PageHero kicker={page.hero.kicker} title1={page.hero.title1} title2={page.hero.title2} lead={page.hero.lead} />

      {SHOW_PROJECTS && (
        <section className="section container">
          <div className="projects">
            {page.projects.map((project, index) => (
              <article key={project.n} className={`project reveal ${index % 2 === 1 ? 'is-flipped' : ''}`}>
                <div className="project-visual">
                  <Mock kind={project.mock} />
                </div>
                <div className="project-body">
                  <span className="row-index">{project.n}</span>
                  <TagRow items={project.tags} />
                  <h2>{project.title}</h2>
                  <p>{project.desc}</p>
                  <span className="outcome">{project.outcome}</span>
                </div>
              </article>
            ))}
          </div>
          <p className="note note-center reveal">{page.note}</p>
        </section>
      )}
    </>
  )
}
