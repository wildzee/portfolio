import Image from 'next/image'
import Link from 'next/link'

export default function RasoiPayCaseStudy() {
  return (
    <div className="case-study">
      <header className="case-study-header">
        <Link href="/" className="back-button">← Back to Portfolio</Link>
        <h1>Rasoipay.com Case Study</h1>
        <p className="case-study-subtitle">AI-Powered B2B SaaS Platform for Restaurant Management</p>
      </header>

      <main className="case-study-content">
        <section className="hero-section">
          <Image 
            src="/Rasoi_Pay/rasoipay_casestudie.jpg" 
            alt="Rasoipay Case Study" 
            width={900} 
            height={500}
            priority
          />
        </section>

        <section className="project-overview">
          <h2>Project Overview</h2>
          <p>
            Rasoipay.com is an AI-powered B2B SaaS platform designed to revolutionize restaurant management. 
            As the Founder & Product Lead, I built this platform from concept to a live, production-ready application.
          </p>
          <div className="button-container">
            <a href="https://rasoipay.com/" target="_blank" rel="noopener noreferrer" className="button">Visit Live Site</a>
          </div>
        </section>

        <section className="project-details">
          <div className="detail-grid">
            <div>
              <h3>Role</h3>
              <p>Founder & Product Lead</p>
            </div>
            <div>
              <h3>Duration</h3>
              <p>Ongoing Project</p>
            </div>
            <div>
              <h3>Technologies</h3>
              <p>Next.js, Firebase, AI/ML, Payment Gateway Integration</p>
            </div>
            <div>
              <h3>Status</h3>
              <p>Live Production Application</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}