import { ExperienceItem } from '../../components/content/ExperienceItem'
import { Grid } from '../../components/ui/Grid'
import { Section } from '../../components/ui/Section'
import { Typography } from '../../components/ui/Typography'
import { getAllExperiences } from '../../lib/mdx'

export default async function AboutPage() {
  const experiences = await getAllExperiences()

  return (
    <>
      <Section className="col-span-12">
        <Typography as="h1" className="mb-4">
          About
        </Typography>
        <Typography tone="muted" className="max-w-prose">
          I build clean, accessible interfaces with a focus on systems and
          maintainability.
        </Typography>
      </Section>

      <Section className="col-span-12">
        <Typography as="h2" className="mb-6">
          Experience
        </Typography>
        <Grid cols={12} className="gap-6">
          {experiences.map((exp) => (
            <div key={exp.slug} className="col-span-12">
              <ExperienceItem
                role={exp.role}
                company={exp.company}
                startDate={exp.startDate}
                endDate={exp.endDate}
                location={exp.location}
                description={exp.description}
              />
            </div>
          ))}
        </Grid>
      </Section>
    </>
  )
}
