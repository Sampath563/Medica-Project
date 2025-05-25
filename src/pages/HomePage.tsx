import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Heart, ArrowRight, Check, Star } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center pt-24">

        <div 
  className="absolute inset-0 bg-gradient-to-r from-primary-900/50 to-primary-700/40 z-10"
></div>

        <div 
          className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3259629/pexels-photo-3259629.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center"
        ></div>
        <div className="container mx-auto px-4 relative z-20">
  <div className="max-w-3xl animate-fade-in text-center mx-auto">
    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
      MEDICA – Multimodal Engine for Diagnosis, Intervention, Care and Assistance
    </h1>
    <p className="text-xl text-white/90 mb-8">
      MEDICA provides state-of-the-art tools for healthcare professionals and patients,
      simplifying diagnosis and treatment planning through our innovative platform.
    </p>

    {/* Center the buttons */}
    <div className="w-full flex flex-col sm:flex-row gap-4 justify-center items-center">
      <Link
        to="/treatment-planner"
        className="btn btn-accent py-3 px-6 text-lg flex items-center gap-2"
      >
        Treatment Planner
        <ArrowRight size={20} />
      </Link>
      <Link
        to="/health-diagnosis"
        className="btn bg-white text-primary-700 hover:bg-gray-100 py-3 px-6 text-lg flex items-center gap-2"
      >
        Health Diagnosis
        <ArrowRight size={20} />
      </Link>
    </div>
  </div>
</div>

      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Healthcare Management
            </h2>
            <p className="text-xl text-gray-600">
              Our platform offers powerful tools designed to streamline healthcare processes 
              and improve patient outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Heart className="text-primary-600" size={32} />}
              title="Treatment Planning"
              description="Create detailed, personalized treatment plans with our intuitive interface, designed for healthcare professionals."
            />
            <FeatureCard 
              icon={<Activity className="text-secondary-500" size={32} />}
              title="Health Diagnosis"
              description="Access advanced diagnostic tools that leverage medical data to assist in accurate health assessments."
            />
            <FeatureCard 
              icon={<Check className="text-accent-400" size={32} />}
              title="Seamless Integration"
              description="Our platform integrates with existing healthcare systems to provide a comprehensive solution."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}

    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="card p-6 hover:translate-y-[-5px]">
      <div className="rounded-full bg-gray-50 w-16 h-16 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  rating: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, role, rating }) => {
  return (
    <div className="card p-6">
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
          />
        ))}
      </div>
      <p className="text-gray-700 mb-6 italic">"{quote}"</p>
      <div>
        <p className="font-semibold text-gray-900">{author}</p>
        <p className="text-gray-600 text-sm">{role}</p>
      </div>
    </div>
  );
};

export default HomePage;