import Image from 'next/image'
import Link from 'next/link'

export default function IqraCaseStudy() {
  return (
    <div className="case-study">
      <header className="case-study-header">
        <Link href="/" className="back-button">← Back to Portfolio</Link>
        <h1>Iqra - Roman Hindi Quran App</h1>
        <p className="case-study-subtitle">A live mobile application designed to make the Quran accessible to Roman Hindi speakers</p>
      </header>

      <main className="case-study-content">
        <section className="hero-section">
          <Image 
            src="/Iqra/Iqra_casestuide.png" 
            alt="Iqra App Case Study" 
            width={900} 
            height={500}
            priority
          />
        </section>

        <section className="project-overview">
          <h2>The Problem: A Major Accessibility & Authenticity Gap</h2>
          <p>
            Millions of Muslims who speak Hindi/Urdu but cannot read the Arabic or Devanagari script faced a significant barrier to accessing the Quran digitally. Existing apps were not tailored to the Roman script reader, and many lacked a clear commitment to authentic sources (Salaf).
          </p>
        </section>

        <section className="project-overview">
          <h2>My Action: End-to-End UX/UI Leadership & Strategic Design</h2>
          <p>
            In collaboration with my development partner, Aman Maqsood, I led the UX/UI design process to create an application that was intuitive, feature-rich, and scrupulously authentic to its sources.
          </p>
          
          <h3>1. Deep User Customization & Accessibility</h3>
          <ul>
            <li><strong>Granular Text Control:</strong> Toggles for transliteration, translation, and deep meaning</li>
            <li><strong>Multi-Language Support:</strong> Seamless switching between Roman Urdu, English, and Urdu translations</li>
            <li><strong>Dynamic Font Sizing:</strong> Individual font size sliders for Arabic, transliteration, and translation</li>
          </ul>

          <h3>2. User-Centric Feature Design</h3>
          <ul>
            <li><strong>Authentic Content:</strong> Rich, curated library of authentic Hadith and Duas</li>
            <li><strong>Essential Utilities:</strong> Integrated Prayer Times and Qibla finder</li>
            <li><strong>Personalized Experience:</strong> Robust favorites system, reading history, and &quot;continue reading&quot; function</li>
            <li><strong>Accessibility First:</strong> High-contrast Dark Mode for comfortable reading</li>
          </ul>

          <h3>3. Intuitive UI & Information Architecture</h3>
          <p>
            Clean, card-based layout for Surahs and Duas with simple bottom-tab navigation. The focus was on creating a calm, respectful, and frictionless user experience.
          </p>
        </section>

        <section className="project-overview">
          <h2>The Result: A Trusted, High-Growth, Community-Embraced Product</h2>
          <ul>
            <li><strong>20,000+ users</strong> - Significant market penetration validating product-market fit</li>
            <li><strong>4.9-star rating</strong> from over 600 reviews - Exceptional user satisfaction</li>
            <li><strong>Complete mobile application</strong> - Successfully balanced deep feature set with intuitive UX</li>
          </ul>
          
          <div className="button-container">
            <a href="https://play.google.com/store/apps/details?id=com.quran.iqra&hl=en" target="_blank" rel="noopener noreferrer" className="button">Google Play Store</a>
            <a href="https://apps.apple.com/gb/app/iqra-roman-urdu-quran-duas/id6749045940" target="_blank" rel="noopener noreferrer" className="button">Apple App Store</a>
          </div>
        </section>

        <section className="project-details">
          <div className="detail-grid">
            <div>
              <h3>Role</h3>
              <p>Co-Designer & UX Lead</p>
            </div>
            <div>
              <h3>Users</h3>
              <p>20,000+ Active Users</p>
            </div>
            <div>
              <h3>Rating</h3>
              <p>4.9 Stars (600+ Reviews)</p>
            </div>
            <div>
              <h3>Platforms</h3>
              <p>iOS & Android</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}