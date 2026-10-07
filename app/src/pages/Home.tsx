import ScrollHero from '../components/ScrollHero'
import ExperienceSection from '../sections/ExperienceSection'
import MenuSection from '../sections/MenuSection'
import StorySection from '../sections/StorySection'
import ClosingCTA from '../sections/ClosingCTA'
import ContactStrip from '../sections/ContactStrip'

export default function Home() {
  return (
    <main style={{ background: '#FAF7F2' }}>
      <ScrollHero />
      <ExperienceSection />
      <MenuSection />
      <StorySection />
      <ClosingCTA />
      <ContactStrip />
    </main>
  )
}
