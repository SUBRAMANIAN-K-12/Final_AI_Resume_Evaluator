'use client';

import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1 */}
         

          {/* Column 2 */}
          

          {/* Column 3 */}
          

          {/* Column 4 */}
          
        </div>

        <div className="text-center mt-6">
          <p className="text-sm">Coached, our newsletter | Testimonials | Privacy | Terms</p>
          <p className="text-sm">&copy; {new Date().getFullYear()} copy rights. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
