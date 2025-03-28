import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  ChevronLeft, 
  Globe, 
  FileText, 
  Clock, 
  DollarSign, 
  Users, 
  Check,
  Calendar,
  CreditCard,
  MapPin,
  ShieldCheck
} from 'lucide-react';

// Country data - in a real app this would come from an API
const countryData = {
  usa: {
    name: 'United States',
    flag: '🇺🇸',
    banner: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29',
    description: 'The United States offers various visa options for tourists, students, workers, and immigrants. Each visa type has specific requirements and application procedures.',
    entryType: 'Single/Multiple',
    lengthOfStay: '30-180 days',
    validity: '10 years (for B1/B2)',
    processingTime: '3-5 business days',
    documentsRequired: [
      'Valid passport with at least 6 months validity',
      'Completed visa application form',
      'Proof of financial stability',
      'Proof of ties to home country',
      'Travel itinerary',
      'Passport-sized photographs',
      'Previous visa copies (if applicable)'
    ],
    visaTypes: [
      { name: 'Tourist Visa (B-2)', processingTime: '2-4 weeks', fee: '$160', requirements: ['Valid passport', 'DS-160 form', 'Proof of funds', 'Intent to return'] },
      { name: 'Student Visa (F-1)', processingTime: '3-5 weeks', fee: '$160', requirements: ['I-20 from school', 'SEVIS fee payment', 'Academic records'] },
      { name: 'Work Visa (H-1B)', processingTime: '3-6 months', fee: '$190', requirements: ['Employer petition', 'Educational credentials', 'Relevant experience'] },
      { name: 'Business Visa (B-1)', processingTime: '2-4 weeks', fee: '$160', requirements: ['Business invitation', 'Meeting agenda', 'Business credentials'] },
      { name: 'Transit Visa (C)', processingTime: '2-3 weeks', fee: '$160', requirements: ['Onward ticket', 'Visa for destination', 'Travel itinerary'] },
      { name: 'Crew Member Visa (D)', processingTime: '2-4 weeks', fee: '$160', requirements: ['Employer letter', "Seaman's book", 'Shipping company letter'] },
    ],
    visaPackages: [
      { 
        name: 'Standard Processing', 
        processingTime: '7-10 days', 
        price: '$299',
        features: ['Document review', 'Application assistance', 'Email support']
      },
      { 
        name: 'Express Processing', 
        processingTime: '3-5 days', 
        price: '$399',
        features: ['Document review', 'Application assistance', '24/7 support', 'Express processing']
      },
      { 
        name: 'Premium Service', 
        processingTime: '24-48 hours', 
        price: '$599',
        features: ['Document review', 'Application assistance', 'Dedicated agent', 'Rush processing', 'Interview preparation']
      }
    ]
  },
  canada: {
    name: 'Canada',
    flag: '🇨🇦',
    banner: 'https://images.unsplash.com/photo-1517935706615-2717063c2225',
    description: 'Canada offers temporary and permanent visas for visitors, students, workers, and immigrants. The application process varies depending on your nationality and purpose of visit.',
    entryType: 'Single/Multiple',
    lengthOfStay: '6 months (typical)',
    validity: 'Up to 10 years',
    processingTime: '2-4 weeks',
    documentsRequired: [
      'Valid passport',
      'Application forms',
      'Photographs',
      'Proof of financial support',
      'Letter of invitation (if applicable)',
      'Travel history'
    ],
    visaTypes: [
      { name: 'Visitor Visa', processingTime: '2-3 weeks', fee: 'CAD $100', requirements: ['Valid passport', 'Financial proof', 'Travel history', 'Purpose of visit'] },
      { name: 'Study Permit', processingTime: '3-6 weeks', fee: 'CAD $150', requirements: ['Acceptance letter', 'Proof of funds', 'Intent to leave'] },
      { name: 'Work Permit', processingTime: '4-8 weeks', fee: 'CAD $155', requirements: ['Job offer', 'Labor market impact assessment', 'Qualifications'] },
      { name: 'Express Entry', processingTime: '6 months', fee: 'CAD $1,325', requirements: ['Education credentials', 'Language tests', 'Work experience'] }
    ],
    visaPackages: [
      { 
        name: 'Standard Processing', 
        processingTime: '2-3 weeks', 
        price: '$249',
        features: ['Document review', 'Application assistance', 'Email support']
      },
      { 
        name: 'Express Processing', 
        processingTime: '7-10 days', 
        price: '$349',
        features: ['Document review', 'Application assistance', '24/7 support', 'Express processing']
      },
      { 
        name: 'Premium Service', 
        processingTime: '3-5 days', 
        price: '$499',
        features: ['Document review', 'Application assistance', 'Dedicated agent', 'Rush processing', 'Interview preparation']
      }
    ]
  },
  uk: {
    name: 'United Kingdom',
    flag: '🇬🇧',
    banner: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad',
    description: 'The United Kingdom offers various visa categories for tourists, students, workers, and family members. Each visa has specific eligibility criteria and documentation requirements.',
    entryType: 'Single/Multiple',
    lengthOfStay: '6 months (standard visitor)',
    validity: 'Up to 10 years (long-term)',
    processingTime: '3-4 weeks',
    documentsRequired: [
      'Valid passport',
      'Completed application',
      'Biometric information',
      'Proof of financial means',
      'Accommodation details',
      'Travel history'
    ],
    visaTypes: [
      { name: 'Standard Visitor Visa', processingTime: '3 weeks', fee: '£95', requirements: ['Valid passport', 'Proof of funds', 'Accommodation details', 'Return ticket'] },
      { name: 'Student Visa', processingTime: '3-4 weeks', fee: '£348', requirements: ['CAS from institution', 'Proof of funds', 'English language test'] },
      { name: 'Skilled Worker Visa', processingTime: '3-8 weeks', fee: '£610+', requirements: ['Certificate of sponsorship', 'Appropriate skill level', 'English language test'] },
      { name: 'Family Visa', processingTime: '6-12 weeks', fee: '£1,523', requirements: ['Relationship proof', 'Financial requirement', 'Accommodation details'] },
      { name: 'Transit Visa', processingTime: '1-2 weeks', fee: '£35', requirements: ['Valid onward journey', 'Short stay proof', 'No intention to stay'] }
    ],
    visaPackages: [
      { 
        name: 'Standard Processing', 
        processingTime: '3-4 weeks', 
        price: '£199',
        features: ['Document review', 'Application assistance', 'Email support']
      },
      { 
        name: 'Express Processing', 
        processingTime: '1-2 weeks', 
        price: '£299',
        features: ['Document review', 'Application assistance', '24/7 support', 'Express processing']
      },
      { 
        name: 'Premium Service', 
        processingTime: '3-5 days', 
        price: '£399',
        features: ['Document review', 'Application assistance', 'Dedicated agent', 'Rush processing', 'Interview preparation']
      }
    ]
  },
  schengen: {
    name: 'Schengen Area',
    flag: '🇪🇺',
    banner: 'https://images.unsplash.com/photo-1499856871958-5b9357976b82',
    description: 'The Schengen visa allows travel to 26 European countries. Depending on your nationality and purpose of visit, you may apply for different types of Schengen visas.',
    entryType: 'Single/Multiple',
    lengthOfStay: '90 days within 180 days',
    validity: 'Up to 5 years',
    processingTime: '10-15 days',
    documentsRequired: [
      'Valid passport',
      'Visa application form',
      'Photos',
      'Travel insurance',
      'Itinerary',
      'Proof of accommodation',
      'Proof of financial means'
    ],
    visaTypes: [
      { name: 'Tourist Visa (C)', processingTime: '10-15 days', fee: '€80', requirements: ['Valid passport', 'Travel insurance', 'Itinerary', 'Proof of funds'] },
      { name: 'Business Visa', processingTime: '10-15 days', fee: '€80', requirements: ['Business invitation', 'Company letter', 'Proof of funds'] },
      { name: 'Student Visa', processingTime: '10-15 days', fee: '€80', requirements: ['Acceptance letter', 'Accommodation proof', 'Financial support'] }
    ],
    visaPackages: [
      { 
        name: 'Standard Processing', 
        processingTime: '10-15 days', 
        price: '€199',
        features: ['Document review', 'Application assistance', 'Email support']
      },
      { 
        name: 'Express Processing', 
        processingTime: '5-7 days', 
        price: '€299',
        features: ['Document review', 'Application assistance', '24/7 support', 'Express processing']
      },
      { 
        name: 'Premium Service', 
        processingTime: '2-4 days', 
        price: '€399',
        features: ['Document review', 'Application assistance', 'Dedicated agent', 'Rush processing', 'Interview preparation']
      }
    ]
  },
  australia: {
    name: 'Australia',
    flag: '🇦🇺',
    banner: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be',
    description: 'Australia offers numerous visa options for visitors, students, workers, and immigrants. Most visa applications are processed online through the ImmiAccount portal.',
    entryType: 'Single/Multiple',
    lengthOfStay: '3-12 months',
    validity: '1 year (typical)',
    processingTime: '20-50 days',
    documentsRequired: [
      'Valid passport',
      'Application form',
      'Photographs',
      'Health insurance',
      'Proof of funds',
      'Character documents'
    ],
    visaTypes: [
      { name: 'Visitor Visa (600)', processingTime: '20-50 days', fee: 'AUD $145', requirements: ['Valid passport', 'Sufficient funds', 'Health insurance', 'Character requirements'] },
      { name: 'Student Visa (500)', processingTime: '4-6 weeks', fee: 'AUD $620', requirements: ['CoE from institution', 'Health insurance', 'Financial requirements'] },
      { name: 'Working Holiday Visa (417/462)', processingTime: '14-40 days', fee: 'AUD $485', requirements: ['Age 18-30', 'Sufficient funds', 'Health insurance'] },
      { name: 'Skilled Visa (189/190/491)', processingTime: '6-18 months', fee: 'AUD $4,045+', requirements: ['Skills assessment', 'Points test', 'English proficiency'] }
    ],
    visaPackages: [
      { 
        name: 'Standard Processing', 
        processingTime: '20-50 days', 
        price: 'AUD $249',
        features: ['Document review', 'Application assistance', 'Email support']
      },
      { 
        name: 'Express Processing', 
        processingTime: '14-20 days', 
        price: 'AUD $349',
        features: ['Document review', 'Application assistance', '24/7 support', 'Express processing']
      },
      { 
        name: 'Premium Service', 
        processingTime: '7-12 days', 
        price: 'AUD $499',
        features: ['Document review', 'Application assistance', 'Dedicated agent', 'Rush processing', 'Interview preparation']
      }
    ]
  },
  uae: {
    name: 'UAE',
    flag: '🇦🇪',
    banner: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
    description: 'The United Arab Emirates offers various visa types for tourists, business visitors, workers, and residents. The process and requirements vary based on nationality and purpose.',
    entryType: 'Single/Multiple',
    lengthOfStay: '30-90 days',
    validity: '1-3 months',
    processingTime: '3-5 days',
    documentsRequired: [
      'Valid passport',
      'Photographs',
      'Application form',
      'Return ticket',
      'Hotel bookings',
      'Financial statements'
    ],
    visaTypes: [
      { name: 'Tourist Visa', processingTime: '3-5 days', fee: '$90-$180', requirements: ['Valid passport', 'Return ticket', 'Hotel booking', 'Sufficient funds'] },
      { name: 'Visit Visa', processingTime: '3-5 days', fee: '$180-$270', requirements: ['Host invitation', 'Valid passport', 'Photographs'] },
      { name: 'Employment Visa', processingTime: '2-3 weeks', fee: 'Varies', requirements: ['Job offer', 'Medical test', 'Educational certificates'] }
    ],
    visaPackages: [
      { 
        name: 'Standard Processing', 
        processingTime: '3-5 days', 
        price: '$199',
        features: ['Document review', 'Application assistance', 'Email support']
      },
      { 
        name: 'Express Processing', 
        processingTime: '24-48 hours', 
        price: '$299',
        features: ['Document review', 'Application assistance', '24/7 support', 'Express processing']
      },
      { 
        name: 'Premium Service', 
        processingTime: 'Same day', 
        price: '$399',
        features: ['Document review', 'Application assistance', 'Dedicated agent', 'Rush processing', 'VIP service']
      }
    ]
  },
  japan: {
    name: 'Japan',
    flag: '🇯🇵',
    banner: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989',
    description: 'Japan offers various visa categories for short-term visits, business, study, work, and long-term residency. Application procedures depend on your nationality and purpose of visit.',
    entryType: 'Single/Multiple',
    lengthOfStay: '15-90 days',
    validity: '3 months - 5 years',
    processingTime: '5-7 days',
    documentsRequired: [
      'Valid passport',
      'Visa application form',
      'Photos',
      'Itinerary',
      'Financial documents',
      'Invitation letter (if applicable)'
    ],
    visaTypes: [
      { name: 'Tourist Visa', processingTime: '5-7 days', fee: '¥3,000', requirements: ['Valid passport', 'Itinerary', 'Sufficient funds', 'Return ticket'] },
      { name: 'Business Visa', processingTime: '5-7 days', fee: '¥3,000', requirements: ['Business invitation', 'Company letter', 'Itinerary'] }
    ],
    visaPackages: [
      { 
        name: 'Standard Processing', 
        processingTime: '5-7 days', 
        price: '¥20,000',
        features: ['Document review', 'Application assistance', 'Email support']
      },
      { 
        name: 'Express Processing', 
        processingTime: '3-4 days', 
        price: '¥30,000',
        features: ['Document review', 'Application assistance', '24/7 support', 'Express processing']
      },
      { 
        name: 'Premium Service', 
        processingTime: '1-2 days', 
        price: '¥45,000',
        features: ['Document review', 'Application assistance', 'Dedicated agent', 'Rush processing', 'Interview preparation']
      }
    ]
  },
  singapore: {
    name: 'Singapore',
    flag: '🇸🇬',
    banner: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd',
    description: 'Singapore offers various visa options for tourists, business visitors, students, and workers. Many nationalities enjoy visa-free entry for short visits.',
    entryType: 'Single/Multiple',
    lengthOfStay: '30-90 days',
    validity: '2 years (multiple entry)',
    processingTime: '3-5 days',
    documentsRequired: [
      'Valid passport',
      'Completed form',
      'Recent photograph',
      'Return ticket',
      'Proof of funds',
      'Travel itinerary'
    ],
    visaTypes: [
      { name: 'Tourist Visa', processingTime: '3-5 days', fee: 'SGD $30', requirements: ['Valid passport', 'Return ticket', 'Proof of funds', 'Travel itinerary'] },
      { name: 'Business Visa', processingTime: '3-5 days', fee: 'SGD $30', requirements: ['Business invitation', 'Company letter', 'Meeting schedule'] }
    ],
    visaPackages: [
      { 
        name: 'Standard Processing', 
        processingTime: '3-5 days', 
        price: 'SGD $159',
        features: ['Document review', 'Application assistance', 'Email support']
      },
      { 
        name: 'Express Processing', 
        processingTime: '1-2 days', 
        price: 'SGD $259',
        features: ['Document review', 'Application assistance', '24/7 support', 'Express processing']
      },
      { 
        name: 'Premium Service', 
        processingTime: 'Same day', 
        price: 'SGD $359',
        features: ['Document review', 'Application assistance', 'Dedicated agent', 'Rush processing', 'VIP treatment']
      }
    ]
  }
};

