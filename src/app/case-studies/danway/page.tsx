import Image from 'next/image'
import Link from 'next/link'

export default function DanwayCaseStudy() {
    return (
        <div className="case-study">
            <header className="case-study-header">
                <Link href="/" className="back-button">← Back to Portfolio</Link>
                <h1>Danway EME: Workforce Intelligence Platform</h1>
                <p className="case-study-subtitle">Internal Digital Transformation Initiative</p>
            </header>

            <main className="case-study-content">
                <section className="hero-section">
                    <div className="confidential-banner">
                        <p>⚠️ Privacy Notice: This case study demonstrates the system architecture and UI/UX logic. All data shown is synthetic to protect corporate confidentiality and payroll privacy.</p>
                    </div>
                </section>

                <section className="project-overview">
                    <h2>The Mission</h2>
                    <p>
                        As an internal Product Architect, I identified a critical "Data Leak" at Danway EME: the manual gap between 5,000+ workers at the site gate and the SAP payroll system. I engineered a proprietary dashboard to bridge this gap, moving the firm from "Paper-First" to "Digital-First."
                    </p>
                </section>

                <section className="project-details">
                    <div className="detail-grid">
                        <div>
                            <h3>Role</h3>
                            <p>Product Architect & Internal Digital Lead</p>
                        </div>
                        <div>
                            <h3>Duration</h3>
                            <p>Ongoing Project</p>
                        </div>
                        <div>
                            <h3>Technologies</h3>
                            <p>Next.js, TypeScript, Recharts, SAP Integration Architecture</p>
                        </div>
                        <div>
                            <h3>Scale</h3>
                            <p>5,000+ Employees, 40 Sites</p>
                        </div>
                    </div>
                </section>

                <section className="challenge-section">
                    <h2>The Challenge</h2>
                    <p>
                        The engineering firm was managing workforce tracking, attendance, and labor-cost analytics through
                        fragmented legacy systems and manual processes. This resulted in:
                    </p>
                    <ul>
                        <li><strong>Delayed Reporting:</strong> 24-48 hour lag between site data collection and SAP payroll system updates</li>
                        <li><strong>Inaccurate Labor Cost Projections:</strong> Manual calculations leading to budget overruns</li>
                        <li><strong>Poor Visibility:</strong> No real-time insight into workforce distribution across 40 project sites</li>
                        <li><strong>Manual Data Entry Errors:</strong> Paper-based records prone to human error</li>
                        <li><strong>Audit Risk:</strong> Paper-based records are difficult to verify during labor audits and increase the risk of UAE Ministry of Human Resources & Emiratisation (MOHRE) compliance issues</li>
                    </ul>
                </section>

                <section className="solution-section">
                    <h2>The Solution</h2>
                    <p>
                        I designed and architected a comprehensive workforce intelligence platform that automates data collection,
                        eliminates the site-to-SAP delay, and provides executive-level visibility into manpower operations.
                        The system transforms raw attendance data into actionable business intelligence.
                    </p>
                </section>

                <section className="impact-section">
                    <h2>Business Impact (The ROI)</h2>
                    <div className="impact-grid">
                        <div className="impact-item">
                            <h3>80% Reduction</h3>
                            <p>In manual timesheet entry time</p>
                        </div>
                        <div className="impact-item">
                            <h3>Zero-Error Tolerance</h3>
                            <p>Algorithmic validation of punch-in/out data</p>
                        </div>
                        <div className="impact-item">
                            <h3>Executive Clarity</h3>
                            <p>Real-time visibility for Personnel Department into manpower distribution across 40 sites</p>
                        </div>
                        <div className="impact-item">
                            <h3>MOHRE Compliance</h3>
                            <p>Digital audit trail for regulatory requirements</p>
                        </div>
                    </div>
                </section>

                <section className="screens-section">
                    <h2>Key Features & Screens</h2>

                    <div className="screen-showcase">
                        <div className="screen-item">
                            <h3>Dashboard Overview</h3>
                            <p>Real-time workforce metrics designed for immediate SAP-readiness, eliminating the 24-48 hour delay in site-to-office reporting</p>
                            <div className="screen-link">
                                <a
                                    href="https://danway-963f6ywqn-mdafjalkhan29-gmailcoms-projects.vercel.app"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="button"
                                >
                                    View Live Dashboard Demo
                                </a>
                            </div>
                        </div>

                        <div className="screen-item">
                            <h3>Attendance Management</h3>
                            <p>Comprehensive attendance tracking with algorithmic validation and real-time status updates across all 40 sites</p>
                        </div>

                        <div className="screen-item">
                            <h3>Manpower Analytics</h3>
                            <p>Executive-level workforce distribution analytics with visual breakdowns by department, project, and cost center</p>
                        </div>
                    </div>
                </section>

                <section className="tech-approach-section">
                    <h2>Technical Approach</h2>
                    <ul>
                        <li><strong>SAP Integration Architecture:</strong> Designed for seamless data flow to existing SAP payroll infrastructure</li>
                        <li><strong>Modern Stack:</strong> Built with Next.js and TypeScript for sub-1-second load times (critical advantage over legacy construction software)</li>
                        <li><strong>Real-time Data Pipeline:</strong> Implemented live data synchronization eliminating the 24-48 hour reporting delay</li>
                        <li><strong>Algorithmic Validation:</strong> Zero-error tolerance system for punch-in/out data integrity</li>
                        <li><strong>Data Visualization:</strong> Custom charts using Recharts for executive-level business intelligence</li>
                        <li><strong>Scalable Architecture:</strong> Designed to handle 5,000+ concurrent users across 40 sites</li>
                        <li><strong>Compliance-Ready:</strong> Digital audit trail for MOHRE labor inspections</li>
                    </ul>
                </section>

                <section className="design-process-section">
                    <h2>Design Process</h2>
                    <p>
                        The project followed a consultative discovery approach with extensive stakeholder collaboration:
                    </p>
                    <ol>
                        <li><strong>Discovery Phase:</strong> Identified the critical "Data Leak" between site operations and SAP payroll system</li>
                        <li><strong>Stakeholder Workshops:</strong> Conducted sessions with Personnel Department, Site Managers, and Finance teams</li>
                        <li><strong>Information Architecture:</strong> Mapped complex data relationships across 40 sites and SAP integration points</li>
                        <li><strong>Wireframing & Prototyping:</strong> Created interactive prototypes validated with end-users</li>
                        <li><strong>Visual Design:</strong> Developed professional design system aligned with enterprise standards</li>
                        <li><strong>Implementation:</strong> Built production-ready system with focus on speed and reliability</li>
                        <li><strong>Continuous Optimization:</strong> Ongoing refinement based on Personnel Department feedback</li>
                    </ol>
                </section>

                <section className="cta-section">
                    <h2>View the Live Demo</h2>
                    <p>
                        Experience the dashboard interface with synthetic data that demonstrates the real system architecture and UI/UX logic.
                        Notice the sub-1-second load time—a critical competitive advantage over traditional construction management software.
                    </p>
                    <div className="button-container">
                        <a
                            href="https://danway-963f6ywqn-mdafjalkhan29-gmailcoms-projects.vercel.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="button"
                        >
                            Explore Dashboard Demo
                        </a>
                    </div>
                </section>
            </main>
        </div>
    )
}
