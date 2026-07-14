import { QrCode, ShieldCheck, BookOpen } from 'lucide-react';
import './HowItWorks.css';

const steps = [
  {
    icon: QrCode,
    step: '01',
    title: 'Scan the QR Code',
    description: 'Every authentic handloom product comes with a unique QR code linked to its digital passport. Scan it with any smartphone camera.',
  },
  {
    icon: ShieldCheck,
    step: '02',
    title: 'Verify on Blockchain',
    description: 'Instantly verify the product\'s authenticity through our blockchain-backed verification system. View the complete supply chain journey.',
  },
  {
    icon: BookOpen,
    step: '03',
    title: 'Discover the Story',
    description: 'Learn about the artisan who crafted your piece, the heritage of the weaving technique, and the region\'s textile tradition through AI-generated stories.',
  },
];

export default function HowItWorks() {
  return (
    <section className="section how-it-works" id="how-it-works">
      <div className="container">
        <div className="section-header section-header--center">
          <span className="section-header__eyebrow">How It Works</span>
          <h2 className="section-header__title">Verify in Seconds</h2>
          <p className="section-header__subtitle">
            Our three-step verification process ensures every product you purchase is genuinely handcrafted.
          </p>
        </div>
        <div className="how-it-works__grid">
          {steps.map((step, i) => (
            <div className="how-it-works__step" key={i}>
              <div className="how-it-works__icon-wrap">
                <step.icon size={24} />
              </div>
              <span className="how-it-works__number">{step.step}</span>
              <h3 className="how-it-works__title">{step.title}</h3>
              <p className="how-it-works__desc">{step.description}</p>
              {i < steps.length - 1 && <div className="how-it-works__connector" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