const CountryDetails = () => {
  const { id } = useParams<{ id: string }>();
  const country = id && countryData[id as keyof typeof countryData];
  const [selectedPackage, setSelectedPackage] = useState(0);
  
  if (!country) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-navy mb-4">Country not found</h1>
            <Link to="/">
              <Button>Return to home</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Banner */}
      <div className="relative h-64">
        <div className="absolute inset-0">
          <img 
            src={country.banner}
            alt={country.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent"></div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="container mx-auto max-w-7xl">
            <div className="flex items-center">
              <Link to="/" className="mr-2">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div className="flex items-center">
                <span className="text-4xl mr-3">{country.flag}</span>
                <h1 className="text-3xl md:text-4xl font-bold">{country.name} Visa Information</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Two-column layout */}
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column - scrollable content */}
          <div className="w-full lg:w-2/3 space-y-8">
            {/* Visa Overview Section */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-navy mb-6">Visa Overview</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                <div className="flex flex-col">
                  <div className="flex items-center text-gray-500 mb-2">
                    <CreditCard className="h-5 w-5 mr-2" />
                    <span className="text-sm">Visa Type:</span>
                  </div>
                  <p className="font-medium">{id?.toUpperCase()} Visa</p>
                </div>
                
                <div className="flex flex-col">
                  <div className="flex items-center text-gray-500 mb-2">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span className="text-sm">Length of Stay:</span>
                  </div>
                  <p className="font-medium">{country.lengthOfStay || '30 days'}</p>
                </div>
                
                <div className="flex flex-col">
                  <div className="flex items-center text-gray-500 mb-2">
                    <Clock className="h-5 w-5 mr-2" />
                    <span className="text-sm">Validity:</span>
                  </div>
                  <p className="font-medium">{country.validity || '60 days'}</p>
                </div>
                
                <div className="flex flex-col">
                  <div className="flex items-center text-gray-500 mb-2">
                    <Globe className="h-5 w-5 mr-2" />
                    <span className="text-sm">Entry:</span>
                  </div>
                  <p className="font-medium">{country.entryType || 'Single'}</p>
                </div>
              </div>
              
              <div className="prose max-w-none">
                <p className="text-gray-600">{country.description}</p>
              </div>
            </section>
            
            {/* Documents Required Section */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-navy mb-6">Required Documents</h2>
              
              <ul className="space-y-3">
                {(country.documentsRequired || [
                  'Valid passport',
                  'Completed application form',
                  'Passport-sized photos',
                  'Proof of accommodation',
                  'Proof of sufficient funds',
                  'Return ticket',
                  'Travel insurance'
                ]).map((doc, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-teal flex-shrink-0 mr-3 mt-0.5" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </section>
            
            {/* Processing Timeline */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-navy mb-6">Processing Timeline</h2>
              
              <div className="space-y-6">
                <div className="relative pl-8 pb-6 border-l-2 border-teal">
                  <div className="absolute left-[-8px] top-0 h-4 w-4 rounded-full bg-teal"></div>
                  <h3 className="font-semibold text-navy mb-1">Application Submission</h3>
                  <p className="text-gray-600">Complete and submit your visa application with all required documents.</p>
                </div>
                
                <div className="relative pl-8 pb-6 border-l-2 border-teal">
                  <div className="absolute left-[-8px] top-0 h-4 w-4 rounded-full bg-teal"></div>
                  <h3 className="font-semibold text-navy mb-1">Document Verification</h3>
                  <p className="text-gray-600">Your documents will be reviewed by our team and the embassy.</p>
                </div>
                
                <div className="relative pl-8 pb-6 border-l-2 border-teal">
                  <div className="absolute left-[-8px] top-0 h-4 w-4 rounded-full bg-teal"></div>
                  <h3 className="font-semibold text-navy mb-1">Processing</h3>
                  <p className="text-gray-600">Your application is processed by the embassy or consulate.</p>
                </div>
                
                <div className="relative pl-8">
                  <div className="absolute left-[-8px] top-0 h-4 w-4 rounded-full bg-teal"></div>
                  <h3 className="font-semibold text-navy mb-1">Visa Issuance</h3>
                  <p className="text-gray-600">Receive your visa within the standard processing time of {country.processingTime || '3-5 business days'}.</p>
                </div>
              </div>
            </section>
            
            {/* Popular Destinations */}
            {id === 'uae' && (
              <section className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-navy mb-6">All 7 Emirates with 1 Visa</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative h-48 rounded-lg overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c" 
                      alt="Dubai"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold">Dubai</h3>
                    </div>
                  </div>
                  
                  <div className="relative h-48 rounded-lg overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1570375309836-a2976045b372" 
                      alt="Abu Dhabi"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold">Abu Dhabi</h3>
                    </div>
                  </div>
                  
                  <div className="relative h-48 rounded-lg overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1565552645632-d725f8bfc19a" 
                      alt="Sharjah"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold">Sharjah</h3>
                    </div>
                  </div>
                </div>
              </section>
            )}
            
            {/* Testimonials or Additional Info */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-navy mb-6">Why Choose Us</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4">
                  <div className="bg-teal/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-teal" />
                  </div>
                  <h3 className="font-bold text-navy mb-2">Fast Processing</h3>
                  <p className="text-gray-600 text-sm">Get your visa approved quickly with our expedited service options.</p>
                </div>
                
                <div className="text-center p-4">
                  <div className="bg-teal/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck className="h-8 w-8 text-teal" />
                  </div>
                  <h3 className="font-bold text-navy mb-2">100% Success Rate</h3>
                  <p className="text-gray-600 text-sm">Our experienced team ensures your application meets all requirements.</p>
                </div>
                
                <div className="text-center p-4">
                  <div className="bg-teal/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-teal" />
                  </div>
                  <h3 className="font-bold text-navy mb-2">24/7 Support</h3>
                  <p className="text-gray-600 text-sm">Our visa experts are always available to answer your questions.</p>
                </div>
              </div>
            </section>
          </div>
          
          {/* Right column - sticky packages section */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-24">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                <div className="bg-navy text-white p-4">
                  <h2 className="text-xl font-bold">Select Your Package</h2>
                </div>
                
                <div className="p-4 space-y-4">
                  <ScrollArea className="h-96 pr-4">
                    {(country.visaPackages || [
                      { 
                        name: 'Standard Processing', 
                        processingTime: '7-10 days', 
                        price: '$299',
                        features: ['Document review', 'Application assistance', 'Email support']
                      },
                      { 
                        name: 'Express Processing', 
                        processingTime: '3-5 days', 
                        price: '$399',
                        features: ['Document review', 'Application assistance', '24/7 support', 'Express processing']
                      },
                      { 
                        name: 'Premium Service', 
                        processingTime: '24-48 hours', 
                        price: '$599',
                        features: ['Document review', 'Application assistance', 'Dedicated agent', 'Rush processing', 'Interview preparation']
                      }
                    ]).map((pkg, index) => (
                      <div 
                        key={index} 
                        className={`border rounded-lg mb-4 cursor-pointer transition-all ${selectedPackage === index ? 'border-teal shadow-md' : 'border-gray-200'}`}
                        onClick={() => setSelectedPackage(index)}
                      >
                        <div className={`p-4 ${selectedPackage === index ? 'bg-teal/5' : ''}`}>
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-bold text-navy">{pkg.name}</h3>
                            <span className="text-teal font-bold">{pkg.price}</span>
                          </div>
                          
                          <div className="flex items-center text-gray-500 mb-3">
                            <Clock className="h-4 w-4 mr-2" />
                            <span className="text-sm">{pkg.processingTime}</span>
                          </div>
                          
                          <ul className="space-y-2">
                            {pkg.features.map((feature, i) => (
                              <li key={i} className="flex items-start">
                                <Check className="h-4 w-4 text-teal mr-2 mt-0.5" />
                                <span className="text-sm">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                    
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-bold text-
