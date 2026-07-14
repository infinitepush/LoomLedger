import { Link } from 'react-router';
import { ArrowRight, MapPin, Clock, Award, Star } from 'lucide-react';
import VerificationBadge from '../ui/VerificationBadge';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import weavers from '../../data/weavers.json';
import weaverPortrait from '../../assets/images/weaver-portrait.png';
import './WeaverSpotlight.css';

export default function WeaverSpotlight() {
  const featured = weavers[0];

  return (
    <section className="section weaver-spotlight" id="weaver-spotlight">
      <div className="container">
        <div className="section-header">
          <span className="section-header__eyebrow">Artisan Spotlight</span>
          <h2 className="section-header__title">Meet the Maker</h2>
          <p className="section-header__subtitle">
            Every product has a person behind it. We celebrate the master craftspeople keeping India's textile heritage alive.
          </p>
        </div>

        <div className="weaver-spotlight__card">
          <div className="weaver-spotlight__image-col">
            <img
              src={weaverPortrait}
              alt={`${featured.name}, master ${featured.craft} artisan`}
              className="weaver-spotlight__image"
              loading="lazy"
            />
          </div>
          <div className="weaver-spotlight__content">
            <div className="weaver-spotlight__meta">
              <VerificationBadge size="md" />
              <Badge variant="saffron" size="sm">{featured.generation}</Badge>
            </div>
            <h3 className="weaver-spotlight__name">{featured.name}</h3>
            <p className="weaver-spotlight__craft">{featured.craft}</p>

            <div className="weaver-spotlight__details">
              <div className="weaver-spotlight__detail">
                <MapPin size={14} />
                <span>{featured.region}</span>
              </div>
              <div className="weaver-spotlight__detail">
                <Clock size={14} />
                <span>{featured.experience} of experience</span>
              </div>
              <div className="weaver-spotlight__detail">
                <Star size={14} />
                <span>{featured.rating} rating · {featured.productsCount} products</span>
              </div>
            </div>

            <p className="weaver-spotlight__bio">{featured.bio}</p>

            <div className="weaver-spotlight__specialties">
              {featured.specialties.map(s => (
                <Badge key={s} variant="default" size="sm">{s}</Badge>
              ))}
            </div>

            {featured.awards && featured.awards.length > 0 && (
              <div className="weaver-spotlight__awards">
                {featured.awards.map(a => (
                  <div className="weaver-spotlight__award" key={a}>
                    <Award size={14} />
                    <span>{a}</span>
                  </div>
                ))}
              </div>
            )}

            <Button as={Link} to={`/artisan/${featured.id}`} variant="primary" icon={ArrowRight} iconPosition="right">
              View Full Profile
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
