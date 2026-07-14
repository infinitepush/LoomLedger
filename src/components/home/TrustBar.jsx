import { ShieldCheck, Award, Fingerprint, Globe } from 'lucide-react';
import './TrustBar.css';

const trustItems = [
  { icon: ShieldCheck, label: '12,400+', sublabel: 'Verified Products' },
  { icon: Fingerprint, label: 'Blockchain', sublabel: 'Authenticated' },
  { icon: Award, label: 'GI Certified', sublabel: 'Artisans' },
  { icon: Globe, label: '28 States', sublabel: 'Represented' },
];

export default function TrustBar() {
  return (
    <section className="trust-bar" id="trust-bar">
      <div className="container">
        <div className="trust-bar__grid">
          {trustItems.map((item, i) => (
            <div className="trust-bar__item" key={i}>
              <item.icon size={20} className="trust-bar__icon" />
              <div>
                <span className="trust-bar__label">{item.label}</span>
                <span className="trust-bar__sublabel">{item.sublabel}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
